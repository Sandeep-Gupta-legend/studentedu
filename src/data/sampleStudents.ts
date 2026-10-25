import { Student } from '../types';

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Electrical & Electronics',
  'Civil Engineering',
  'Master of Computer Applications',
] as const;

export const COURSES_BY_DEPARTMENT: Record<string, string[]> = {
  'Computer Science & Engineering': [
    'B.Tech CSE - Core',
    'B.Tech CSE - AI & Machine Learning',
    'B.Tech CSE - Data Science',
    'M.Tech Computer Science'
  ],
  'Information Technology': [
    'B.Tech Information Technology',
    'B.Tech IT - Cyber Security',
    'B.Tech IT - Cloud Computing'
  ],
  'Electronics & Communication': [
    'B.Tech ECE - VLSI Design',
    'B.Tech ECE - Embedded Systems',
    'B.Tech Electronics & Comm'
  ],
  'Mechanical Engineering': [
    'B.Tech Mechanical Engineering',
    'B.Tech Robotics & Automation',
    'M.Tech Thermal Engineering'
  ],
  'Electrical & Electronics': [
    'B.Tech Electrical & Electronics',
    'B.Tech Power Systems'
  ],
  'Civil Engineering': [
    'B.Tech Civil Engineering',
    'B.Tech Structural Engineering'
  ],
  'Master of Computer Applications': [
    'MCA 2-Year Professional',
    'BCA Bachelor of Computer Apps'
  ]
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 101,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    mobile: '9876543210',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE - Core',
    createdAt: '2024-08-12',
    status: 'Active',
    semester: 6
  },
  {
    id: 102,
    name: 'Diya Patel',
    email: 'diya.patel@college.edu',
    mobile: '9823456789',
    department: 'Information Technology',
    course: 'B.Tech Information Technology',
    createdAt: '2024-08-14',
    status: 'Active',
    semester: 4
  },
  {
    id: 103,
    name: 'Rohan Verma',
    email: 'rohan.verma@college.edu',
    mobile: '9712345678',
    department: 'Electronics & Communication',
    course: 'B.Tech ECE - Embedded Systems',
    createdAt: '2024-08-18',
    status: 'Active',
    semester: 6
  },
  {
    id: 104,
    name: 'Ananya Iyer',
    email: 'ananya.iyer@college.edu',
    mobile: '9654321098',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE - AI & Machine Learning',
    createdAt: '2024-08-20',
    status: 'Active',
    semester: 4
  },
  {
    id: 105,
    name: 'Kabir Mehta',
    email: 'kabir.mehta@college.edu',
    mobile: '9543210987',
    department: 'Mechanical Engineering',
    course: 'B.Tech Mechanical Engineering',
    createdAt: '2024-08-22',
    status: 'Active',
    semester: 8
  },
  {
    id: 106,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@college.edu',
    mobile: '9432109876',
    department: 'Master of Computer Applications',
    course: 'MCA 2-Year Professional',
    createdAt: '2024-09-01',
    status: 'Active',
    semester: 2
  },
  {
    id: 107,
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@college.edu',
    mobile: '9321098765',
    department: 'Electrical & Electronics',
    course: 'B.Tech Electrical & Electronics',
    createdAt: '2024-09-03',
    status: 'Active',
    semester: 6
  },
  {
    id: 108,
    name: 'Pooja Nair',
    email: 'pooja.nair@college.edu',
    mobile: '9210987654',
    department: 'Civil Engineering',
    course: 'B.Tech Civil Engineering',
    createdAt: '2024-09-05',
    status: 'Active',
    semester: 4
  },
  {
    id: 109,
    name: 'Arjun Das',
    email: 'arjun.das@college.edu',
    mobile: '9109876543',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE - Data Science',
    createdAt: '2024-09-10',
    status: 'Active',
    semester: 2
  },
  {
    id: 110,
    name: 'Meera Kulkarni',
    email: 'meera.kulkarni@college.edu',
    mobile: '9098765432',
    department: 'Information Technology',
    course: 'B.Tech IT - Cyber Security',
    createdAt: '2024-09-12',
    status: 'Active',
    semester: 4
  }
];
