import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PoolEnvironment = ({ currentTask }) => {
    const waterRef = useRef();
    const particlesRef = useRef();

    // Create bubble particles
    const particles = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 200; i++) {
            positions.push(
                (Math.random() - 0.5) * 40,
                Math.random() * 20 - 10,
                (Math.random() - 0.5) * 40
            );
        }
        return new Float32Array(positions);
    }, []);

    useFrame((state) => {
        // Animate water surface
        if (waterRef.current) {
            waterRef.current.material.uniforms.time = { value: state.clock.elapsedTime };
        }

        // Animate bubbles rising
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] += 0.02;
                if (positions[i] > 10) {
                    positions[i] = -10;
                }
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Pool Floor */}
            <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50, 20, 20]} />
                <meshStandardMaterial
                    color="#1a3a52"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Pool Walls */}
            <mesh position={[0, 2, -25]} receiveShadow>
                <boxGeometry args={[50, 16, 1]} />
                <meshStandardMaterial color="#2a4a62" roughness={0.8} />
            </mesh>
            <mesh position={[0, 2, 25]} receiveShadow>
                <boxGeometry args={[50, 16, 1]} />
                <meshStandardMaterial color="#2a4a62" roughness={0.8} />
            </mesh>
            <mesh position={[-25, 2, 0]} receiveShadow>
                <boxGeometry args={[1, 16, 50]} />
                <meshStandardMaterial color="#2a4a62" roughness={0.8} />
            </mesh>
            <mesh position={[25, 2, 0]} receiveShadow>
                <boxGeometry args={[1, 16, 50]} />
                <meshStandardMaterial color="#2a4a62" roughness={0.8} />
            </mesh>

            {/* Simulated Training Modules */}
            <group position={[-5, -2, -5]}>
                <mesh castShadow>
                    <boxGeometry args={[3, 2, 3]} />
                    <meshStandardMaterial color="#888888" metalness={0.6} roughness={0.4} />
                </mesh>
                <mesh position={[0, 1.5, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} />
                    <meshStandardMaterial color="#fc3d21" />
                </mesh>
            </group>

            {/* Hatch Training Module */}
            <group position={[5, 0, -5]}>
                <mesh castShadow>
                    <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
                    <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
                    <meshStandardMaterial color="#222222" />
                </mesh>
            </group>

            {/* Lunar Rock Sample (for collection task) */}
            <mesh position={[0, -5.5, 5]} castShadow>
                <dodecahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color="#8B7355" roughness={0.9} />
            </mesh>

            {/* Floating Tool (for retrieval task) */}
            <mesh position={[8, 3, 8]} castShadow>
                <boxGeometry args={[0.3, 1.5, 0.3]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Bubble Particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.length / 3}
                        array={particles}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    color="#88ccff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>

            {/* Grid on floor for reference */}
            <gridHelper args={[40, 40, '#0066aa', '#003355']} position={[0, -5.9, 0]} />

            {/* Lighting effects */}
            <mesh position={[0, 8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[30, 30]} />
                <meshBasicMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default PoolEnvironment;
