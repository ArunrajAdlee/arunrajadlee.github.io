import type { IconType } from 'react-icons';
import {
  SiTypescript,
  SiReact,
  SiRedux,
  SiTestinglibrary,
  SiMui,
  SiOpenjdk,
  SiScala,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiTerraform,
  SiDocker,
  SiGit,
  SiGitlab,
  SiIntellijidea,
  SiCursor,
  SiFigma,
  SiAuth0,
  SiPostman,
  SiClaude,
} from 'react-icons/si';

/**
 * Maps the `icon` field on a SkillNode to its react-icons (Simple Icons)
 * component. Skills without an entry fall back to a letter monogram. Imports are
 * per-icon so Vite tree-shakes the rest of the (large) icon set out of the bundle.
 */
export const SKILL_ICONS: Record<string, IconType> = {
  SiTypescript,
  SiReact,
  SiRedux,
  SiTestinglibrary,
  SiMui,
  SiOpenjdk,
  SiScala,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiTerraform,
  SiDocker,
  SiGit,
  SiGitlab,
  SiIntellijidea,
  SiCursor,
  SiFigma,
  SiAuth0,
  SiPostman,
  SiClaude,
};
