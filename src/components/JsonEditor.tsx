import React from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const lightStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  color: '#333',
  stringColor: '#0b7285',
  numberColor: '#1c7ed6',
  booleanColor: '#2b8a3e',
  nullColor: '#868e96',
  keyColor: '#5c940d',
  borderColor: '#e9ecef',
};

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  let jsonValue: object;
  let isValidJson = true;
  try {
    jsonValue = JSON.parse(value);
  } catch (error) {
    isValidJson = false;
    jsonValue = {};
  }

  const handleEdit = (edit: { name: string; value: any; oldValue: any; path: string[] }) => {
    const newJson = { ...jsonValue };
    let current = newJson;
    for (let i = 0; i < edit.path.length - 1; i++) {
      current = current[edit.path[i]];
    }
    current[edit.path[edit.path.length - 1]] = edit.value;
    onChange(JSON.stringify(newJson, null, 2));
  };

  if (!isValidJson || Object.keys(jsonValue).length === 0) {
    return (
      <div className="w-full h-64 border border-gray-300 rounded flex items-center justify-center bg-gray-100 text-gray-500">
        Please upload a PDF to view and edit the JSON data.
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-300 rounded overflow-auto" style={{ height: '400px' }}>
      <JsonView 
        data={jsonValue} 
        style={lightStyles}
        shouldExpandNode={allExpanded}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default JsonEditor;
