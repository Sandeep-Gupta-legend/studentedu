import React from 'react';
import { Student } from '../types';
import { Users, Building2, GraduationCap, Plus, ArrowRight, Eye, Edit3, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  students: Student[];
  onOpenAddModal: () => void;
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onNavigateToStudents: (filterDept?: string) => void;
  onNavigateToCode: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  onOpenAddModal,
  onViewStudent,
  onEditStudent,
  onNavigateToStudents,
  onNavigateToCode
}) => {
  // Compute department breakdown
  const departmentCounts: Record<string, number> = {};
  const coursesSet = new Set<string>();

  students.forEach((student) => {
    departmentCounts[student.department] = (departmentCounts[student.department] || 0) + 1;
    if (student.course) {
      coursesSet.add(student.course);
    }
  });

  const departmentList = Object.entries(departmentCounts).sort((a, b) => b[1] - a[1]);
  const totalStudents = students.length;
  const totalDepartments = Object.keys(departmentCounts).length;
  const totalCourses = coursesSet.size;

  // Recent 5 students
  const recentStudents = [...students].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Institutional Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time enrollment metrics, departmental distribution, and student records.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateToCode}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Spring Boot Architecture</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Strict Tabular Figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Enrolled
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {totalStudents}
            </span>
            <span className="text-xs text-slate-500">active records</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Across {totalDepartments} academic departments
          </div>
        </div>

        {/* Card 2: Departments */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Departments
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {totalDepartments}
            </span>
            <span className="text-xs text-slate-500">faculties</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Engineering, Tech & Applications
          </div>
        </div>

        {/* Card 3: Active Courses */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Academic Courses
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {totalCourses}
            </span>
            <span className="text-xs text-slate-500">degrees</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            UG, PG & Professional diplomas
          </div>
        </div>

        {/* Card 4: Database / Backend Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Persistence Engine
            </span>
            <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              Ready
            </span>
          </div>
          <div className="mt-3">
            <div className="text-sm font-semibold text-slate-900">
              MySQL + Spring Boot 3
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Port: 8080 · Table: students
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Dual-mode: in-browser & Maven zip
          </div>
        </div>
      </div>

      {/* Two Column Layout: Department Distribution & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Department Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Enrollment by Department
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Share (%)
            </span>
          </div>

          <div className="space-y-4">
            {departmentList.map(([dept, count]) => {
              const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
              return (
                <div
                  key={dept}
                  className="group cursor-pointer"
                  onClick={() => onNavigateToStudents(dept)}
                  title={`Filter by ${dept}`}
                >
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <span className="truncate pr-2 group-hover:text-blue-600 transition-colors">
                      {dept}
                    </span>
                    <span className="tabular-nums font-semibold text-slate-900 shrink-0">
                      {count} <span className="font-normal text-slate-400">({percentage}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300 group-hover:bg-blue-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {departmentList.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400">
                No department data available.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Students Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recently Enrolled Students
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest registrations recorded in database
              </p>
            </div>
            <button
              onClick={() => onNavigateToStudents()}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <span>View all students</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Department</th>
                  <th className="px-4 py-3 hidden md:table-cell">Course</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-slate-500 tabular-nums">
                      #{student.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{student.name}</div>
                      <div className="text-slate-400 text-[11px] font-mono">{student.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell max-w-[150px] truncate">
                      {student.department}
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell max-w-[140px] truncate">
                      {student.course}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onViewStudent(student)}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100 transition-colors"
                          title="Edit Student"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {recentStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                      No student records found. Click &quot;Add Student&quot; to insert the first record.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
