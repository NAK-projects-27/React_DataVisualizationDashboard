import { useState } from 'react';
import './App.css';
import DataImportPanel from './components/DataImportPanel';
import PlotConfigurationPanel from './components/PlotConfigurationPanel';
import PlotDisplay from './components/PlotDisplay';
import ExportSavePanel from './components/ExportSavePanel';

function DataTable({ data }: { data: any[] }) {
  if (!data.length) return <p>No data available.</p>;
  const headers = Object.keys(data[0]);
  return (
    <table className="data-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((h, i) => (
              <td key={i}>{row[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [showDataTable, setShowDataTable] = useState(false);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [plotType, setPlotType] = useState('scatter');
  
  const handleDataUpload = (parsedData: any[], parsedHeaders: string[]) => {
    setData(parsedData);
    setHeaders(parsedHeaders);
  };

  const handleShowDataTable = () => {
    setShowDataTable(true);
  };

  return (
    <div className="app-container">
      <header className="menu-bar">
        <h1> Data Visualization Dashboard</h1>
      </header>

      <div className="main-window">
        <aside className="sidebar-left">
          <DataImportPanel
            onDataUpload={handleDataUpload}
            onShowDataTable={handleShowDataTable}
          />
          {showDataTable && <DataTable data={data} />}
        </aside>

        <main className="plot-display">
          <PlotDisplay
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
            plotType={plotType}
           
          />
        </main>

        <aside className="sidebar-right">
          <PlotConfigurationPanel
            headers={headers}
            xAxis={xAxis}
            yAxis={yAxis}
            setXAxis={setXAxis}
            setYAxis={setYAxis}
            plotType={plotType}
            setPlotType={setPlotType}
            
          />
        </aside>
      </div>

      <footer className="export-save-panel">
        <ExportSavePanel />
      </footer>
    </div>
  );
}

export default App;
