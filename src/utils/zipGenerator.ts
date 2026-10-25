import JSZip from 'jszip';
import { JAVA_PROJECT_FILES } from '../data/javaProjectFiles';

export async function generateAndDownloadProjectZip(): Promise<void> {
  const zip = new JSZip();
  const rootFolder = zip.folder('student-management-system');

  if (!rootFolder) {
    throw new Error('Failed to create root folder in ZIP');
  }

  // Add all files into their relative folder structure
  for (const file of JAVA_PROJECT_FILES) {
    rootFolder.file(file.path, file.content);
  }

  // Generate the zip file blob
  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9
    }
  });

  // Trigger browser download
  const blobUrl = URL.createObjectURL(content);
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = 'student-management-system-spring-boot.zip';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(blobUrl);
}

export function exportStudentsToCsv(students: any[]): void {
  const headers = ['ID', 'Name', 'Email', 'Mobile', 'Department', 'Course', 'Status', 'Date'];
  const rows = students.map(s => [
    s.id,
    `"${s.name.replace(/"/g, '""')}"`,
    `"${s.email}"`,
    `"${s.mobile}"`,
    `"${s.department.replace(/"/g, '""')}"`,
    `"${s.course.replace(/"/g, '""')}"`,
    s.status || 'Active',
    s.createdAt || ''
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'students_database_export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
