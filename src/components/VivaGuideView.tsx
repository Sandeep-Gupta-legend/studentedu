import React, { useState } from 'react';
import { HelpCircle, BookOpen, Layers, CheckCircle2, ChevronDown, ChevronUp, Terminal, Database, Server } from 'lucide-react';

interface VivaQuestion {
  id: number;
  question: string;
  category: 'Spring Boot' | 'Hibernate & JPA' | 'Thymeleaf & Frontend' | 'MySQL & Database' | 'Architecture';
  answer: string;
  codeSnippet?: string;
}

const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    question: 'What is Spring Boot and why did you choose it over standard Spring MVC?',
    category: 'Spring Boot',
    answer: 'Spring Boot is an opinionated framework that simplifies Spring development. It eliminates tedious XML configuration via Auto-Configuration, bundles an embedded Tomcat web server (so you can run a standalone JAR without installing an external server), and uses curated Starter dependencies (like spring-boot-starter-web and spring-boot-starter-data-jpa).',
    codeSnippet: `@SpringBootApplication // Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan`
  },
  {
    id: 2,
    question: 'Explain the 3-Tier Layered Architecture used in this project.',
    category: 'Architecture',
    answer: 'Our application follows the standard enterprise Separation of Concerns:\n1. Presentation Layer (Controller & Thymeleaf): Handles HTTP requests, populates Model attributes, and renders HTML views.\n2. Service Layer (StudentService & StudentServiceImpl): Implements business rules, validation, and transaction boundaries (@Transactional).\n3. Data Access Layer (StudentRepository & MySQL): Manages database persistence via Spring Data JPA and Hibernate.',
    codeSnippet: `Browser -> StudentController -> StudentService -> StudentRepository -> MySQL Database`
  },
  {
    id: 3,
    question: 'What is Spring Data JPA and what are the benefits of extending JpaRepository?',
    category: 'Hibernate & JPA',
    answer: 'Spring Data JPA reduces boilerplate code by generating data access methods dynamically at runtime. By creating `public interface StudentRepository extends JpaRepository<Student, Long>`, Spring provides built-in implementations for save(), findById(), findAll(), deleteById(), and count() without writing a single line of SQL or JDBC code.',
    codeSnippet: `public interface StudentRepository extends JpaRepository<Student, Long> {\n    List<Student> findByDepartment(String department);\n}`
  },
  {
    id: 4,
    question: 'What is Thymeleaf and how is it different from traditional JSP (JavaServer Pages)?',
    category: 'Thymeleaf & Frontend',
    answer: 'Thymeleaf is a modern server-side Java template engine for web and standalone environments. Unlike JSP, Thymeleaf produces "natural templates" (valid HTML5 files that can be opened and styled in any web browser without running the server). It executes server expressions like `th:text`, `th:each`, `th:field`, and `th:action` during request processing.',
    codeSnippet: `<tr th:each="student : \${students}">\n    <td th:text="\${student.name}">Student Name</td>\n</tr>`
  },
  {
    id: 5,
    question: 'How is Form Validation implemented both client-side and server-side?',
    category: 'Architecture',
    answer: 'Two-tier validation is implemented:\n1. Client-Side: JavaScript checks names, ensures mobile is 10 digits, and confirms valid email format before form submission for fast user feedback.\n2. Server-Side: Jakarta Validation annotations on the Student entity (@NotBlank, @Email, @Pattern(regexp="^[0-9]{10}$")) are validated in the Controller using @Valid and BindingResult. If validation fails, error messages are bound back to Thymeleaf using th:errors without data loss.',
    codeSnippet: `@PostMapping("/students")\npublic String saveStudent(@Valid @ModelAttribute("student") Student student,\n                          BindingResult result, Model model) {\n    if (result.hasErrors()) return "student-form";\n    studentService.saveStudent(student);\n    return "redirect:/students";\n}`
  },
  {
    id: 6,
    question: 'What does `spring.jpa.hibernate.ddl-auto=update` do in application.properties?',
    category: 'MySQL & Database',
    answer: '`ddl-auto=update` instructs Hibernate to compare your JPA Entity classes with the actual database tables on application startup. If a new column or table is detected, Hibernate automatically executes ALTER TABLE or CREATE TABLE in MySQL without destroying or deleting existing student records.',
    codeSnippet: `spring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true`
  },
  {
    id: 7,
    question: 'What is Constructor Injection and why is it preferred over @Autowired field injection?',
    category: 'Spring Boot',
    answer: 'In StudentServiceImpl and StudentController, we use constructor injection: `public StudentController(StudentService service) { this.service = service; }`. It ensures required dependencies are never null, makes unit testing easier without needing a Spring container, and allows fields to be marked `final` for immutability.',
    codeSnippet: `private final StudentService studentService;\npublic StudentController(StudentService studentService) {\n    this.studentService = studentService;\n}`
  },
  {
    id: 8,
    question: 'How is the Search feature implemented in the repository?',
    category: 'Hibernate & JPA',
    answer: 'We wrote a custom JPQL query using `@Query`. It checks for case-insensitive substrings across student name, email, mobile, department, and course using `LOWER(s.name) LIKE LOWER(CONCAT(\'%\', :keyword, \'%\'))`.',
    codeSnippet: `@Query("SELECT s FROM Student s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :kw, '%')) OR s.mobile LIKE CONCAT('%', :kw, '%')")\nList<Student> searchStudents(@Param("kw") String keyword);`
  },
  {
    id: 9,
    question: 'Why did you use RedirectAttributes with `addFlashAttribute` after saving/updating/deleting?',
    category: 'Spring Boot',
    answer: 'To prevent the "Duplicate Form Submission on Page Refresh" issue (the Post/Redirect/Get pattern). When a student is saved, we redirect to `/students`. `addFlashAttribute("successMessage", "...")` temporarily stores the notification in the HTTP session until the next GET request, after which it is automatically cleared.',
    codeSnippet: `redirectAttributes.addFlashAttribute("successMessage", "Student added successfully!");\nreturn "redirect:/students";`
  },
  {
    id: 10,
    question: 'What are the main annotations on the Student Entity class?',
    category: 'Hibernate & JPA',
    answer: '`@Entity` marks the POJO as a JPA entity. `@Table(name="students")` specifies the MySQL table. `@Id` marks the primary key. `@GeneratedValue(strategy=GenerationType.IDENTITY)` configures MySQL AUTO_INCREMENT. `@Column` specifies column constraints. `@NotBlank` and `@Email` validate user input.',
    codeSnippet: `@Entity\n@Table(name = "students")\npublic class Student {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n}`
  }
];

