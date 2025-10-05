import React from 'react';
import './Navigation.css';

const Navigation = ({ currentView, setCurrentView }) => {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-logo">
                    <h1 className="text-2xl font-bold">
                        <span className="text-nasa-red">NASA</span> ISS Experience
                    </h1>
                </div>

                <div className="nav-buttons">
                    <button
                        className={`nav-btn ${currentView === 'cupola' ? 'active' : ''}`}
                        onClick={() => setCurrentView('cupola')}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cupola View
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'events' ? 'active' : ''}`}
                        onClick={() => setCurrentView('events')}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Events & Disasters
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'game' ? 'active' : ''}`}
                        onClick={() => setCurrentView('game')}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        Space Game
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'nbl' ? 'active' : ''}`}
                        onClick={() => setCurrentView('nbl')}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        NBL Training
                    </button>
                </div>

                <div className="nav-info">
                    <div className="text-sm opacity-70">
                        {currentView === 'cupola' ? 'Orbiting at 408 km' :
                            currentView === 'events' ? 'ISS Cupola Window' :
                                currentView === 'game' ? 'Protect the ISS' : 'NBL Houston, TX'}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
