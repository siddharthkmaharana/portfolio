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
    title: 'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
    issuer: 'Oracle University',
    date: 'October 29, 2025',
    category: 'Cloud & Infrastructure',
    credentialId: '323489282OCI25CAA',
    image: 'src/assets/credentials/Oracle - eCertificate (Oracle Cloud Infrastructure 2025).jpg',
    badge: 'ORACLE CERTIFIED ASSOCIATE',
    skills: ['Oracle Cloud (OCI)', 'Cloud Architecture', 'Compute & Storage', 'Networking & VCN', 'IAM Security', 'High Availability'],
    description: 'Officially recognized by Oracle Corporation as an Oracle Certified Associate. Demonstrates comprehensive expertise in architecting resilient, secure, and highly available infrastructure on OCI.',
  },
  {
    id: 'cred-2',
    title: 'Google Advanced Data Analytics Professional Certificate',
    issuer: 'Google (Coursera)',
    date: 'September 10, 2025',
    category: 'Data & Analytics',
    credentialId: '51OVP94AP9X5',
    url: 'https://coursera.org/verify/professional-cert/51OVP94AP9X5',
    image: 'src/assets/credentials/Google_Advanced_Data_Analytics.jpg',
    badge: 'GOOGLE CERTIFIED',
    skills: ['Python', 'Data Science', 'Machine Learning', 'Statistical Analysis', 'Regression Analysis', 'Predictive Modeling'],
    description: 'Comprehensive 7-course specialization covering data science foundations, Python programming, statistics, regression analysis, machine learning models, and advanced predictive analytics.',
  },
  {
    id: 'cred-3',
    title: 'Get Started with Python',
    issuer: 'Google (Coursera)',
    date: 'July 13, 2025',
    category: 'Data & Analytics',
    credentialId: 'E7EPFHDJG5BQ',
    url: 'https://coursera.org/verify/E7EPFHDJG5BQ',
    image: 'src/assets/credentials/Google_Get_Started_with_Python.jpg',
    badge: 'COURSE CERTIFICATE',
    skills: ['Python', 'Programming Fundamentals', 'Data Structures', 'Functions & Loops', 'Logic & Control Flow'],
    description: 'Online course authorized by Google and offered through Coursera, establishing foundational proficiency in Python programming, algorithmic logic, functions, loops, and data structures.',
  },
]

export const credentialCategories = [
  'All',
  'Cloud & Infrastructure',
  'Data & Analytics',
]

export default credentials
