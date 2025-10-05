import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Earth from './Earth';
import Hotspots from './Hotspots';

const EarthScene = ({ hotspots, onHotspotClick, selectedHotspot }) => {
    const earthRef = useRef();

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001;
        }
    });

    console.log('🌍 EarthScene rendering...');

    return (
        <>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={0.5} />

            {/* Main sun light */}
            <directionalLight
                position={[100, 50, 100]}
                intensity={2.0}
                color="#ffffff"
            />

            {/* Secondary light to soften shadows */}
            <directionalLight
                position={[-50, 30, -50]}
                intensity={0.8}
                color="#aaccff"
            />

            {/* Point light for subtle rim lighting */}
            <pointLight
                position={[0, 100, 0]}
                intensity={0.5}
                color="#88bbff"
                distance={300}
            />

            {/* Realistic star field */}
            <Stars
                radius={300}
                depth={60}
                count={8000}
                factor={5}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Earth and hotspots group */}
            <group ref={earthRef}>
                <Earth />
                <Hotspots
                    hotspots={hotspots}
                    onHotspotClick={onHotspotClick}
                    selectedHotspot={selectedHotspot}
                />
            </group>

            {/* Camera controls */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4}
                minDistance={60}
                maxDistance={200}
                autoRotate={false}
                autoRotateSpeed={0.5}
            />
        </>
    );
};

export default EarthScene;
