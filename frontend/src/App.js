import './App.css';
import Homepage from './components/homepage/Homepage.js';
import Entries from './components/entries/Entries.js';


function App() {
  return (
    <div className="App">
      <div>
        <Homepage />
        <Entries />
      </div>
    </div>
  );
}

export default App;
