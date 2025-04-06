import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';

function ExportSavePanel() {
  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector('.app-container') as HTMLElement, {
      callback: function (doc) {
        doc.save('chart.pdf');
      },
    });
  };

  const saveAsPPT = () => {
    const pptx = new pptxgen();
    const slide = pptx.addSlide();
    slide.addText('Chart Export', { x: 1, y: 1, fontSize: 24 });
    pptx.writeFile('chart.pptx');
  };

  const printChart = () => {
    window.print();
  };

  return (
    <div>
      <button onClick={saveAsPDF}>Save as PDF</button>
      <button onClick={saveAsPPT}>Save as PPT</button>
      <button onClick={printChart}>Print</button>
    </div>
  );
}

export default ExportSavePanel;
