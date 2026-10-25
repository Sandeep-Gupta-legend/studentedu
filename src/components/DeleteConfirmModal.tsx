import React from 'react';
import { Student } from '../types';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  student,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-slate-900">
              Delete Student Record?
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-900">{student.name}</span> (ID: <span className="font-mono font-medium">#{student.id}</span>)?
              This action simulates executing <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px] text-red-600">studentRepository.deleteById({student.id})</code> in MySQL.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Department:</span>
                <span className="font-medium text-slate-900">{student.department}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Course:</span>
                <span className="font-medium text-slate-900">{student.course}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Email:</span>
                <span className="font-mono text-slate-900">{student.email}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm(student.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Confirm Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
