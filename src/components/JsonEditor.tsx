import React from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-64 p-2 border border-gray-300 rounded font-mono text-sm"
      placeholder="Original JSON will appear here"
    />
  );
};

export default JsonEditor;