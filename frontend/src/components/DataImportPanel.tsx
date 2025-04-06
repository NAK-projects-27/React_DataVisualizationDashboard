import React from 'react';

interface DataImportPanelProps {
  onDataUpload: (data: any[], headers: string[]) => void;
  onShowDataTable: () => void;
}

function DataImportPanel({ onDataUpload, onShowDataTable }: DataImportPanelProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== 'string') return;

      const lines = text.split('\n').filter((line) => line.trim() !== '');
      if (lines.length < 2) return;

      const parsedHeaders = lines[0].split(',').map((h) => h.trim());
      const parsedData = lines.slice(1).map((line) => {
        const values = line.split(',').map((val) => val.trim());
        const entry: any = {};
        parsedHeaders.forEach((header, index) => {
          const num = parseFloat(values[index]);
          entry[header] = isNaN(num) ? values[index] : num;
        });
        return entry;
      });

      onDataUpload(parsedData, parsedHeaders);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h2>Data Import</h2>
      <input type="file" accept=".csv, .txt" onChange={handleFileUpload} />
      <button onClick={onShowDataTable}>Show Data Table</button>
    </div>
  );
}

export default DataImportPanel;
