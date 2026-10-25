import React, { useState, useEffect } from 'react';
import { Student, StudentFormData, ValidationErrors } from '../types';
import { DEPARTMENTS, COURSES_BY_DEPARTMENT } from '../data/sampleStudents';
import { X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData, id?: number) => void;
  studentToEdit?: Student | null;
  existingStudents: Student[];
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  studentToEdit,
  existingStudents
}) => {
  const isEdit = Boolean(studentToEdit);

  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    mobile: '',
    department: '',
    course: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name,
        email: studentToEdit.email,
        mobile: studentToEdit.mobile,
        department: studentToEdit.department,
        course: studentToEdit.course
      });
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        department: '',
        course: ''
      });
    }
    setErrors({});
    setTouched({});
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  // Validation routine
  const validateField = (field: keyof StudentFormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Student full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters long';
        if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Name should only contain letters and spaces';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Institutional/Personal email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Enter a valid email address (e.g., student@college.edu)';
        }
        // Duplicate email check
        const isDuplicate = existingStudents.some(
          (s) => s.email.toLowerCase() === value.trim().toLowerCase() && (!studentToEdit || s.id !== studentToEdit.id)
        );
        if (isDuplicate) {
          return 'This email is already registered in the system';
        }
        return undefined;

      case 'mobile':
        if (!value.trim()) return 'Mobile number is required';
        if (!/^[0-9]{10}$/.test(value.trim())) {
          return 'Mobile number must be exactly 10 numeric digits';
        }
        return undefined;

      case 'department':
        if (!value.trim()) return 'Please select an academic department';
        return undefined;

      case 'course':
        if (!value.trim()) return 'Course / Degree title is required';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof StudentFormData, value: string) => {
    const updated = { ...formData, [field]: value };

    // If department changes and current course is not in that department, auto-select first course
    if (field === 'department') {
      const availableCourses = COURSES_BY_DEPARTMENT[value];
      if (availableCourses && availableCourses.length > 0) {
        updated.course = availableCourses[0];
      }
    }

    setFormData(updated);

    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof StudentFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ValidationErrors = {};
    let hasError = false;

    (Object.keys(formData) as Array<keyof StudentFormData>).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      mobile: true,
      department: true,
      course: true
    });

    if (hasError) return;

    onSave(formData, studentToEdit?.id);
    onClose();
  };

  // Demo auto-fill helper
  const handleAutoFillDemo = () => {
    const demoNames = ['Tanvi Deshmukh', 'Aditya Singhania', 'Ishaan Malhotra', 'Kavya Pillai', 'Rishi Banerjee'];
    const randomName = demoNames[Math.floor(Math.random() * demoNames.length)];
    const randomDept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const courses = COURSES_BY_DEPARTMENT[randomDept] || ['B.Tech Computer Science'];
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const firstName = randomName.split(' ')[0].toLowerCase();

    setFormData({
      name: randomName,
      email: `${firstName}.${randomNum}@college.edu`,
      mobile: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
      department: randomDept,
      course: randomCourse
    });
    setErrors({});
  };

  const availableCourses = formData.department ? COURSES_BY_DEPARTMENT[formData.department] || [] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? 'Edit Student Record' : 'Register New Student'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? `Updating database record for Student #${studentToEdit?.id}`
                : 'Enter details matching institutional enrollment records'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          
          {/* Quick Demo Helper */}
          {!isEdit && (
            <div className="flex items-center justify-between p-2.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs">
              <span className="text-blue-700 font-medium">Quick college testing:</span>
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Sample Data</span>
              </button>
            </div>
          )}

          {/* Student ID display if editing */}
          {isEdit && studentToEdit && (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
              <span>Database Primary Key (\`id\`):</span>
              <span className="font-mono font-bold text-slate-900">#{studentToEdit.id}</span>
            </div>
          )}

          {/* Field 1: Name */}
          <div>
            <label htmlFor="student-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Full Student Name <span className="text-red-500">*</span>
            </label>
            <input
              id="student-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="e.g. Aarav Sharma"
              className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                errors.name
                  ? 'border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : touched.name
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300 focus:border-blue-500'
              } focus:outline-hidden`}
            />
            {errors.name ? (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.name}</span>
              </p>
            ) : touched.name ? (
              <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Valid student name</span>
              </p>
            ) : null}
          </div>

          {/* Field 2: Email */}
          <div>
            <label htmlFor="student-email" className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="student-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="e.g. aarav.sharma@college.edu"
              className={`w-full px-3 py-2 text-xs rounded-lg border font-mono transition-colors ${
                errors.email
                  ? 'border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : touched.email
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300 focus:border-blue-500'
              } focus:outline-hidden`}
            />
            {errors.email ? (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.email}</span>
              </p>
            ) : touched.email ? (
              <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Valid institutional email</span>
              </p>
            ) : null}
          </div>

          {/* Field 3: Mobile (10 digits) */}
          <div>
            <label htmlFor="student-mobile" className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              id="student-mobile"
              type="tel"
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                handleChange('mobile', val);
              }}
              onBlur={() => handleBlur('mobile')}
              placeholder="10-digit number (e.g. 9876543210)"
              className={`w-full px-3 py-2 text-xs rounded-lg border font-mono tabular-nums transition-colors ${
                errors.mobile
                  ? 'border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : touched.mobile
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300 focus:border-blue-500'
              } focus:outline-hidden`}
            />
            {errors.mobile ? (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.mobile}</span>
              </p>
            ) : touched.mobile ? (
              <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>10-digit mobile number verified</span>
              </p>
            ) : (
              <p className="mt-1 text-[10px] text-slate-400">
                Must be exactly 10 digits as validated in Spring Boot `@Pattern(regexp = &quot;^[0-9]{10}$&quot;)`
              </p>
            )}
          </div>

          {/* Field 4: Department */}
          <div>
            <label htmlFor="student-dept" className="block text-xs font-semibold text-slate-700 mb-1">
              Academic Department <span className="text-red-500">*</span>
            </label>
            <select
              id="student-dept"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              onBlur={() => handleBlur('department')}
              className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                errors.department
                  ? 'border-red-500 bg-red-50/30 focus:border-red-500'
                  : 'border-slate-300 focus:border-blue-500'
              } focus:outline-hidden`}
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.department}</span>
              </p>
            )}
          </div>

          {/* Field 5: Course */}
          <div>
            <label htmlFor="student-course" className="block text-xs font-semibold text-slate-700 mb-1">
              Course / Degree Program <span className="text-red-500">*</span>
            </label>
            {availableCourses.length > 0 ? (
              <select
                id="student-course"
                value={formData.course}
                onChange={(e) => handleChange('course', e.target.value)}
                onBlur={() => handleBlur('course')}
                className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                  errors.course
                    ? 'border-red-500 bg-red-50/30 focus:border-red-500'
                    : 'border-slate-300 focus:border-blue-500'
                } focus:outline-hidden`}
              >
                <option value="">-- Select Course --</option>
                {availableCourses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="student-course"
                type="text"
                value={formData.course}
                onChange={(e) => handleChange('course', e.target.value)}
                onBlur={() => handleBlur('course')}
                placeholder="e.g. B.Tech Computer Science - Core"
                className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                  errors.course
                    ? 'border-red-500 bg-red-50/30 focus:border-red-500'
                    : 'border-slate-300 focus:border-blue-500'
                } focus:outline-hidden`}
              />
            )}
            {errors.course && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.course}</span>
              </p>
            )}
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {isEdit ? 'Update Student Record' : 'Save & Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
