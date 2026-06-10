# Anton Arunraj Adlee — Portfolio

Personal portfolio site built with **React + TypeScript + Vite** and **MUI (Material UI)**,

🔗 Live: https://arunrajadlee.github.io

## Tech stack

- React 19 + TypeScript
- Vite 6 (build/dev)
- MUI v7 + Emotion
- `@mui/lab` Timeline
- Framer Motion

## Project structure

```
src/
├── theme.ts              # MUI dark theme
├── types.ts              # content type definitions
├── data/resume.ts        # site content
├── components/           # Navbar, Hero, About, Skills, Experience, Education, Footer, Section
├── App.tsx               # section composition
└── main.tsx              # ThemeProvider + CssBaseline entry
```

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
```
