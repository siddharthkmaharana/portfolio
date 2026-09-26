/**
 * PROJECTS DATA
 * Edit this file to add, remove, or modify your portfolio projects.
 */

export const projects = [
  {
    title: 'Cortexa',
    date: 'May 7, 2026',
    description: 'Cross-platform AI desktop assistant combining computer vision, conversational AI, voice interactions, and desktop/browser automation.',
    tags: ['Electron', 'React', 'FastAPI', 'Python', 'Claude API', 'Playwright', 'Whisper'],
    features: 'Real-time object detection, OCR, barcode scanning, scene understanding, voice interaction, and persistent memory.',
    source: 'https://github.com/siddharthkmaharana/Cortexa',
    accent: 'coral',
    image: 'src/assets/projects/Cortexa_DM.png',
    image2: 'src/assets/projects/Cortexa_LM.png'
  },
  {
    title: 'Integrated Food Delivery & Dine-Out Platform',
    date: 'July 28, 2025',
    description: 'Full-stack food ordering and dine-out platform with geospatial restaurant discovery, gamified reviews, real-time order tracking, and state-based order management.',
    tags: ['React', 'Vite', 'Node.js', 'MongoDB Atlas', 'Socket.io', 'JWT', 'AWS EC2'],
    features: 'GeoJSON restaurant discovery, gamified reviews, live tracking, and a six-state order workflow from placement to delivery.',
    live: 'https://integrated-food-delivery-and-dine-o.vercel.app/',
    source: 'https://github.com/siddharthkmaharana/Integrated-Food-Delivery-and-Dine-Out-Hospitality-Platform',
    accent: 'blue',
    image: 'src/assets/projects/Integrated Food Delivery_DM.png',
    image2: 'src/assets/projects/Integrated Food Delivery_LM.png',
  },
  {
    title: 'Merkle Tree Visualizer',
    date: 'January 5, 2026',
    description: 'Interactive visualization tool for understanding and verifying data integrity with Merkle Trees and SHA-256 hashing.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SHA-256', 'Cryptography', 'Visualization'],
    type: 'Research Project',
    live: 'https://wanderlustt-ziz3.onrender.com/',
    source: 'https://github.com/siddharthkmaharana/Merkle-Tree-Visualizer',
    accent: 'mint',
    image: 'src/assets/projects/MTV_DM.png',
    image2: 'src/assets/projects/MTV_LM.png',
  },
  {
    title: 'Telemedicine & EHR Platform',
    date: 'November 20, 2024',
    description: 'Secure telemedicine platform featuring appointment scheduling, electronic health records, QR-verified prescriptions, and WebRTC consultations.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io', 'AES-256'],
    features: 'Patient, doctor, and admin roles with JWT authentication, encryption, audit logging, and collision-aware scheduling.',
    source: 'https://github.com/siddharthkmaharana/Telemedicine-EHR-Platform',
    accent: 'violet',
    image: '/projects/telemedicine.jpg',
  },
]

export default projects