export const VivaGuideView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = ['All', 'Spring Boot', 'Hibernate & JPA', 'Thymeleaf & Frontend', 'MySQL & Database', 'Architecture'];

  const filtered = activeCategory === 'All'
    ? VIVA_QUESTIONS
    : VIVA_QUESTIONS.filter((q) => q.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            College Viva Voce & Presentation Guide
          </h1>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-sm font-semibold">
            Exam Prep
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Frequently asked viva questions, internal architecture flow, and execution walkthrough for your project review.
        </p>
      </div>

      {/* System Flow Diagram Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Full Stack Spring Boot Request-Response Lifecycle</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center my-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1: Client</span>
            <div className="text-xs font-bold text-slate-900">Browser / UI</div>
            <p className="text-[11px] text-slate-500 mt-1">HTTP GET / POST with HTML form data</p>
          </div>

          <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-blue-500 block mb-1">Step 2: Controller</span>
            <div className="text-xs font-bold text-blue-900">StudentController</div>
            <p className="text-[11px] text-blue-700 mt-1">@Valid binds form & checks BindingResult</p>
          </div>

          <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-indigo-500 block mb-1">Step 3: Service</span>
            <div className="text-xs font-bold text-indigo-900">StudentServiceImpl</div>
            <p className="text-[11px] text-indigo-700 mt-1">Applies @Transactional business logic</p>
          </div>

          <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-purple-500 block mb-1">Step 4: Repository</span>
            <div className="text-xs font-bold text-purple-900">StudentRepository</div>
            <p className="text-[11px] text-purple-700 mt-1">Spring Data JPA / Hibernate ORM</p>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-emerald-500 block mb-1">Step 5: Database</span>
            <div className="text-xs font-bold text-emerald-900">MySQL Database</div>
            <p className="text-[11px] text-emerald-700 mt-1">Table: students in student_db</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Q&A Accordion List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                    Q{item.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.question}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Category: {item.category}
                    </span>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3">
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-9">
                    {item.answer}
                  </div>

                  {item.codeSnippet && (
                    <div className="ml-9 p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto">
                      <pre className="m-0">{item.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step-by-Step Setup Guide Box */}
      <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Quick 3-Minute College Lab Setup</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>1. MySQL Setup</span>
            </div>
            <p className="leading-relaxed">
              Start MySQL service in XAMPP or Workbench. Open SQL query tab and run:
              <code className="block mt-1 bg-slate-950 p-1 rounded font-mono text-emerald-300">
                CREATE DATABASE student_db;
              </code>
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              <span>2. IDE Import</span>
            </div>
            <p className="leading-relaxed">
              Extract downloaded ZIP. In IntelliJ IDEA: <strong>File &gt; Open</strong> &gt; Select folder.
              In Eclipse: <strong>File &gt; Import &gt; Existing Maven Projects</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>3. Launch & Demo</span>
            </div>
            <p className="leading-relaxed">
              Right-click <code className="text-emerald-300">StudentManagementApplication.java</code> &gt; <strong>Run</strong>, or execute:
              <code className="block mt-1 bg-slate-950 p-1 rounded font-mono text-emerald-300">
                mvn spring-boot:run
              </code>
              Visit <code className="text-blue-300">http://localhost:8080</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
