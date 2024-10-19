import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  message: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <Loader className="animate-spin h-12 w-12 text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
