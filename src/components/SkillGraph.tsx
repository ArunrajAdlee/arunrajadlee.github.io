import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme, type Theme } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import { useIntl } from 'react-intl';
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from 'd3-force';
import {
  skillNodes,
  skillEdges,
  type SkillCategory,
  type SkillNode,
} from '../data/skills';
import { SKILL_ICONS } from '../data/skillIcons';
import useSkillListMode from '../hooks/useSkillListMode';

const MotionBox = motion(Box);

const EMPTY_POINTS: Map<string, Point> = new Map();

const CATEGORIES: SkillCategory[] = [
  'frontend',
  'backend',
  'data',
  'cloud',
  'tools',
];

/** Node radius grows with proficiency (level 1–5). */
function radiusFor(level: number): number {
  return 18 + ((level - 1) / 4) * 18; // 18 → 36 px
}

interface Point {
  x: number;
  y: number;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  category: SkillCategory;
  r: number;
}

/**
 * Run a d3-force simulation to convergence *once* (headless — no live rAF loop)
 * and return the resting position of every node. Nodes are pulled toward a
 * per-category anchor arranged on a ring, so related skills settle into loose
 * clusters while linked skills stay near each other.
 */
function computeLayout(width: number, height: number): Map<string, Point> {
  const cx = width / 2;
  const cy = height / 2;
  // Elliptical ring so clusters spread to fill a wide canvas, not just a circle.
  const ringRx = width * 0.34;
  const ringRy = height * 0.34;

  // Anchor point per category, evenly spaced around the ring (start at top).
  const anchors = new Map<SkillCategory, Point>();
  CATEGORIES.forEach((category, i) => {
    const theta = -Math.PI / 2 + (i / CATEGORIES.length) * Math.PI * 2;
    anchors.set(category, {
      x: cx + ringRx * Math.cos(theta),
      y: cy + ringRy * Math.sin(theta),
    });
  });

  // Seed positions near the category anchor so the layout is stable run-to-run.
  const nodes: SimNode[] = skillNodes.map((node, i) => {
    const anchor = anchors.get(node.category)!;
    return {
      id: node.id,
      category: node.category,
      r: radiusFor(node.level),
      x: anchor.x + Math.cos(i) * 12,
      y: anchor.y + Math.sin(i) * 12,
    };
  });

  const links = skillEdges.map(([source, target]) => ({ source, target }));

  const simulation = forceSimulation(nodes)
    .force(
      'link',
      forceLink(links)
        .id((d) => (d as SimNode).id)
        .distance(58)
        .strength(0.35),
    )
    .force('charge', forceManyBody().strength(-160))
    .force('collide', forceCollide<SimNode>().radius((d) => d.r + 6))
    .force('x', forceX<SimNode>((d) => anchors.get(d.category)!.x).strength(0.16))
    .force('y', forceY<SimNode>((d) => anchors.get(d.category)!.y).strength(0.16))
    .stop();

  for (let i = 0; i < 320; i += 1) simulation.tick();

  // Clamp inside the viewport so no node is clipped at the edges.
  const positions = new Map<string, Point>();
  nodes.forEach((node) => {
    positions.set(node.id, {
      x: Math.max(node.r, Math.min(width - node.r, node.x ?? cx)),
      y: Math.max(node.r, Math.min(height - node.r, node.y ?? cy)),
    });
  });
  return positions;
}

/** The rendered content of a node: brand icon, or a letter monogram fallback. */
function NodeGlyph({ node, size }: { node: SkillNode; size: number }) {
  const Icon = node.icon ? SKILL_ICONS[node.icon] : undefined;
  if (Icon) return <Icon size={size} />;
  return (
    <Typography
      component='span'
      sx={{ fontSize: size * 0.5, fontWeight: 700, lineHeight: 1 }}
    >
      {node.mono ?? node.name.slice(0, 2)}
    </Typography>
  );
}

/** Rich tooltip: skill name, proficiency level + its label, and a description. */
function LevelTooltip({ node }: { node: SkillNode }) {
  const { formatMessage } = useIntl();
  return (
    <Box sx={{ py: 0.25 }}>
      <Typography variant='subtitle2' sx={{ fontWeight: 700, lineHeight: 1.3 }}>
        {node.name}
      </Typography>
      <Typography
        variant='caption'
        sx={{ display: 'block', fontWeight: 600, color: 'primary.light', mt: 0.25 }}
      >
        {formatMessage({ id: 'skills.level' }, { level: node.level })} ·{' '}
        {formatMessage({ id: `skills.level.${node.level}.name` })}
      </Typography>
      <Typography
        variant='caption'
        sx={{ display: 'block', mt: 0.5, lineHeight: 1.4 }}
      >
        {formatMessage({ id: `skills.level.${node.level}.desc` })}
      </Typography>
    </Box>
  );
}

