import React, { useState, useEffect } from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
  };

  const handleBlur = () => {
    try {
      JSON.parse(editValue);
      onChange(editValue);
    } catch (error) {
      alert('Invalid JSON');
      setEditValue(value);
    }
  };

  if (!value) {
    return (
      <div className="w-full h-64 border border-gray-300 rounded flex items-center justify-center bg-gray-100 text-gray-500">
        Please upload a PDF to view and edit the JSON data.
      </div>
    );
  }

  return (
    <textarea
      className="w-full h-96 p-2 border border-gray-300 rounded font-mono text-sm"
      value={editValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default JsonEditor;
