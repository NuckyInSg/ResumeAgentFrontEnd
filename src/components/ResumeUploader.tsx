import React from 'react';

interface ResumeUploaderProps {
  onUpload: (file: File) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUpload }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem('resumeFile') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      onUpload(fileInput.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="file"
        id="resumeFile"
        name="resumeFile"
        accept=".pdf"
        required
        className="flex-grow mr-2 p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Upload PDF
      </button>
    </form>
  );
};

export default ResumeUploader;