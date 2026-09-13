import { useCallback, useRef, useState } from "react";
import { FileText, UploadCloud, X, RefreshCw, CheckCircle2 } from "lucide-react";

interface ResumeUploaderProps {
  file: File | null;
  onFileSelected: (file: File) => void;
  onFileRemoved: () => void;
}

const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];

function isAccepted(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResumeUploader({ file, onFileSelected, onFileRemoved }: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      const candidate = fileList?.[0];
      if (!candidate) return;
      if (!isAccepted(candidate)) {
        setRejectionMessage("Please upload a PDF or DOCX file.");
        return;
      }
      setRejectionMessage("");
      onFileSelected(candidate);
    },
    [onFileSelected]
  );

  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <h3 className="font-display text-base font-bold text-ink-900">Upload your resume</h3>
      <p className="mt-1 text-sm text-ink-500">Drop your resume here or browse from your computer</p>

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragOver ? "border-brand-indigo bg-brand-indigo/[0.04]" : "border-ink-900/[0.12] hover:border-ink-900/[0.2]"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
            <UploadCloud size={22} className="text-brand-indigo" strokeWidth={1.8} />
          </div>
          <p className="mt-3 text-sm font-medium text-ink-700">
            <span className="text-brand-blue">Click to browse</span> or drag and drop
          </p>
          <p className="mt-1 text-xs font-medium tracking-wide text-ink-300">PDF • DOCX</p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            hidden
            aria-label="Upload resume file"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white shadow-sm">
              <FileText size={18} className="text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-ink-900">
                <CheckCircle2 size={14} className="flex-none text-emerald-600" />
                <span className="truncate">{file.name}</span>
              </p>
              <p className="text-xs text-ink-500">
                {file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX"} · {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="flex flex-none items-center gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-white hover:text-ink-900"
              aria-label="Change file"
              title="Change file"
            >
              <RefreshCw size={15} />
            </button>
            <button
              type="button"
              onClick={onFileRemoved}
              className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-white hover:text-red-600"
              aria-label="Remove file"
              title="Remove file"
            >
              <X size={15} />
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              hidden
              aria-label="Replace resume file"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
      )}

      {rejectionMessage && <p className="mt-2 text-xs font-medium text-red-600">{rejectionMessage}</p>}
    </div>
  );
}
