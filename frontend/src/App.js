import './App.css';
import Homepage from './components/homepage/Homepage.js';
import Entries from './components/entries/Entries.js';
import RecordingPage from './components/recordingPage/recordingPage';
import {Route, Routes, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
        <Route exact path="/" element={<Homepage />}/>
        <Route path="/entries" element={<Entries />}/>
        <Route path="/recordnow" element={<RecordingPage />}/>
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
