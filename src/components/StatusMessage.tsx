import React from 'react';

interface StatusMessageProps {
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  return (
    <div className="text-center text-gray-700 mt-4">
      {message}
    </div>
  );
};

export default StatusMessage;