import React from 'react';
import './CupolaOverlay.css';

const CupolaOverlay = () => {
    return (
        <div className="cupola-overlay">
            <div className="cupola-info">
                <div className="info-item">
                    <span className="label">Altitude:</span>
                    <span className="value">408 km</span>
                </div>
                <div className="info-item">
                    <span className="label">Speed:</span>
                    <span className="value">27,600 km/h</span>
                </div>
                <div className="info-item">
                    <span className="label">Orbit Time:</span>
                    <span className="value">~90 min</span>
                </div>
            </div>

            <div className="cupola-instructions">
                <h3>🌍 ISS Cupola View</h3>
                <p>Click on glowing markers to explore Earth observations from the International Space Station</p>
                <ul>
                    <li>🖱️ Drag to rotate</li>
                    <li>🔍 Scroll to zoom</li>
                    <li>✨ Click markers for details</li>
                </ul>
            </div>
        </div>
    );
};

export default CupolaOverlay;
