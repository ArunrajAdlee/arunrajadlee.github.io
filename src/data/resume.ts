import type { Resume } from '../types';

const resume: Resume = {
  profile: {
    name: 'Anton Arunraj Adlee',
    title: 'Full Stack Developer',
    tagline:
      'Full stack developer with 5+ years building B2B SaaS — React & TypeScript on the front, Scala/ZIO, PostgreSQL and AWS underneath.',
    email: 'arunraj.adlee@hotmail.com',
    phone: '514-962-8564',
    linkedin: 'https://www.linkedin.com/in/arunrajadlee',
    linkedinLabel: 'linkedin.com/in/arunrajadlee',
    location: 'Laval, QC',
    resumeUrl: `${import.meta.env.BASE_URL}Anton-Arunraj-Adlee-CV.pdf`,
  },
  summary:
    'Full stack developer with 5+ years building B2B SaaS at Keatext. Led frontend delivery for three years, driving TypeScript adoption, a Redux Toolkit migration, and a monorepo architecture. Moved into full-stack work across Scala/ZIO, PostgreSQL, and AWS/Terraform. Experienced mentor and cross-functional collaborator in agile product teams.',
  skills: [
    {
      label: 'Programming',
      skills: [
        'TypeScript',
        'React',
        'Redux & RTK / RTK Query',
        'React Testing Library',
        'MUI',
        'C#',
        'Java',
        'Scala',
        'ZIO',
        'Node.js',
        'MySQL',
        'PostgreSQL',
        'RESTful API',
        'Terraform',
      ],
    },
    {
      label: 'Tools',
      skills: [
        'IntelliJ',
        'VS Code',
        'Cursor',
        'AWS',
        'Git',
        'GitLab & GitLab CI/CD',
        'Auth0',
        'Postman',
        'Slack',
        'Claude Code'
      ],
    },
    {
      label: 'Languages',
      skills: [
        'English — spoken & written',
        'French — spoken & written',
        'Tamil — spoken',
      ],
    },
  ],
  experience: [
    {
      company: 'Keatext',
      title: 'Full Stack Developer',
      location: 'Montréal, QC',
      start: 'Dec 2024',
      end: 'May 2026',
      bullets: [
        'Delivered features across the React/TypeScript frontend and Scala/ZIO backend, including PostgreSQL data access and Cube.js analytics integration.',
        'Managed AWS infrastructure provisioning and ongoing maintenance using Terraform.',
        'Built and maintained GitLab CI/CD pipelines for frontend and backend deployments.',
        'Partnered with backend engineers on API design, cross-layer debugging, and production incident response.',
        'Adopted AI-assisted development tooling (Cursor) to accelerate delivery, exploration, and onboarding on unfamiliar parts of the stack.',
      ],
    },
    {
      company: 'Keatext',
      title: 'Frontend Developer',
      location: 'Montréal, QC',
      start: 'Mar 2021',
      end: 'Dec 2024',
      bullets: [
        'Built and tested features with TypeScript, React, Redux/RTK, Material UI, React Testing Library, Vite, and Vitest.',
        'Led the frontend team; collaborated with backend and product to plan, estimate, develop, and QA features in an agile workflow.',
        'Introduced TypeScript across the frontend codebase, improving type safety and code consistency.',
        'Migrated global state from vanilla Redux to Redux Toolkit and RTK Query, reducing boilerplate and server load through query caching.',
        'Reorganized the web application into an npm workspaces monorepo with Vite, simplifying white-label deployments and enabling a shared component library.',
        'Mentored junior frontend developers through code reviews, pair programming, and structured codebase onboarding.',
      ],
    },
    {
      company: 'AppDirect',
      title: 'Software Developer (Internship)',
      location: 'Montréal, QC',
      start: 'Jan 2020',
      end: 'May 2020',
      bullets: [
        'Worked autonomously to create a Micro-UI project extracting functionality out of the existing AppMarket monolith application.',
        'Used HTML/CSS, React, Redux, Redux Saga, Jest, and React Testing Framework to recreate functionality originally written in Apache Wicket.',
        'Analyzed legacy code to reveal underlying functionality not easily perceptible from the existing UI and reimplemented it in the new project.',
        'Implemented a Jenkins pipeline to run tests and build the project.',
      ],
    },
    {
      company: 'Nuvei',
      title: 'Software Developer (Internship)',
      location: 'Montréal, QC',
      start: 'Sep 2018',
      end: 'Sep 2019',
      bullets: [
        'Worked in a team to reconstruct legacy web applications in modern frameworks and web technologies.',
        'Used HTML/SCSS, jQuery, JavaScript, C#, ASP.NET Core, React, Redux, TypeScript, Jest, and Enzyme to implement features, fix bugs, and maintain the web application.',
        'Communicated with Business Analysts and used user stories to implement features as requested by clients.',
      ],
    },
    {
      company: 'Graphics M&H',
      title: 'Web Developer (Part Time)',
      location: 'Montréal, QC',
      start: 'Oct 2016',
      end: 'Feb 2017',
      bullets: [
        'Created HTML5 animated advertisement banners using HTML/CSS, ZeptoJS, GSAP, and other animation libraries.',
        'Worked alongside project managers and clients to meet their needs and make content adjustments.',
        'Serviced clients including Sid Lee, Banque Nationale, SAQ, and L’Oréal.',
        'Performed QA testing and translation services using Excel and the Sitecore CMS.',
      ],
    },
    {
      company: 'Inovestor Inc.',
      title: 'Web Developer (Internship)',
      location: 'Montréal, QC',
      start: 'Jan 2016',
      end: 'May 2016',
      bullets: [
        'Created a time-tracking & employee timesheet web application from scratch with one other intern.',
        'Self-taught the new concepts and skills required for the project.',
        'Used HTML/CSS, Bootstrap, AngularJS, jQuery, Entity Framework, and RESTful API to build the application.',
        'Met with supervisors throughout the internship to discuss ways to improve the application.',
      ],
    },
    {
      company: 'VMC Game Labs',
      title: 'Quality Assurance Tester (Part Time)',
      location: 'Montréal, QC',
      start: 'May 2015',
      end: 'Oct 2016',
      bullets: [
        'Tested various video games and reported issues into databases.',
        'Worked with tools like TestTrack, JIRA, Excel, and Outlook.',
        'Collaborated in a team of 15–30 people with several managers.',
      ],
    },
  ],
  education: [
    {
      institution: 'Concordia University',
      credential: 'B.Comp.Sc. — Web Services and Applications (Co-op)',
      location: 'Montréal, QC',
      period: 'Jan 2017 – Apr 2021',
      details: [
        'Member of the Institute for Co-operative Education',
        'GPA 3.8',
      ],
    },
    {
      institution: 'Vanier College',
      credential: 'DEC in Computer Science & Technology',
      location: 'St-Lambert, QC',
      period: '2017',
      details: ['Honor Roll (2015)'],
    },
  ],
};

export default resume;
