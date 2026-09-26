/**
 * CREDENTIALS & CERTIFICATIONS DATA
 * Edit this file to add or update your credentials, certificates, and badges.
 *
 * Each item supports:
 * - id: Unique string identifier
 * - title: Certification or credential name
 * - issuer: Issuing organization / authority (e.g. HackerRank, Coursera, Meta, AWS, Postman)
 * - date: Issue date (e.g. 'August 2025' or '2025')
 * - category: Category filter ('Frontend & Web', 'DSA & Algorithms', 'Backend & APIs', 'Full Stack & Cloud')
 * - credentialId: Certification ID / License number
 * - url: Direct verification link or certificate view URL
 * - badge: Status tag (e.g. 'VERIFIED', 'CERTIFIED', 'HONORS')
 * - skills: Array of key skills covered
 * - description: 1-2 sentence overview of what was mastered
 */

export const credentials = [
  {
    id: 'cred-1',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta (Coursera)',
    date: '2025',
    category: 'Frontend & Web',
    credentialId: 'COURSERA-META-FE-9821',
    url: 'https://www.coursera.org/',
    badge: 'VERIFIED',
    skills: ['React.js', 'JavaScript', 'HTML5/CSS3', 'UI/UX Design', 'Version Control'],
    description: 'Comprehensive program covering responsive frontend engineering, component lifecycle, custom hooks, and modern web application architecture.',
  },
  {
    id: 'cred-2',
    title: 'Problem Solving (Intermediate) Certificate',
    issuer: 'HackerRank',
    date: '2025',
    category: 'DSA & Algorithms',
    credentialId: 'HR-PSI-77402',
    url: 'https://www.hackerrank.com/certificates',
    badge: 'CERTIFIED',
    skills: ['Data Structures', 'Algorithms', 'Java', 'Complexity Analysis', 'Dynamic Programming'],
    description: 'Rigorous assessment validating intermediate algorithmic capabilities, graph theory, tree traversals, and optimal time-space complexity design.',
  },
  {
    id: 'cred-3',
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    date: '2025',
    category: 'Backend & APIs',
    credentialId: 'POSTMAN-EXPERT-44910',
    url: 'https://badgr.com/',
    badge: 'STUDENT EXPERT',
    skills: ['REST APIs', 'Postman', 'API Testing', 'HTTP Methods', 'JSON Validation'],
    description: 'Certified in modern API testing workflows, request collection creation, automated test scripts, mock servers, and RESTful documentation.',
  },
  {
    id: 'cred-4',
    title: 'Node.js, Express & MongoDB: Full Stack Bootcamp',
    issuer: 'Udemy',
    date: '2024',
    category: 'Full Stack & Cloud',
    credentialId: 'UC-829104-FS',
    url: 'https://www.udemy.com/',
    badge: 'COMPLETED',
    skills: ['Node.js', 'Express.js', 'MongoDB Atlas', 'JWT Authentication', 'REST APIs'],
    description: 'Hands-on full stack backend architecture with Mongoose schema modeling, secure authentication, role-based access, and API deployment.',
  },
]

export const credentialCategories = [
  'All',
  'Frontend & Web',
  'DSA & Algorithms',
  'Backend & APIs',
  'Full Stack & Cloud',
]

export default credentials