/** Compact accent ramp reused for proficiency bars in the list fallback. */
function levelColors(theme: Theme): string[] {
  const accent = theme.palette.primary.main;
  return [
    alpha(accent, 0.32),
    alpha(accent, 0.48),
    alpha(accent, 0.64),
    alpha(accent, 0.8),
    accent,
  ];
}

/**
 * Grouped, static list with proficiency bars. Shown on small screens (a force
 * graph is unreadable when cramped) and for prefers-reduced-motion users.
 */
function SkillList() {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const ramp = levelColors(theme);

  return (
    <Stack spacing={3}>
      {CATEGORIES.map((category) => {
        const nodes = skillNodes.filter((n) => n.category === category);
        if (nodes.length === 0) return null;
        return (
          <Box key={category}>
            <Typography
              variant='overline'
              sx={{ color: 'text.secondary', letterSpacing: '0.14em' }}
            >
              {formatMessage({ id: `skills.category.${category}` })}
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1 }}>
              {nodes.map((node) => (
                <Stack
                  key={node.id}
                  direction='row'
                  spacing={1.5}
                  sx={{ alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      color: 'primary.main',
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    <NodeGlyph node={node} size={20} />
                  </Box>
                  <Typography
                    variant='body2'
                    sx={{ flex: 1, color: 'text.primary' }}
                  >
                    {node.name}
                  </Typography>
                  <Tooltip
                    arrow
                    title={<LevelTooltip node={node} />}
                    slotProps={{ tooltip: { sx: { maxWidth: 260 } } }}
                  >
                    <Stack
                      direction='row'
                      spacing={0.5}
                      aria-label={formatMessage(
                        { id: 'skills.level' },
                        { level: node.level },
                      )}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 16,
                            height: 6,
                            borderRadius: 1,
                            bgcolor:
                              i < node.level
                                ? ramp[node.level - 1]
                                : alpha(theme.palette.text.primary, 0.1),
                          }}
                        />
                      ))}
                    </Stack>
                  </Tooltip>
                </Stack>
              ))}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

export default function SkillGraph() {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const { formatMessage } = useIntl();
  const listMode = useSkillListMode();

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const height = Math.round(Math.max(440, Math.min(680, width * 0.6)));

  // Per-node drag overrides, layered on top of the computed layout. Keyed by
  // layout id so a fresh layout (resize / mode switch) transparently discards
  // stale overrides without any render-phase state mutation.
  const [dragged, setDragged] = useState<{
    layoutId: string;
    map: Map<string, Point>;
  }>({ layoutId: '', map: EMPTY_POINTS });
  const [activeId, setActiveId] = useState<string | null>(null);
  const dragRef = useRef<{
    id: string;
    pointerX: number;
    pointerY: number;
    nodeX: number;
    nodeY: number;
  } | null>(null);

  // Track container width so the layout can react to responsive resizes.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const layoutId = `${listMode}:${width}:${height}`;
  const layout = useMemo(() => {
    if (listMode || width === 0) return new Map<string, Point>();
    return computeLayout(width, height);
  }, [listMode, width, height]);

  const dragMap = dragged.layoutId === layoutId ? dragged.map : EMPTY_POINTS;
  const posOf = (id: string): Point | undefined =>
    dragMap.get(id) ?? layout.get(id);

  // id → set of directly-connected ids, for hover highlighting.
  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>();
    skillEdges.forEach(([a, b]) => {
      if (!map.has(a)) map.set(a, new Set());
      if (!map.has(b)) map.set(b, new Set());
      map.get(a)!.add(b);
      map.get(b)!.add(a);
    });
    return map;
  }, []);

  const isHighlighted = (id: string) =>
    activeId === id || Boolean(neighbors.get(activeId ?? '')?.has(id));

  function handlePointerDown(e: PointerEvent<HTMLDivElement>, id: string) {
    const pos = posOf(id);
    if (!pos) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      id,
      pointerX: e.clientX,
      pointerY: e.clientY,
      nodeX: pos.x,
      nodeY: pos.y,
    };
    setActiveId(id);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const node = skillNodes.find((n) => n.id === drag.id);
    const r = node ? radiusFor(node.level) : 24;
    const x = Math.max(
      r,
      Math.min(width - r, drag.nodeX + (e.clientX - drag.pointerX)),
    );
    const y = Math.max(
      r,
      Math.min(height - r, drag.nodeY + (e.clientY - drag.pointerY)),
    );
    setDragged((prev) => {
      const map =
        prev.layoutId === layoutId ? new Map(prev.map) : new Map<string, Point>();
      map.set(drag.id, { x, y });
      return { layoutId, map };
    });
  }

  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    if (dragRef.current) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      dragRef.current = null;
    }
  }

  if (listMode) return <SkillList />;

  const accent = theme.palette.primary.main;
  const edgeBase = alpha(accent, 0.16);
  const edgeFaded = alpha(theme.palette.text.primary, 0.05);

  return (
    <Box>
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          height,
          overflow: 'visible',
          touchAction: 'none',
        }}
      >
        {/* Edge layer */}
        <Box
          component='svg'
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {skillEdges.map(([a, b]) => {
            const pa = posOf(a);
            const pb = posOf(b);
            if (!pa || !pb) return null;
            const connected =
              activeId != null && (a === activeId || b === activeId);
            return (
              <line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={
                  connected ? accent : activeId != null ? edgeFaded : edgeBase
                }
                strokeWidth={connected ? 2 : 1}
              />
            );
          })}
        </Box>

        {/* Node layer */}
        {skillNodes.map((node, i) => {
          const pos = posOf(node.id);
          if (!pos) return null;
          const r = radiusFor(node.level);
          const highlighted = isHighlighted(node.id);
          const dimmed = activeId != null && !highlighted;
          return (
            <MotionBox
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: dimmed ? 0.32 : 1 }}
              transition={{
                scale: { duration: 0.4, delay: i * 0.015 },
                opacity: { duration: 0.25 },
              }}
              sx={{
                position: 'absolute',
                left: pos.x - r,
                top: pos.y - r,
                width: r * 2,
                height: r * 2,
                zIndex: highlighted ? 2 : 1,
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' },
              }}
              onPointerDown={(e) => handlePointerDown(e, node.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerEnter={() => setActiveId(node.id)}
              onPointerLeave={() => {
                if (!dragRef.current) setActiveId(null);
              }}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId(null)}
              tabIndex={0}
            >
              <Tooltip
                arrow
                title={<LevelTooltip node={node} />}
                slotProps={{ tooltip: { sx: { maxWidth: 260 } } }}
              >
                {/* Inner box carries the gentle idle drift (transform only). */}
                <MotionBox
                  animate={
                    reduce
                      ? undefined
                      : {
                          x: [0, i % 2 ? 4 : -4, 0],
                          y: [0, i % 3 ? -4 : 4, 0],
                        }
                  }
                  transition={{
                    duration: 6 + (i % 5),
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: highlighted ? accent : 'text.secondary',
                    backgroundColor: highlighted
                      ? alpha(accent, 0.18)
                      : alpha(accent, 0.05 + node.level * 0.02),
                    border: '1px solid',
                    borderColor: highlighted
                      ? accent
                      : alpha(accent, 0.2 + node.level * 0.08),
                    boxShadow: highlighted
                      ? `0 0 0 4px ${alpha(accent, 0.14)}, 0 8px 24px ${alpha(accent, 0.3)}`
                      : 'none',
                    transition:
                      'background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s',
                  }}
                >
                  <NodeGlyph node={node} size={r} />
                </MotionBox>
              </Tooltip>

              {/* Label under the node */}
              <Typography
                variant='caption'
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  mt: 0.25,
                  whiteSpace: 'nowrap',
                  fontSize: 10,
                  pointerEvents: 'none',
                  color: highlighted ? 'text.primary' : 'text.secondary',
                  opacity: dimmed ? 0.32 : 1,
                  transition: 'opacity 0.2s, color 0.2s',
                }}
              >
                {node.name}
              </Typography>
            </MotionBox>
          );
        })}
      </Box>

      <Typography
        variant='caption'
        sx={{ display: 'block', mt: 1.5, color: 'text.secondary' }}
      >
        {formatMessage({ id: 'skills.hint' })}
      </Typography>
    </Box>
  );
}
