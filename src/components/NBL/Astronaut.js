import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const AstronautModel = ({ buoyancyStatus }) => {
    const bodyRef = useRef();
    const gltf = useGLTF('/astronaut.glb');

    useFrame((state) => {
        if (bodyRef.current && buoyancyStatus === 'neutral') {
            bodyRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={bodyRef}>
            {/* Your custom astronaut GLB model */}
            <primitive
                object={gltf.scene}
                scale={1.5}
                position={[0, -1, 0]}
            />

            {/* Status indicator light */}
            <pointLight
                position={[0, 2, 0.7]}
                intensity={0.5}
                color={
                    buoyancyStatus === 'neutral' ? '#00ff88' :
                        buoyancyStatus === 'sinking' ? '#ff4444' : '#44ff44'
                }
                distance={3}
            />
        </group>
    );
};

// Fallback astronaut with realistic geometry
const FallbackAstronaut = ({ buoyancyStatus }) => {
    const bodyRef = useRef();
    const bubbleRef = useRef();

    useFrame((state) => {
        if (bodyRef.current && buoyancyStatus === 'neutral') {
            // Gentle bobbing motion
            bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            bodyRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
            bodyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
        }

        // Animate bubbles
        if (bubbleRef.current) {
            bubbleRef.current.children.forEach((bubble, i) => {
                bubble.position.y += 0.02;
                if (bubble.position.y > 3) bubble.position.y = 0;
                bubble.scale.setScalar(0.1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05);
            });
        }
    });

    return (
        <group ref={bodyRef}>
            {/* ========== HELMET ========== */}
            {/* Main helmet sphere - glass-like */}
            <mesh position={[0, 1.8, 0]} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={0.1}
                    roughness={0.05}
                    transparent
                    opacity={0.4}
                    transmission={0.9}
                    thickness={0.5}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Helmet inner layer */}
            <mesh position={[0, 1.8, 0]}>
                <sphereGeometry args={[0.48, 32, 32]} />
                <meshStandardMaterial
                    color="#f0f0f0"
                    metalness={0.2}
                    roughness={0.3}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Gold visor */}
            <mesh position={[0, 1.8, 0.35]} rotation={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.4, 0.45, 0.5, 32, 1, true, 0, Math.PI]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={0.95}
                    roughness={0.05}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Helmet seal ring */}
            <mesh position={[0, 1.3, 0]}>
                <torusGeometry args={[0.52, 0.05, 16, 32]} />
                <meshStandardMaterial
                    color="#333333"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* ========== BODY/TORSO ========== */}
            {/* Main suit body - white with panels */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.1, 1.4, 0.7]} />
                <meshStandardMaterial
                    color="#f5f5f5"
                    metalness={0.2}
                    roughness={0.6}
                />
            </mesh>

            {/* Red stripe across chest */}
            <mesh position={[0, 0.8, 0.36]}>
                <boxGeometry args={[1.12, 0.15, 0.01]} />
                <meshStandardMaterial
                    color="#cc0000"
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>

            {/* Blue stripe */}
            <mesh position={[0, 0.6, 0.36]}>
                <boxGeometry args={[1.12, 0.12, 0.01]} />
                <meshStandardMaterial
                    color="#0055aa"
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>

            {/* NASA Logo on chest */}
            <mesh position={[0, 1.0, 0.37]}>
                <circleGeometry args={[0.18, 32]} />
                <meshStandardMaterial
                    color="#fc3d21"
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>
            <mesh position={[0, 1.0, 0.38]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Chest control panel */}
            <mesh position={[0.3, 0.4, 0.36]}>
                <boxGeometry args={[0.25, 0.3, 0.02]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
            {/* Panel lights */}
            <mesh position={[0.3, 0.5, 0.38]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial
                    color="#00ff00"
                    emissive="#00ff00"
                    emissiveIntensity={2}
                />
            </mesh>
            <mesh position={[0.3, 0.4, 0.38]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial
                    color="#00ff00"
                    emissive="#00ff00"
                    emissiveIntensity={2}
                />
            </mesh>
            <mesh position={[0.3, 0.3, 0.38]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial
                    color={buoyancyStatus === 'neutral' ? '#00ff00' : '#ff0000'}
                    emissive={buoyancyStatus === 'neutral' ? '#00ff00' : '#ff0000'}
                    emissiveIntensity={2}
                />
            </mesh>

            {/* ========== LIFE SUPPORT BACKPACK ========== */}
            {/* Main PLSS (Portable Life Support System) */}
            <mesh position={[0, 0.7, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[0.9, 1.2, 0.35]} />
                <meshStandardMaterial
                    color="#dddddd"
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>

            {/* Oxygen tanks */}
            <mesh position={[-0.2, 0.7, -0.7]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
                <meshStandardMaterial
                    color="#4a4a4a"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh position={[0.2, 0.7, -0.7]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
                <meshStandardMaterial
                    color="#4a4a4a"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Backpack top antenna */}
            <mesh position={[0, 1.4, -0.5]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial
                    color="#ff6600"
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>
            <mesh position={[0, 1.6, -0.5]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    color="#ff0000"
                    emissive="#ff0000"
                    emissiveIntensity={1}
                />
            </mesh>

            {/* ========== ARMS ========== */}
            {/* Left upper arm */}
            <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, 0.4]} castShadow>
                <cylinderGeometry args={[0.14, 0.16, 0.8, 16]} />
                <meshStandardMaterial color="#f0f0f0" metalness={0.2} roughness={0.6} />
            </mesh>
            {/* Left shoulder joint */}
            <mesh position={[-0.6, 0.9, 0]} castShadow>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Left forearm */}
            <mesh position={[-1.0, 0.0, 0]} rotation={[0.2, 0, 0.3]} castShadow>
                <cylinderGeometry args={[0.12, 0.14, 0.7, 16]} />
                <meshStandardMaterial color="#e8e8e8" metalness={0.3} roughness={0.5} />
            </mesh>
            {/* Left glove */}
            <mesh position={[-1.1, -0.4, 0.1]} rotation={[0.2, 0, 0]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.7} />
            </mesh>

            {/* Right upper arm */}
            <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, -0.4]} castShadow>
                <cylinderGeometry args={[0.14, 0.16, 0.8, 16]} />
                <meshStandardMaterial color="#f0f0f0" metalness={0.2} roughness={0.6} />
            </mesh>
            {/* Right shoulder joint */}
            <mesh position={[0.6, 0.9, 0]} castShadow>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Right forearm */}
            <mesh position={[1.0, 0.0, 0]} rotation={[-0.2, 0, -0.3]} castShadow>
                <cylinderGeometry args={[0.12, 0.14, 0.7, 16]} />
                <meshStandardMaterial color="#e8e8e8" metalness={0.3} roughness={0.5} />
            </mesh>
            {/* Right glove */}
            <mesh position={[1.1, -0.4, 0.1]} rotation={[-0.2, 0, 0]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.7} />
            </mesh>

            {/* ========== LEGS ========== */}
            {/* Left thigh */}
            <mesh position={[-0.25, -0.3, 0]} rotation={[0.1, 0, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.16, 0.9, 16]} />
                <meshStandardMaterial color="#ececec" metalness={0.2} roughness={0.6} />
            </mesh>
            {/* Left knee joint */}
            <mesh position={[-0.25, -0.8, 0.05]}>
                <sphereGeometry args={[0.17, 16, 16]} />
                <meshStandardMaterial color="#bbbbbb" metalness={0.4} roughness={0.5} />
            </mesh>
            {/* Left lower leg */}
            <mesh position={[-0.25, -1.3, 0.1]} rotation={[-0.1, 0, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.17, 0.8, 16]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.5} />
            </mesh>

            {/* Right thigh */}
            <mesh position={[0.25, -0.3, 0]} rotation={[-0.1, 0, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.16, 0.9, 16]} />
                <meshStandardMaterial color="#ececec" metalness={0.2} roughness={0.6} />
            </mesh>
            {/* Right knee joint */}
            <mesh position={[0.25, -0.8, -0.05]}>
                <sphereGeometry args={[0.17, 16, 16]} />
                <meshStandardMaterial color="#bbbbbb" metalness={0.4} roughness={0.5} />
            </mesh>
            {/* Right lower leg */}
            <mesh position={[0.25, -1.3, -0.1]} rotation={[0.1, 0, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.17, 0.8, 16]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.5} />
            </mesh>

            {/* ========== BOOTS ========== */}
            {/* Left boot */}
            <group position={[-0.25, -1.8, 0]}>
                <mesh position={[0, 0, 0.15]} castShadow>
                    <boxGeometry args={[0.28, 0.25, 0.5]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
                </mesh>
                <mesh position={[0, -0.08, 0.35]}>
                    <boxGeometry args={[0.3, 0.1, 0.15]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.8} />
                </mesh>
            </group>

            {/* Right boot */}
            <group position={[0.25, -1.8, 0]}>
                <mesh position={[0, 0, 0.15]} castShadow>
                    <boxGeometry args={[0.28, 0.25, 0.5]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
                </mesh>
                <mesh position={[0, -0.08, 0.35]}>
                    <boxGeometry args={[0.3, 0.1, 0.15]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.8} />
                </mesh>
            </group>

            {/* ========== BUBBLES FROM BACKPACK ========== */}
            <group ref={bubbleRef} position={[0, 0.5, -0.7]}>
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[
                        (Math.random() - 0.5) * 0.3,
                        Math.random() * 2,
                        (Math.random() - 0.5) * 0.3
                    ]}>
                        <sphereGeometry args={[0.05 + Math.random() * 0.05, 16, 16]} />
                        <meshPhysicalMaterial
                            color="#88ccff"
                            transparent
                            opacity={0.3}
                            metalness={0}
                            roughness={0}
                            transmission={0.9}
                        />
                    </mesh>
                ))}
            </group>

            {/* ========== LIGHTING ========== */}
            {/* Helmet light */}
            <spotLight
                position={[0, 1.8, 0.6]}
                angle={0.6}
                penumbra={0.5}
                intensity={0.8}
                distance={10}
                color="#ffffff"
                castShadow
            />

            {/* Status indicator light */}
            <pointLight
                position={[0, 2.2, 0.3]}
                intensity={1}
                color={
                    buoyancyStatus === 'neutral' ? '#00ff88' :
                        buoyancyStatus === 'sinking' ? '#ff4444' : '#44ff44'
                }
                distance={4}
            />
        </group>
    );
};

const Astronaut = ({ buoyancyStatus }) => {
    return (
        <Suspense fallback={<FallbackAstronaut buoyancyStatus={buoyancyStatus} />}>
            <AstronautModel buoyancyStatus={buoyancyStatus} />
        </Suspense>
    );
};

// Preload the model
useGLTF.preload('/astronaut.glb');

export default Astronaut;
