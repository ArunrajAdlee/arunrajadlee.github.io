/**
 * Technical skill graph — nodes (skills) and edges (skills used together).
 *
 * This data is language-independent (skill names, proficiency and relationships
 * don't change per locale), so it lives here rather than being duplicated across
 * resume.en.ts / resume.fr.ts. Category *display* labels are localized via the
 * i18n message catalogs (`skills.category.*`). Spoken/human languages are NOT in
 * this graph — they stay as résumé content (`resume.languages`).
 */

export type SkillCategory = 'frontend' | 'backend' | 'data' | 'cloud' | 'tools';

export interface SkillNode {
  id: string; // stable key, e.g. 'react'
  name: string; // display label, e.g. 'React'
  category: SkillCategory;
  level: 1 | 2 | 3 | 4 | 5; // proficiency → node size + glow
  /** react-icons Simple Icons export name (see skillIcons.ts). Omit → monogram. */
  icon?: string;
  /** Short monogram shown when there's no brand icon. */
  mono?: string;
}

/** Undirected "used together" relationships, drawn as edges between nodes. */
export type SkillEdge = readonly [string, string];

export const skillNodes: SkillNode[] = [
  // frontend
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 5, icon: 'SiTypescript' },
  { id: 'react', name: 'React', category: 'frontend', level: 5, icon: 'SiReact' },
  { id: 'redux', name: 'Redux & RTK', category: 'frontend', level: 5, icon: 'SiRedux' },
  {
    id: 'testing-library',
    name: 'React Testing Library',
    category: 'frontend',
    level: 5,
    icon: 'SiTestinglibrary',
  },
  { id: 'mui', name: 'MUI', category: 'frontend', level: 5, icon: 'SiMui' },

  // backend
  { id: 'csharp', name: 'C#', category: 'backend', level: 3, mono: 'C#' },
  { id: 'java', name: 'Java', category: 'backend', level: 3, icon: 'SiOpenjdk' },
  { id: 'scala', name: 'Scala', category: 'backend', level: 3, icon: 'SiScala' },
  { id: 'zio', name: 'ZIO', category: 'backend', level: 2, mono: 'ZIO' },
  { id: 'node', name: 'Node.js', category: 'backend', level: 3, icon: 'SiNodedotjs' },
  { id: 'restful-api', name: 'RESTful API', category: 'backend', level: 5, mono: 'API' },

  // data
  { id: 'mysql', name: 'MySQL', category: 'data', level: 2, icon: 'SiMysql' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'data', level: 3, icon: 'SiPostgresql' },

  // cloud
  { id: 'terraform', name: 'Terraform', category: 'cloud', level: 3, icon: 'SiTerraform' },
  { id: 'docker', name: 'Docker', category: 'cloud', level: 2, icon: 'SiDocker' },
  { id: 'aws', name: 'AWS', category: 'cloud', level: 3, mono: 'AWS' },
  { id: 'bedrock', name: 'AWS Bedrock', category: 'cloud', level: 1, mono: 'BR' },
  { id: 'git', name: 'Git', category: 'cloud', level: 5, icon: 'SiGit' },
  { id: 'gitlab', name: 'GitLab CI/CD', category: 'cloud', level: 5, icon: 'SiGitlab' },

  // tools
  { id: 'intellij', name: 'IntelliJ', category: 'tools', level: 4, icon: 'SiIntellijidea' },
  { id: 'vscode', name: 'VS Code', category: 'tools', level: 5, mono: 'VS' },
  { id: 'cursor', name: 'Cursor', category: 'tools', level: 4, icon: 'SiCursor' },
  { id: 'figma', name: 'Figma', category: 'tools', level: 5, icon: 'SiFigma' },
  { id: 'auth0', name: 'Auth0', category: 'tools', level: 4, icon: 'SiAuth0' },
  { id: 'postman', name: 'Postman', category: 'tools', level: 5, icon: 'SiPostman' },
  { id: 'slack', name: 'Slack', category: 'tools', level: 5, mono: 'Sl' },
  { id: 'claude-code', name: 'Claude Code', category: 'tools', level: 5, icon: 'SiClaude' },
];

export const skillEdges: SkillEdge[] = [
  ['react', 'typescript'],
  ['react', 'redux'],
  ['react', 'mui'],
  ['react', 'testing-library'],
  ['mui', 'figma'],
  ['node', 'typescript'],
  ['node', 'restful-api'],
  ['restful-api', 'scala'],
  ['restful-api', 'auth0'],
  ['restful-api', 'postman'],
  ['scala', 'zio'],
  ['scala', 'postgresql'],
  ['scala', 'intellij'],
  ['java', 'intellij'],
  ['postgresql', 'mysql'],
  ['aws', 'terraform'],
  ['aws', 'docker'],
  ['aws', 'bedrock'],
  ['bedrock', 'claude-code'],
  ['gitlab', 'git'],
  ['gitlab', 'docker'],
  ['claude-code', 'cursor'],
  ['cursor', 'vscode'],
];
