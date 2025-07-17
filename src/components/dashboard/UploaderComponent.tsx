import React from 'react';
import { UploadButton } from 'react-uploader';
import { Uploader } from 'uploader';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

// You can get an API key for free from https://www.upload.io
const uploader = Uploader({ apiKey: 'free' }); // Replace 'free' with your real API key for production

const options = {
  multi: true,
  styles: {
    colors: {
      primary: '#3788d8',
      active: '#3788d8',
      error: '#e53e3e',
      shade100: '#f3f3f3',
      shade200: '#e2e8f0',
      shade300: '#cbd5e1',
      shade400: '#94a3b8',
      shade500: '#64748b',
      shade600: '#334155',
      shade700: '#1e293b',
      shade800: '#0f172a',
      shade900: '#020617',
    },
  },
};

const UploaderComponent: React.FC = () => {
  const [files, setFiles] = React.useState<any[]>([]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
      <img src="/Cloud.png" alt="Upload Cloud" className="w-24 h-24 mb-4 drop-shadow-lg animate-bounce" />
      <UploadButton
        uploader={uploader}
        options={options}
        onComplete={setFiles}
      >
        {({ onClick }) => (
          <Button
            onClick={onClick}
            variant="default"
            size="lg"
            className="flex items-center gap-2 shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
            type="button"
          >
            <UploadCloud className="w-5 h-5" />
            Upload Files
          </Button>
        )}
      </UploadButton>
      <div className="mt-4 space-y-2">
        {files.length > 0 && (
          <div className="text-sm font-medium mb-2">Uploaded Files:</div>
        )}
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              {file.originalFile.originalFileName}
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-400">({Math.round(file.originalFile.size / 1024)} KB)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploaderComponent; 