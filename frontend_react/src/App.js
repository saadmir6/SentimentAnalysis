import Navbar from './Navbar.js'
import './App.css';
import './index.css';
import SearchBar from './SearchBar.js';
import SearchButton from './Searchbutton.js';
import PieChart from './PieChart.js';
import { useState } from 'react';
import Footer from './Footer'


function App() {
  const [result, setResult] = useState({Negative: 0, Neutral: 0, Positive: 0})

  function updateResult(data) {
     setResult(data)
  }
 
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <SearchButton callback={updateResult} />
      <PieChart result={result} />
      <Footer />
    </div>
  );
}

export default App;
