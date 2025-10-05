import React from 'react';
import './HotspotPanel.css';

const HotspotPanel = ({ hotspot, onClose }) => {
    return (
        <div className="hotspot-panel-overlay" onClick={onClose}>
            <div className="hotspot-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="panel-header">
                    <h2>{hotspot.title}</h2>
                    <div className="coordinates">
                        📍 {hotspot.coordinates.lat.toFixed(2)}°, {hotspot.coordinates.lon.toFixed(2)}°
                    </div>
                </div>

                <div className="panel-image">
                    <img
                        src={hotspot.imageUrl}
                        alt={hotspot.title}
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%230b3d91"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em"%3ENASA Image%3C/text%3E%3C/svg%3E';
                        }}
                    />
                </div>

                <div className="panel-content">
                    <p className="description">{hotspot.description}</p>

                    <div className="observations-section">
                        <h3>🔭 Observations</h3>
                        <ul className="observations-list">
                            {hotspot.observations.map((obs, index) => (
                                <li key={index}>{obs}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="data-grid">
                        <div className="data-item">
                            <span className="data-label">Temperature</span>
                            <span className="data-value">{hotspot.temperature}</span>
                        </div>
                        <div className="data-item">
                            <span className="data-label">Natural Events</span>
                            <span className="data-value">{hotspot.naturalEvents}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotspotPanel;
