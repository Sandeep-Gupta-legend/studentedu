import React, { useState, useMemo } from 'react';
import { Student } from '../types';
import { DEPARTMENTS } from '../data/sampleStudents';
import {
  Search,
  Plus,
  Download,
  RotateCcw,
  Eye,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { exportStudentsToCsv } from '../utils/zipGenerator';

interface StudentsViewProps {
  students: Student[];
  initialDepartmentFilter?: string;
  onOpenAddModal: () => void;
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onResetSampleData: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  initialDepartmentFilter = '',
  onOpenAddModal,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onResetSampleData
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(initialDepartmentFilter);
  const [sortField, setSortField] = useState<'id' | 'name' | 'department'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter & Search
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Department filter
      if (selectedDept && student.department !== selectedDept) {
        return false;
      }

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = student.name.toLowerCase().includes(q);
        const matchEmail = student.email.toLowerCase().includes(q);
        const matchMobile = student.mobile.includes(q);
        const matchDept = student.department.toLowerCase().includes(q);
        const matchCourse = student.course.toLowerCase().includes(q);
        const matchId = student.id.toString().includes(q);

        if (!matchName && !matchEmail && !matchMobile && !matchDept && !matchCourse && !matchId) {
          return false;
        }
      }

      return true;
    });
  }, [students, selectedDept, searchQuery]);

  // Sorting
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      let comp = 0;
      if (sortField === 'id') {
        comp = a.id - b.id;
      } else if (sortField === 'name') {
        comp = a.name.localeCompare(b.name);
      } else if (sortField === 'department') {
        comp = a.department.localeCompare(b.department);
      }
      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [filteredStudents, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedStudents.length / pageSize) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedStudents.slice(start, start + pageSize);
  }, [sortedStudents, currentPage, pageSize]);

  const toggleSort = (field: 'id' | 'name' | 'department') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDept('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Student Directory
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage institutional records, edit student credentials, and view enrollments.
          </p>
        </div>

        {/* Action Group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportStudentsToCsv(filteredStudents)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onResetSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            title="Reset to 10 standard sample student records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by student name, email, phone, department, course..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Department Filter */}
        <div className="w-full md:w-64">
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:bg-white focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="">All Departments ({students.length})</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Clear */}
        {(searchQuery || selectedDept) && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* High-Density Students Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold tracking-wider border-b border-slate-200">
              <tr>
                <th
                  onClick={() => toggleSort('id')}
                  className="px-4 py-3.5 cursor-pointer hover:bg-slate-100 transition-colors select-none w-20"
                >
                  <div className="flex items-center gap-1.5">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('name')}
                  className="px-4 py-3.5 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Student Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5">Email Address</th>
                <th className="px-4 py-3.5">Mobile</th>
                <th
                  onClick={() => toggleSort('department')}
                  className="px-4 py-3.5 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Department</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5">Course / Degree</th>
                <th className="px-4 py-3.5 text-right w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3 font-mono font-medium text-slate-500 tabular-nums">
                    #{student.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-[11.5px]">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 font-mono tabular-nums text-slate-600">
                    {student.mobile}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <span className="inline-block max-w-[190px] truncate" title={student.department}>
                      {student.department}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="inline-block max-w-[180px] truncate" title={student.course}>
                      {student.course}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center justify-end gap-1">
                      <button
                        onClick={() => onViewStudent(student)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                        title="View Full Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onEditStudent(student)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                        title="Edit Student"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(student)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        title="Delete Student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="max-w-xs mx-auto text-center space-y-3">
                      <p className="text-sm font-medium text-slate-700">No matching students found</p>
                      <p className="text-xs text-slate-400">
                        Try adjusting your search query or department filter to find students.
                      </p>
                      <button
                        onClick={clearFilters}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="tabular-nums">
            Showing <span className="font-semibold text-slate-800">{sortedStudents.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * pageSize, sortedStudents.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{sortedStudents.length}</span> students
            {filteredStudents.length !== students.length && (
              <span className="text-slate-400 ml-1">
                (filtered from {students.length} total)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="px-2 font-medium tabular-nums text-slate-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
