import { useState, useEffect } from 'react';
import { Student, StudentFormData, ActiveTab } from './types';
import { INITIAL_STUDENTS } from './data/sampleStudents';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { StudentFormModal } from './components/StudentFormModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { CodeExplorerView } from './components/CodeExplorerView';
import { VivaGuideView } from './components/VivaGuideView';
import { generateAndDownloadProjectZip } from './utils/zipGenerator';
import { CheckCircle2, X } from 'lucide-react';

const STORAGE_KEY = 'edumanage_students_v1';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
    return INITIAL_STUDENTS;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToView, setStudentToView] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // Storage quota or sandboxing
    }
  }, [students]);

  // Toast Auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Add / Save Student
  const handleSaveStudent = (formData: StudentFormData, editId?: number) => {
    if (editId) {
      // Edit existing
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId
            ? {
                ...s,
                name: formData.name.trim(),
                email: formData.email.trim(),
                mobile: formData.mobile.trim(),
                department: formData.department.trim(),
                course: formData.course.trim()
              }
            : s
        )
      );
      showToast(`Student #${editId} (${formData.name}) updated successfully.`);
    } else {
      // Add new
      const maxId = students.reduce((max, s) => Math.max(max, s.id), 100);
      const newStudent: Student = {
        id: maxId + 1,
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        department: formData.department.trim(),
        course: formData.course.trim(),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Active',
        semester: 1
      };
      setStudents((prev) => [newStudent, ...prev]);
      showToast(`Student #${newStudent.id} (${newStudent.name}) registered successfully.`);
    }
    setStudentToEdit(null);
  };

  // Delete Student
  const handleDeleteConfirm = (id: number) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(`Student #${id} (${student ? student.name : ''}) deleted from database.`);
  };

  // Reset to Initial Sample Data
  const handleResetSampleData = () => {
    setStudents(INITIAL_STUDENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    showToast('Database reset to initial sample student records.');
  };

  // Download ZIP
  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadProjectZip();
      showToast('Downloaded student-management-system-spring-boot.zip successfully!');
    } catch (err) {
      console.error('ZIP generation failed:', err);
      showToast('Failed to create project ZIP. Please try copying files directly.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Navigation Helper from Dashboard
  const handleNavigateToStudentsWithDept = (dept?: string) => {
    setSelectedDeptFilter(dept || '');
    setActiveTab('students');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'students') setSelectedDeptFilter('');
          setActiveTab(tab);
        }}
        onOpenAddModal={() => {
          setStudentToEdit(null);
          setIsAddModalOpen(true);
        }}
        onDownloadZip={handleDownloadZip}
        isDownloading={isDownloading}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            students={students}
            onOpenAddModal={() => {
              setStudentToEdit(null);
              setIsAddModalOpen(true);
            }}
            onViewStudent={(student) => setStudentToView(student)}
            onEditStudent={(student) => {
              setStudentToEdit(student);
              setIsAddModalOpen(true);
            }}
            onNavigateToStudents={handleNavigateToStudentsWithDept}
            onNavigateToCode={() => setActiveTab('code-explorer')}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView
            students={students}
            initialDepartmentFilter={selectedDeptFilter}
            onOpenAddModal={() => {
              setStudentToEdit(null);
              setIsAddModalOpen(true);
            }}
            onViewStudent={(student) => setStudentToView(student)}
            onEditStudent={(student) => {
              setStudentToEdit(student);
              setIsAddModalOpen(true);
            }}
            onDeleteStudent={(student) => setStudentToDelete(student)}
            onResetSampleData={handleResetSampleData}
          />
        )}

        {activeTab === 'code-explorer' && (
          <CodeExplorerView
            onDownloadZip={handleDownloadZip}
            isDownloading={isDownloading}
          />
        )}

        {activeTab === 'viva-guide' && <VivaGuideView />}
      </main>

      {/* Add / Edit Student Modal */}
      <StudentFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
        existingStudents={students}
      />

      {/* Student Profile View Modal */}
      <StudentDetailModal
        student={studentToView}
        onClose={() => setStudentToView(null)}
        onEdit={(student) => {
          setStudentToView(null);
          setStudentToEdit(student);
          setIsAddModalOpen(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        student={studentToDelete}
        isOpen={Boolean(studentToDelete)}
        onClose={() => setStudentToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">EduManage SMS</span>
            <span>·</span>
            <span>College Full Stack Java Mini Project</span>
            <span>·</span>
            <span className="font-mono text-slate-400">Spring Boot 3.2 + MySQL + Thymeleaf</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('code-explorer')}
              className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Browse Java Classes
            </button>
            <button
              onClick={() => setActiveTab('viva-guide')}
              className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Viva Questions
            </button>
            <button
              onClick={handleDownloadZip}
              className="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              Download .ZIP
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
