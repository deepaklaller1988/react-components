import PdfViewerComponent from './PdfViewerComponent'
import './App.css';

function App() {
  return (
    <div className="App">
      <PdfViewerComponent document = {"document.pdf"}></PdfViewerComponent>
    </div>
  );
}

export default App;
