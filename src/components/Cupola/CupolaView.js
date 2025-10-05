import React, { useState } from 'react';
import './CupolaView.css';

const disasterEvents = [
    {
        id: 1,
        title: "Australian Bushfires 2020",
        image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400",
        description: "Massive wildfires consumed over 46 million acres across Australia. From the ISS, astronauts witnessed enormous plumes of smoke drifting across the Pacific Ocean, visible from space as a brown haze covering thousands of miles.",
        location: "Australia",
        date: "December 2019 - March 2020"
    },
    {
        id: 2,
        title: "Hurricane Katrina 2005",
        image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400",
        description: "One of the deadliest hurricanes in U.S. history. Astronauts captured striking images of the massive storm system with its clearly defined eye, stretching across the Gulf of Mexico before devastating New Orleans.",
        location: "Gulf of Mexico, USA",
        date: "August 2005"
    },
    {
        id: 3,
        title: "Iceland Volcano Eruption",
        image: "https://images.unsplash.com/photo-1603073477976-34bb8b5423df?w=400",
        description: "The Eyjafjallajökull volcano eruption sent massive ash clouds into the atmosphere, disrupting air travel across Europe. From orbit, the ash plume was visible spreading across the North Atlantic.",
        location: "Iceland",
        date: "April 2010"
    },
    {
        id: 4,
        title: "Amazon Rainforest Fires",
        image: "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?w=400",
        description: "Unprecedented fires ravaged the Amazon rainforest, often called the 'lungs of the Earth'. Satellite imagery from the ISS showed thousands of fire spots and thick smoke covering vast areas of Brazil.",
        location: "Amazon Basin, Brazil",
        date: "August 2019"
    },
    {
        id: 5,
        title: "Japan Tsunami 2011",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
        description: "Following a 9.1 magnitude earthquake, a devastating tsunami struck Japan's coast. Astronauts photographed the aftermath, showing flooded coastal areas and the Fukushima nuclear plant disaster from orbit.",
        location: "Japan",
        date: "March 2011"
    },
    {
        id: 6,
        title: "California Wildfires",
        image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=400",
        description: "Massive wildfires burned across California, creating smoke plumes so large they were easily visible from the ISS. Astronauts documented the orange skies and the scale of destruction visible from 250 miles up.",
        location: "California, USA",
        date: "September 2020"
    }
];

const CupolaView = () => {
    const [showEvents, setShowEvents] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showAstronautView, setShowAstronautView] = useState(false);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleViewFromAstronaut = () => {
        setShowAstronautView(true);
    };

    const closeAstronautView = () => {
        setShowAstronautView(false);
        setSelectedEvent(null);
    };

    const closeDetailPanel = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="cupola-view-container">
            {/* Earth Background */}
            <div className="earth-background">
                <div className="earth-glow"></div>
            </div>

            {/* Main Content */}
            <div className="main-content-area">
                {/* Control Button */}
                {!showEvents && !selectedEvent && (
                    <div className="cupola-controls">
                        <button
                            className="events-trigger-btn"
                            onClick={() => setShowEvents(true)}
                        >
                            <span className="btn-icon">🌍</span>
                            <span className="btn-text">Famous Events & Disasters</span>
                        </button>
                    </div>
                )}

                {/* Event Cards Grid */}
                {showEvents && !selectedEvent && (
                    <div className="events-overlay">
                        <div className="events-header">
                            <h2>Earth Events Observed From Space</h2>
                            <button
                                className="close-events-btn"
                                onClick={() => setShowEvents(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="events-grid">
                            {disasterEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="event-card"
                                    onClick={() => handleEventClick(event)}
                                >
                                    <div
                                        className="event-card-image"
                                        style={{ backgroundImage: `url(${event.image})` }}
                                    >
                                        <div className="event-card-overlay"></div>
                                    </div>
                                    <div className="event-card-content">
                                        <h3>{event.title}</h3>
                                        <p className="event-location">📍 {event.location}</p>
                                    </div>
                                    <div className="hologram-effect"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Event Detail Panel */}
                {selectedEvent && !showAstronautView && (
                    <div className="event-detail-panel">
                        <button
                            className="close-detail-btn"
                            onClick={closeDetailPanel}
                        >
                            ← Back to Events
                        </button>
                        <div className="detail-content">
                            <div className="detail-left">
                                <h2>{selectedEvent.title}</h2>
                                <div className="detail-meta">
                                    <span className="meta-item">📍 {selectedEvent.location}</span>
                                    <span className="meta-item">📅 {selectedEvent.date}</span>
                                </div>
                                <p className="detail-description">
                                    {selectedEvent.description}
                                </p>
                                <button
                                    className="view-astronaut-btn"
                                    onClick={handleViewFromAstronaut}
                                >
                                    <span>👨‍🚀</span>
                                    View From Astronaut
                                </button>
                            </div>
                            <div className="detail-right">
                                <div
                                    className="detail-image"
                                    style={{ backgroundImage: `url(${selectedEvent.image})` }}
                                >
                                    <div className="image-overlay">
                                        <span className="image-label">View from ISS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Astronaut View Fullscreen Overlay */}
            {showAstronautView && (
                <div className="astronaut-view-overlay">
                    <button
                        className="close-astronaut-btn"
                        onClick={closeAstronautView}
                    >
                        ✕
                    </button>
                    <div className="astronaut-view-content">
                        <div className="rotating-earth">
                            <div className="earth-sphere"></div>
                        </div>
                        <div className="astronaut-view-text">
                            <h1 className="view-title">The View From Astronaut</h1>
                            <p className="view-subtitle">
                                Witnessing {selectedEvent?.title} from 408 km above Earth
                            </p>
                            <div className="view-quote">
                                <p>"From up here, you can see how fragile our planet is, and how everything is interconnected."</p>
                                <span className="quote-author">- ISS Astronaut</span>
                            </div>
                        </div>
                    </div>
                    <div className="stars-background">
                        {[...Array(100)].map((_, i) => (
                            <div
                                key={i}
                                className="star"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CupolaView;
