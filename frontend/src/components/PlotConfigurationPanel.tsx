
interface PlotConfigurationPanelProps {
  headers: string[];
  xAxis: string;
  yAxis: string;
  setXAxis: (value: string) => void;
  setYAxis: (value: string) => void;
  plotType: string;
  setPlotType: (value: string) => void;
}

function PlotConfigurationPanel({
  headers,
  xAxis,
  yAxis,
  setXAxis,
  setYAxis,
  plotType,
  setPlotType,
}: PlotConfigurationPanelProps) {
  return (
    <div>
      <h2>Plot Configurations</h2>
      <div>
        <label>Plot Type:</label>
        <select value={plotType} onChange={(e) => setPlotType(e.target.value)}>
          <option value="scatter">Scatter</option>
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="pie">Pie</option>
        </select>
      </div>
      <div>
        <label>X-Axis Label:</label>
        <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
          <option value="">Select X-Axis</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Y-Axis Label:</label>
        <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
          <option value="">Select Y-Axis</option>
          {headers.map((header) => (
            <option key={header} value={header}>
              {header}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PlotConfigurationPanel;
