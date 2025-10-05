import React, { useState } from 'react';
import Navigation from './components/Shared/Navigation';
import CupolaExperience from './components/Cupola/CupolaExperience';
import NBLExperience from './components/NBL/NBLExperience';
import NBLExperienceEnhanced from './components/NBL/NBLExperienceEnhanced';
import CupolaView from './components/Cupola/CupolaView';
import CupolaGame from './components/Cupola/CupolaGame';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('cupola');

    return (
        <div className="App">
            <Navigation currentView={currentView} setCurrentView={setCurrentView} />

            <main className="main-content">
                {currentView === 'cupola' && (
                    <CupolaExperience key="cupola" />
                )}
                {currentView === 'events' && (
                    <CupolaView key="events" />
                )}
                {currentView === 'game' && (
                    <CupolaGame key="game" />
                )}
                {currentView === 'nbl' && (
                    <NBLExperienceEnhanced key="nbl" />
                )}
                {currentView === 'training' && (
                    <NBLExperience key="training" />
                )}
            </main>
        </div>
    );
}

export default App;
