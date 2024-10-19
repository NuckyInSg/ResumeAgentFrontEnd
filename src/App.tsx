import React, { useState } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import ResumeUploader from './components/ResumeUploader';
import JsonEditor from './components/JsonEditor';
import StatusMessage from './components/StatusMessage';
import LoadingModal from './components/LoadingModal';
import { API_BASE_URL } from './config';

function App() {
  const [originalJson, setOriginalJson] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setStatus('Uploading and converting PDF to JSON...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();
        setOriginalJson(JSON.stringify(json, null, 2));
        setStatus('PDF uploaded and converted to JSON successfully. Please review and edit the JSON if needed, then click "Generate PDF".');
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.detail}`);
      }
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setStatus('Generating PDF from JSON...');

    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: originalJson,
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error('Received empty response from server');
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted_resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setStatus('PDF generated and downloaded successfully. You can upload another PDF or edit the JSON to generate a new PDF.');
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        setStatus(`Error generating PDF: ${errorText}`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setStatus(`Error generating PDF: ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Better Resume</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="mr-2" /> Upload Resume
          </h2>
          <ResumeUploader onUpload={handleUpload} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" /> Edit JSON
          </h2>
          <JsonEditor value={originalJson} onChange={setOriginalJson} />
          <button
            onClick={handleGenerate}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            disabled={!originalJson}
          >
            <Download className="mr-2" /> Generate PDF
          </button>
        </div>
        <StatusMessage message={status} />
      </div>
      <LoadingModal isOpen={isLoading} message="Uploading and converting PDF to JSON. This may take a few moments..." />
    </div>
  );
}

export default App;
