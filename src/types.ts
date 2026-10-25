export interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  department: string;
  course: string;
  createdAt?: string;
  status?: 'Active' | 'Enrolled' | 'Graduated';
  semester?: number;
}

export interface StudentFormData {
  name: string;
  email: string;
  mobile: string;
  department: string;
  course: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  mobile?: string;
  department?: string;
  course?: string;
}

export interface JavaProjectFile {
  path: string;
  name: string;
  category: 'Entity' | 'Repository' | 'Service' | 'Controller' | 'Configuration' | 'Database' | 'Thymeleaf' | 'Static' | 'Documentation';
  language: 'java' | 'xml' | 'properties' | 'sql' | 'html' | 'css' | 'javascript' | 'markdown';
  description: string;
  content: string;
}

export type ActiveTab = 'dashboard' | 'students' | 'code-explorer' | 'viva-guide';
