import { Box } from '@mui/material';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import GitHubActivity from './components/GitHubActivity';
import Education from './components/Education';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <AuroraBackground />
      <Navbar />
      <Hero />
      <Box component='main'>
        <About />
        <Skills />
        <Experience />
        <GitHubActivity />
        <Education />
      </Box>
      <Footer />
    </>
  );
}
