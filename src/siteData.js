import resumePdf from '../Software_Engineer_Resume (1).pdf'

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/photos', label: 'Photos' },
  { to: '/resume', label: 'Resume' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export const profile = {
  name: 'Yi Wei',
  headline: 'Computer Science student building thoughtful full-stack and systems-oriented projects.',
  intro:
    'I am a University of Waterloo Computer Science student interested in frontend engineering, backend systems, and practical software that feels clean, usable, and well-structured.',
  location: 'Waterloo, ON',
  phone: '548-990-3661',
  email: 'y65wei@uwaterloo.ca',
  linkedin: 'https://linkedin.com/in/calwy1',
  linkedinLabel: 'linkedin.com/in/calwy1',
  school: 'University of Waterloo',
  degree: 'Bachelor of Computer Science',
  educationPeriod: '2024 - Present',
}

export const heroStats = [
  { value: '4+', label: 'Technical projects' },
  { value: 'Top 1.5%', label: 'picoCTF ranking' },
  { value: '2024', label: 'Started CS at Waterloo' },
]

export const storyCards = [
  {
    title: 'Builder',
    text: 'Yi builds across frontend, backend, algorithms, and project structure, with a preference for systems that feel organized and purposeful.',
  },
  {
    title: 'Competitor',
    text: 'Her background includes competitive programming and cybersecurity problem solving, which shows up in the way she approaches logic and debugging.',
  },
  {
    title: 'Communicator',
    text: 'She also has teaching and marketing experience, which helps balance technical execution with explanation, presentation, and user clarity.',
  },
]

export const highlights = [
  {
    label: 'University of Waterloo Computer Science',
    href: 'https://uwaterloo.ca/future-students/programs/computer-science',
    external: true,
  },
]

export const education = {
  school: 'University of Waterloo',
  degree: 'Bachelor of Computer Science',
  location: 'Waterloo, ON',
  period: '2024 - Present',
}

export const awards = [
  'Cybersecurity Competition Participant (picoCTF), Global Top 1.5% (2023)',
  'USA Computing Olympiad (USACO), Gold Division (2023)',
  'Canadian Computing Competition (CCC), Honor Roll Top 5% (2023)',
  'HiMCM Successful Participant (2023)',
  'AP Scholar with Distinction (2023, 2024)',
]

export const experiences = [
  {
    period: 'May 2026 - Aug 2026',
    role: 'Web Design and Digital Marketing Intern',
    org: 'WE Digital Bootcamp',
    location: 'Waterloo, ON',
    summary:
      'Worked across web design, UX, accessibility, content, and digital marketing to support stronger online presence and user-centered delivery.',
    bullets: [
      'Developed responsive web solutions using UX and UI design principles, accessibility standards, and design thinking workflows.',
      'Improved digital presence through SEO, audience analysis, inbound marketing, content strategy, and web performance insights.',
      'Created marketing deliverables including website content, email campaigns, blogs, social media materials, and video marketing concepts.',
    ],
  },
  {
    period: 'Sept 2023 - July 2024',
    role: 'Computer Science Teaching Assistant',
    org: 'Zhineng Education',
    location: 'Guangzhou, Guangdong',
    summary:
      'Supported students learning programming fundamentals by combining clear explanation, debugging support, and custom practice design.',
    bullets: [
      'Instructed foundational software concepts including control flow, object-oriented programming, and algorithms in Python and Java.',
      'Resolved logical and runtime errors for 40+ students through structured debugging and code review support.',
      'Designed 15+ custom programming exercises to reinforce modular programming habits and runtime efficiency.',
    ],
  },
]

export const projects = [
  {
    title: 'Bee Population Modeling and Hive Placement Optimization',
    tag: 'Algorithms + Data Modeling',
    stack: 'C++, Python',
    period: '2025',
    text:
      'Built a simulation-driven optimization project that models bee population trends and supports hive placement decisions under environmental and spatial constraints.',
    bullets: [
      'Implemented a C++ DFS-style backtracking search to evaluate valid hive placements under placement rules.',
      'Used Python to process ecological data, generate model inputs, and compare predicted outcomes across placement strategies.',
      'Combined algorithm design with real-world modeling rather than treating the problem as a purely abstract search exercise.',
    ],
  },
  {
    title: 'Helldivers Interactive Web System',
    tag: 'Frontend System Design',
    stack: 'React, Vite, JavaScript, HTML, CSS',
    period: 'Aug 2025 - Present',
    text:
      'Collaborated as a core frontend developer on an interactive Helldivers-inspired web system with dynamic user interaction, reusable UI sections, and game-like page flows.',
    bullets: [
      'Designed reusable React components for navigation sections, stratagem-style cards, interactive UI elements, and state-driven flows.',
      'Implemented character-driven interaction logic to replace simple click navigation with more dynamic transitions.',
      'Structured the frontend with modular components, reusable CSS layouts, and organized state to support future expansion.',
    ],
  },
  {
    title: 'Task Management REST API',
    tag: 'Backend Development',
    stack: 'Spring Boot, PostgreSQL, Docker',
    period: '2025',
    text:
      'Developed a backend task management service focused on CRUD APIs, structured storage, and a cleaner local development workflow.',
    bullets: [
      'Built RESTful APIs for creating, updating, deleting, and retrieving task records.',
      'Integrated PostgreSQL and designed tables for task status, descriptions, timestamps, and user records.',
      'Added centralized exception handling and containerized the app with Docker for consistent setup.',
    ],
  },
  {
    title: 'Card Game Implementation (Dou Di Zhu)',
    tag: 'Game Logic',
    stack: 'C++, Data Structures',
    period: '2023',
    text:
      'Implemented the core logic of a multiplayer card game with a focus on rule validation, turn flow, and modular game-state handling.',
    bullets: [
      'Built card representation, player turns, rule validation, and game state updates.',
      'Applied C++ data structures to compare hands and validate player actions against game rules.',
      'Designed helper functions for hand ranking, turn validation, and win-condition checking.',
    ],
  },
]

export const skillGroups = [
  {
    title: 'Programming',
    description: 'Core languages used for problem solving, coursework, data handling, and systems-style implementation.',
    items: ['Python', 'Java', 'JavaScript', 'SQL', 'C', 'C++', 'Racket'],
  },
  {
    title: 'Frontend',
    description: 'Interface-focused tools for responsive UI, component structure, and modern web application delivery.',
    items: ['React', 'Vite', 'HTML', 'CSS', 'Responsive UI'],
  },
  {
    title: 'Backend and Data',
    description: 'Tools for APIs, storage, data processing, and application logic beyond the browser.',
    items: ['Flask', 'Supabase', 'Spring Boot', 'PostgreSQL', 'Data Processing'],
  },
  {
    title: 'Tools and Platforms',
    description: 'Everyday workflow tools used for design, development, editing, version control, and deployment support.',
    items: ['n8n', 'WordPress', 'Figma', 'Git', 'Linux', 'Visual Studio Code', 'npm', 'ESLint'],
  },
]

export const skillLogoMap = {
  C: '/skill-logos/c.svg',
  'C++': '/skill-logos/cplusplus.svg',
  CSS: '/skill-logos/css.svg',
  ESLint: '/skill-logos/ESLink.png',
  Figma: '/skill-logos/figma.svg',
  Flask: '/skill-logos/flask.svg',
  Git: '/skill-logos/git.svg',
  HTML: '/skill-logos/html.svg',
  JavaScript: '/skill-logos/javascript.svg',
  Linux: '/skill-logos/linux.jpg',
  n8n: '/skill-logos/n8n.svg',
  npm: '/skill-logos/npm.png',
  PostgreSQL: '/skill-logos/ODF.png',
  Python: '/skill-logos/python.svg',
  Racket: '/skill-logos/racket.svg',
  React: '/skill-logos/react.svg',
  SQL: '/skill-logos/sqldeveloper.svg',
  Supabase: '/skill-logos/supabase.svg',
  Vite: '/skill-logos/vite.svg',
  'Visual Studio Code': '/skill-logos/vscode.png',
  WordPress: '/skill-logos/wordpress.svg',
}

export const skillLinkMap = {
  C: 'https://www.open-std.org/jtc1/sc22/wg14/',
  'C++': 'https://isocpp.org/',
  CSS: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  ESLint: 'https://eslint.org/',
  Figma: 'https://www.figma.com/',
  Flask: 'https://flask.palletsprojects.com/',
  Git: 'https://git-scm.com/',
  HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  Linux: 'https://www.kernel.org/',
  n8n: 'https://n8n.io/',
  npm: 'https://www.npmjs.com/',
  PostgreSQL: 'https://www.postgresql.org/',
  Python: 'https://www.python.org/',
  Racket: 'https://racket-lang.org/',
  React: 'https://react.dev/',
  SQL: 'https://www.oracle.com/database/technologies/appdev/sql.html',
  Supabase: 'https://supabase.com/',
  Vite: 'https://vite.dev/',
  'Visual Studio Code': 'https://code.visualstudio.com/',
  WordPress: 'https://wordpress.org/',
}

export const contactLinks = [
  { label: 'Email', value: 'y65wei@uwaterloo.ca', href: 'mailto:y65wei@uwaterloo.ca' },
  { label: 'Phone', value: '548-990-3661', href: 'tel:5489903661' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/calwy1',
    href: 'https://linkedin.com/in/calwy1',
  },
  { label: 'Location', value: 'Waterloo, ON N2L 0G6', href: '#' },
]

export { resumePdf }
