import React, { useState } from 'react';
import FacialExpression from './components/FacialExpression';
import MoodSongs from './components/MoodSongs';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Mood<span>Tune</span></h1>
        <p>AI-Powered Personal Soundtrack</p>
      </header>

      <main className="dashboard-grid">
        <section className="col-left">
          <FacialExpression setSongs={setSongs} />
        </section>
        
        <section className="col-right">
          <MoodSongs Songs={songs} />
        </section>
      </main>
    </div>
  );
}

export default App;