import React from 'react';
import { Student } from '../types';
import { X, Mail, Phone, Building2, GraduationCap, Calendar, Edit3, Copy, Check } from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onEdit: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onEdit
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!student) return null;

  const handleCopyDetails = () => {
    const text = `Student ID: #${student.id}\nName: ${student.name}\nEmail: ${student.email}\nMobile: ${student.mobile}\nDepartment: ${student.department}\nCourse: ${student.course}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Header with University Background Scrim */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600/30 border-2 border-white/20 flex items-center justify-center text-xl font-bold font-mono text-white">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-blue-300">
                  STUDENT #{student.id}
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-sm">
                  Active
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
                {student.name}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {student.course}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-3.5">
            {/* Email */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Email Address</span>
                <span className="font-mono text-slate-800 break-all select-all font-medium">
                  {student.email}
                </span>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Mobile Contact</span>
                <span className="font-mono text-slate-800 select-all font-semibold tabular-nums">
                  +91 {student.mobile}
                </span>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Academic Department</span>
                <span className="text-slate-800 font-medium">
                  {student.department}
                </span>
              </div>
            </div>

            {/* Course */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-medium">Enrolled Course / Degree</span>
                <span className="text-slate-800 font-medium">
                  {student.course}
                </span>
              </div>
            </div>

            {/* Date */}
            {student.createdAt && (
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Registration Date</span>
                  <span className="font-mono text-slate-800 tabular-nums">
                    {student.createdAt}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handleCopyDetails}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Details' : 'Copy Record'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onEdit(student);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
