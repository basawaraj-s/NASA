import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import './Hotspots.css';

const Hotspot = ({ position, hotspot, onClick, isSelected }) => {
    const [hovered, setHovered] = useState(false);

    const spherical = new THREE.Spherical();
    spherical.radius = 51; // Slightly above Earth's surface
    spherical.phi = THREE.MathUtils.degToRad(90 - hotspot.coordinates.lat);
    spherical.theta = THREE.MathUtils.degToRad(hotspot.coordinates.lon);

    const vector = new THREE.Vector3();
    vector.setFromSpherical(spherical);

    return (
        <group position={vector}>
            <mesh
                onClick={() => onClick(hotspot)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[1.5, 16, 16]} />
                <meshStandardMaterial
                    color={isSelected ? '#fc3d21' : hovered ? '#ffaa00' : '#00ff88'}
                    emissive={isSelected ? '#fc3d21' : hovered ? '#ff8800' : '#00ff88'}
                    emissiveIntensity={isSelected ? 1 : hovered ? 0.8 : 0.5}
                    toneMapped={false}
                />
            </mesh>

            {(hovered || isSelected) && (
                <Html distanceFactor={10}>
                    <div className="hotspot-label">
                        {hotspot.name}
                    </div>
                </Html>
            )}

            {/* Pulsing ring effect */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2, 2.5, 32]} />
                <meshBasicMaterial
                    color={isSelected ? '#fc3d21' : '#00ff88'}
                    transparent
                    opacity={hovered ? 0.6 : 0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

const Hotspots = ({ hotspots, onHotspotClick, selectedHotspot }) => {
    return (
        <group>
            {hotspots.map((hotspot) => (
                <Hotspot
                    key={hotspot.id}
                    hotspot={hotspot}
                    onClick={onHotspotClick}
                    isSelected={selectedHotspot?.id === hotspot.id}
                />
            ))}
        </group>
    );
};

export default Hotspots;
