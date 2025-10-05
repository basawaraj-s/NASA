import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Astronaut from './Astronaut';
import PoolEnvironment from './PoolEnvironment';

const NBLScene = ({ astronautWeight, astronautPosition, buoyancyStatus, currentTask }) => {
    const astronautRef = useRef();

    useFrame(() => {
        if (astronautRef.current) {
            // Apply position from controls
            astronautRef.current.position.x = astronautPosition.x;
            astronautRef.current.position.z = astronautPosition.z;

            // Simulate buoyancy movement (vertical)
            if (buoyancyStatus === 'sinking') {
                astronautRef.current.position.y = Math.max(-5, astronautRef.current.position.y - 0.02);
            } else if (buoyancyStatus === 'rising') {
                astronautRef.current.position.y = Math.min(8, astronautRef.current.position.y + 0.02);
            }

            // Small floating animation for neutral buoyancy
            if (buoyancyStatus === 'neutral') {
                astronautRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
            }
        }
    }); return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.4} color="#4488ff" />
            <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" />
            <pointLight position={[0, 5, 0]} intensity={0.6} color="#88ccff" />
            <pointLight position={[0, -5, 0]} intensity={0.3} color="#0066aa" />

            {/* Pool Environment */}
            <PoolEnvironment currentTask={currentTask} />

            {/* Astronaut */}
            <group ref={astronautRef} position={[0, 0, 0]}>
                <Astronaut buoyancyStatus={buoyancyStatus} />
            </group>

            {/* Camera Controls */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                maxDistance={30}
                minDistance={5}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 6}
            />
        </>
    );
};

export default NBLScene;
