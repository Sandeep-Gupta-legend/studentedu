import React, { useState } from 'react';
import { JAVA_PROJECT_FILES } from '../data/javaProjectFiles';
import { JavaProjectFile } from '../types';
import {
  FileCode,
  Folder,
  FolderOpen,
  Copy,
  Check,
  Download,
  Terminal,
  Database,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface CodeExplorerViewProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const CodeExplorerView: React.FC<CodeExplorerViewProps> = ({
  onDownloadZip,
  isDownloading
}) => {
  const [selectedFile, setSelectedFile] = useState<JavaProjectFile>(
    JAVA_PROJECT_FILES.find((f) => f.name === 'StudentController.java') || JAVA_PROJECT_FILES[0]
  );
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = JAVA_PROJECT_FILES.filter((f) =>
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group files by category
  const categories: Array<JavaProjectFile['category']> = [
    'Controller',
    'Service',
    'Repository',
    'Entity',
    'Configuration',
    'Database',
    'Thymeleaf',
    'Static',
    'Documentation'
  ];

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Spring Boot Project Architecture
            </h1>
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-sm font-semibold">
              Maven + Java 17
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Complete source code files ready for IntelliJ IDEA, Eclipse STS, VS Code, and MySQL Workbench.
          </p>
        </div>

        <button
          onClick={onDownloadZip}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap self-start sm:self-auto disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Packaging Project ZIP...' : 'Download Complete Project (.ZIP)'}</span>
        </button>
      </div>

      {/* Main IDE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Left Sidebar: File Tree (4 cols) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-3 border-b border-slate-200">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Project Explorer ({JAVA_PROJECT_FILES.length} Files)</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter file by name..."
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="p-2 overflow-y-auto max-h-[640px] space-y-3">
            {categories.map((cat) => {
              const filesInCat = filteredFiles.filter((f) => f.category === cat);
              if (filesInCat.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <div className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    {cat === 'Database' ? (
                      <Database className="w-3 h-3 text-amber-500" />
                    ) : cat === 'Controller' || cat === 'Service' || cat === 'Repository' || cat === 'Entity' ? (
                      <Layers className="w-3 h-3 text-blue-500" />
                    ) : (
                      <Folder className="w-3 h-3 text-slate-400" />
                    )}
                    <span>{cat}</span>
                  </div>

                  <div className="space-y-0.5">
                    {filesInCat.map((file) => {
                      const isSelected = selectedFile.path === file.path;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white font-semibold shadow-xs'
                              : 'text-slate-700 hover:bg-slate-200/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileCode
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isSelected ? 'text-white' : 'text-slate-400'
                              }`}
                            />
                            <span className="truncate">{file.name}</span>
                          </div>
                          <span
                            className={`text-[10px] uppercase font-mono px-1 rounded-sm shrink-0 ml-1 ${
                              isSelected
                                ? 'bg-blue-700 text-blue-100'
                                : 'bg-slate-200/60 text-slate-500'
                            }`}
                          >
                            {file.language}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="p-3 m-2 mt-auto bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900">
            <div className="flex items-center gap-1.5 font-semibold mb-1">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Standard Maven Layout</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Standard folder convention: <code className="font-mono text-[10.5px]">src/main/java</code> for classes, <code className="font-mono text-[10.5px]">src/main/resources</code> for properties & templates.
            </p>
          </div>
        </div>

        {/* Right Pane: Code Viewer & Actions (8 cols) */}
        <div className="lg:col-span-8 flex flex-col min-w-0">
          {/* File Tab Header */}
          <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-400 font-semibold">
                  {selectedFile.path}
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">
                  {selectedFile.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {selectedFile.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Viewer with Line Numbers */}
          <div className="p-4 bg-slate-950 text-slate-200 overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs leading-relaxed">
            <pre className="m-0">
              <code>
                {selectedFile.content.split('\n').map((line, idx) => (
                  <div key={idx} className="table-row hover:bg-slate-900/60 transition-colors">
                    <span className="table-cell pr-4 text-right select-none text-slate-600 font-mono text-[11px] w-10">
                      {idx + 1}
                    </span>
                    <span className="table-cell whitespace-pre">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Quick Terminal Command Tip */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Run via Maven:</span>
              <code className="text-emerald-300 font-mono bg-slate-950 px-2 py-0.5 rounded">
                mvn clean spring-boot:run
              </code>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Port: 8080 · URL: http://localhost:8080
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
