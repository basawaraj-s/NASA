import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import EarthScene from '../Earth/EarthScene';
import HotspotPanel from './HotspotPanel';
import CupolaOverlay from './CupolaOverlay';
import hotspotsData from '../../data/hotspotsData.json';
import './CupolaExperience.css';

const CupolaExperience = () => {
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleHotspotClick = (hotspot) => {
        setSelectedHotspot(hotspot);
    };

    const closePanel = () => {
        setSelectedHotspot(null);
    };

    // Placeholder component for Suspense fallback
    const Loader = () => {
        return (
            <mesh>
                <sphereGeometry args={[50, 32, 32]} />
                <meshStandardMaterial color="#2266aa" wireframe={false} />
            </mesh>
        );
    };

    return (
        <div className="cupola-container">
            <CupolaOverlay />

            <Canvas
                camera={{ position: [0, 0, 150], fov: 60 }}
                onCreated={() => {
                    console.log('Canvas created');
                    setTimeout(() => setIsLoading(false), 1000);
                }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance"
                }}
            >
                <Suspense fallback={<Loader />}>
                    <EarthScene
                        hotspots={hotspotsData}
                        onHotspotClick={handleHotspotClick}
                        selectedHotspot={selectedHotspot}
                    />
                </Suspense>
            </Canvas>

            {isLoading && (
                <div className="loading-screen">
                    <div className="spinner"></div>
                    <p className="mt-4 text-lg">Loading High-Resolution Earth Textures...</p>
                </div>
            )}

            {selectedHotspot && (
                <HotspotPanel
                    hotspot={selectedHotspot}
                    onClose={closePanel}
                />
            )}
        </div>
    );
};

export default CupolaExperience;
