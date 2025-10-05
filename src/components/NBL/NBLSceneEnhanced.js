/* ============================================
   ENHANCED NBL 3D SCENE
   Underwater Training Environment with Physics
   ============================================ */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Astronaut from './Astronaut';

// ============================================
// FLOATING TOOL COMPONENT
// ============================================
const FloatingTool = ({ tool, astronautPosition }) => {
    const meshRef = useRef();
    const ringRef = useRef();

    // Calculate distance to astronaut
    const distance = astronautPosition ? Math.sqrt(
        Math.pow(tool.position.x - astronautPosition.x, 2) +
        Math.pow(tool.position.y - astronautPosition.y, 2) +
        Math.pow(tool.position.z - astronautPosition.z, 2)
    ) : 999;

    const isNear = distance < 3;

    useFrame((state) => {
        if (meshRef.current && !tool.collected) {
            meshRef.current.rotation.y = tool.rotation;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }

        // Animate proximity ring
        if (ringRef.current && isNear) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 2;
            ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
        }
    });

    if (tool.collected) return null;

    const toolColors = {
        wrench: '#FFD700',
        screwdriver: '#FF6B6B',
        pliers: '#4ECDC4',
        hammer: '#95E1D3'
    };

    const toolColor = toolColors[tool.type] || '#FFD700';

    // Different tool shapes based on type
    const renderTool = () => {
        switch (tool.type) {
            case 'wrench':
                return (
                    <group>
                        {/* Wrench handle */}
                        <mesh castShadow>
                            <cylinderGeometry args={[0.08, 0.08, 0.9, 16]} />
                            <meshStandardMaterial
                                color="#c0c0c0"
                                metalness={0.9}
                                roughness={0.2}
                            />
                        </mesh>
                        {/* Wrench head - open end */}
                        <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                            <torusGeometry args={[0.15, 0.04, 16, 32, Math.PI]} />
                            <meshStandardMaterial
                                color="#a0a0a0"
                                metalness={0.95}
                                roughness={0.1}
                            />
                        </mesh>
                        {/* Wrench sides */}
                        <mesh position={[-0.15, 0.6, 0]} castShadow>
                            <boxGeometry args={[0.04, 0.12, 0.08]} />
                            <meshStandardMaterial color="#a0a0a0" metalness={0.95} roughness={0.1} />
                        </mesh>
                        <mesh position={[0.15, 0.6, 0]} castShadow>
                            <boxGeometry args={[0.04, 0.12, 0.08]} />
                            <meshStandardMaterial color="#a0a0a0" metalness={0.95} roughness={0.1} />
                        </mesh>
                        {/* Grip texture */}
                        <mesh position={[0, -0.2, 0]}>
                            <cylinderGeometry args={[0.09, 0.09, 0.4, 16]} />
                            <meshStandardMaterial color="#ff6600" roughness={0.8} />
                        </mesh>
                    </group>
                );

            case 'screwdriver':
                return (
                    <group>
                        {/* Handle */}
                        <mesh position={[0, -0.3, 0]} castShadow>
                            <cylinderGeometry args={[0.08, 0.06, 0.4, 16]} />
                            <meshStandardMaterial
                                color="#ff4444"
                                metalness={0.3}
                                roughness={0.6}
                            />
                        </mesh>
                        {/* Metal shaft */}
                        <mesh position={[0, 0.1, 0]} castShadow>
                            <cylinderGeometry args={[0.02, 0.02, 0.6, 12]} />
                            <meshStandardMaterial
                                color="#d0d0d0"
                                metalness={0.95}
                                roughness={0.1}
                            />
                        </mesh>
                        {/* Tip */}
                        <mesh position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
                            <boxGeometry args={[0.03, 0.08, 0.01]} />
                            <meshStandardMaterial
                                color="#909090"
                                metalness={0.98}
                                roughness={0.05}
                            />
                        </mesh>
                        {/* Handle end cap */}
                        <mesh position={[0, -0.52, 0]}>
                            <sphereGeometry args={[0.06, 16, 16]} />
                            <meshStandardMaterial color="#cc0000" metalness={0.2} roughness={0.7} />
                        </mesh>
                    </group>
                );

            case 'pliers':
                return (
                    <group>
                        {/* Handle 1 */}
                        <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, -0.3]} castShadow>
                            <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
                            <meshStandardMaterial color="#0088ff" metalness={0.4} roughness={0.6} />
                        </mesh>
                        {/* Handle 2 */}
                        <mesh position={[0.08, -0.2, 0]} rotation={[0, 0, 0.3]} castShadow>
                            <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
                            <meshStandardMaterial color="#0088ff" metalness={0.4} roughness={0.6} />
                        </mesh>
                        {/* Pivot */}
                        <mesh position={[0, 0.05, 0]} castShadow>
                            <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
                            <meshStandardMaterial color="#606060" metalness={0.9} roughness={0.2} />
                        </mesh>
                        {/* Jaw 1 */}
                        <mesh position={[-0.06, 0.25, 0]} rotation={[0, 0, -0.2]} castShadow>
                            <boxGeometry args={[0.05, 0.3, 0.06]} />
                            <meshStandardMaterial color="#b0b0b0" metalness={0.95} roughness={0.1} />
                        </mesh>
                        {/* Jaw 2 */}
                        <mesh position={[0.06, 0.25, 0]} rotation={[0, 0, 0.2]} castShadow>
                            <boxGeometry args={[0.05, 0.3, 0.06]} />
                            <meshStandardMaterial color="#b0b0b0" metalness={0.95} roughness={0.1} />
                        </mesh>
                    </group>
                );

            case 'hammer':
                return (
                    <group>
                        {/* Handle */}
                        <mesh position={[0, -0.1, 0]} castShadow>
                            <cylinderGeometry args={[0.06, 0.06, 0.8, 16]} />
                            <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
                        </mesh>
                        {/* Handle grip */}
                        <mesh position={[0, -0.3, 0]}>
                            <cylinderGeometry args={[0.07, 0.07, 0.3, 16]} />
                            <meshStandardMaterial color="#654321" roughness={0.95} />
                        </mesh>
                        {/* Hammer head */}
                        <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                            <boxGeometry args={[0.35, 0.15, 0.12]} />
                            <meshStandardMaterial
                                color="#707070"
                                metalness={0.95}
                                roughness={0.15}
                            />
                        </mesh>
                        {/* Claw */}
                        <mesh position={[0, 0.4, 0.12]} rotation={[0.3, 0, Math.PI / 2]} castShadow>
                            <boxGeometry args={[0.15, 0.08, 0.06]} />
                            <meshStandardMaterial color="#606060" metalness={0.9} roughness={0.2} />
                        </mesh>
                    </group>
                );

            default:
                return (
                    <group>
                        <mesh castShadow>
                            <boxGeometry args={[0.2, 0.8, 0.2]} />
                            <meshStandardMaterial
                                color={toolColor}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={toolColor}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
        }
    };

    return (
        <group ref={meshRef} position={[tool.position.x, tool.position.y, tool.position.z]}>
            {/* Render the specific tool */}
            {renderTool()}

            {/* Proximity Ring - Shows when player is near */}
            {isNear && (
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <ringGeometry args={[1, 1.3, 32]} />
                    <meshBasicMaterial
                        color="#00ff88"
                        transparent
                        opacity={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* Glow indicator */}
            <pointLight
                position={[0, 0, 0]}
                intensity={0.5}
                distance={3}
                color={toolColors[tool.type] || '#FFD700'}
            />

            {/* Floating particles around tool */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={20}
                        array={new Float32Array(60).map(() => (Math.random() - 0.5) * 2)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color={toolColors[tool.type] || '#FFD700'}
                    transparent
                    opacity={0.6}
                />
            </points>
        </group>
    );
};

// ============================================
// REPAIR PANEL COMPONENT
// ============================================
const RepairPanel = ({ panel, astronautPosition, hasTool }) => {
    const meshRef = useRef();
    const ringRef = useRef();
    const healthPercent = (panel.health / panel.maxHealth) * 100;

    // Calculate distance to astronaut
    const distance = astronautPosition ? Math.sqrt(
        Math.pow(panel.position.x - astronautPosition.x, 2) +
        Math.pow(panel.position.y - astronautPosition.y, 2) +
        Math.pow(panel.position.z - astronautPosition.z, 2)
    ) : 999;

    const isNear = distance < 3 && !panel.repaired;
    const canRepair = isNear && hasTool;

    useFrame((state) => {
        if (meshRef.current && !panel.repaired) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }

        // Animate proximity ring
        if (ringRef.current && isNear) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 2;
            ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
        }
    });

    return (
        <group ref={meshRef} position={[panel.position.x, panel.position.y, panel.position.z]}>
            {/* Proximity Ring */}
            {isNear && (
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <ringGeometry args={[1.5, 1.8, 32]} />
                    <meshBasicMaterial
                        color={canRepair ? '#00ff88' : '#ffaa00'}
                        transparent
                        opacity={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* Panel Frame - Metal housing */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.6, 1.1, 0.15]} />
                <meshStandardMaterial
                    color="#404040"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Panel base - Circuit board */}
            <mesh position={[0, 0, 0.05]} castShadow receiveShadow>
                <boxGeometry args={[1.4, 0.95, 0.08]} />
                <meshStandardMaterial
                    color={panel.repaired ? '#00aa55' : '#aa2222'}
                    metalness={0.4}
                    roughness={0.6}
                    emissive={panel.repaired ? '#00ff88' : '#ff4444'}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Corner bolts */}
            {[-0.7, 0.7].map((x) =>
                [-0.45, 0.45].map((y) => (
                    <mesh key={`bolt-${x}-${y}`} position={[x, y, 0.08]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.04, 8]} />
                        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.2} />
                    </mesh>
                ))
            )}

            {/* Circuit paths - Green traces */}
            <mesh position={[-0.3, 0.1, 0.09]}>
                <boxGeometry args={[0.8, 0.02, 0.01]} />
                <meshBasicMaterial color="#00ff88" />
            </mesh>
            <mesh position={[0.3, -0.1, 0.09]}>
                <boxGeometry args={[0.6, 0.02, 0.01]} />
                <meshBasicMaterial color="#00ff88" />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
                <boxGeometry args={[0.02, 0.6, 0.01]} />
                <meshBasicMaterial color="#00ff88" />
            </mesh>

            {/* Resistors / Capacitors */}
            {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
                <mesh key={`component-${i}`} position={[x, -0.2, 0.1]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.08, 8]} />
                    <meshStandardMaterial
                        color={panel.repaired ? '#0066ff' : '#ff6600'}
                        metalness={0.5}
                        roughness={0.4}
                    />
                </mesh>
            ))}

            {/* Central processor chip */}
            <mesh position={[0, 0, 0.12]} castShadow>
                <boxGeometry args={[0.25, 0.25, 0.06]} />
                <meshStandardMaterial
                    color="#202020"
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            {/* Chip pins */}
            {[-0.15, -0.05, 0.05, 0.15].map((offset, i) => (
                <mesh key={`pin-left-${i}`} position={[-0.14, offset, 0.12]}>
                    <boxGeometry args={[0.02, 0.02, 0.03]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.1} />
                </mesh>
            ))}
            {[-0.15, -0.05, 0.05, 0.15].map((offset, i) => (
                <mesh key={`pin-right-${i}`} position={[0.14, offset, 0.12]}>
                    <boxGeometry args={[0.02, 0.02, 0.03]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.1} />
                </mesh>
            ))}

            {/* Health bar background */}
            <mesh position={[0, 0.48, 0.13]}>
                <planeGeometry args={[1.3, 0.12]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
            {/* Health bar fill */}
            <mesh position={[-0.65 + (healthPercent / 100) * 0.65, 0.48, 0.14]}>
                <planeGeometry args={[(healthPercent / 100) * 1.3, 0.10]} />
                <meshBasicMaterial color={panel.repaired ? '#00ff88' : '#ffaa00'} />
            </mesh>

            {/* Status LED indicators with housings */}
            {[-0.5, 0, 0.5].map((xPos, idx) => {
                const isLit = idx === 0 ? panel.repaired : idx === 1 ? healthPercent > 50 : healthPercent > 75;
                return (
                    <group key={`led-${idx}`} position={[xPos, -0.3, 0.09]}>
                        {/* LED housing */}
                        <mesh>
                            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
                            <meshStandardMaterial color="#303030" metalness={0.6} roughness={0.4} />
                        </mesh>
                        {/* LED light */}
                        <mesh position={[0, 0, 0.02]}>
                            <circleGeometry args={[0.05, 16]} />
                            <meshBasicMaterial
                                color={isLit ? (panel.repaired ? '#00ff88' : '#00ff00') : '#ff0000'}
                            />
                        </mesh>
                    </group>
                );
            })}

            {/* Damage indicators - Cracks and burn marks when damaged */}
            {!panel.repaired && healthPercent < 60 && (
                <>
                    <mesh position={[0.3, 0.2, 0.13]} rotation={[0, 0, 0.5]}>
                        <planeGeometry args={[0.3, 0.02]} />
                        <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                    </mesh>
                    <mesh position={[-0.2, -0.1, 0.13]} rotation={[0, 0, -0.3]}>
                        <planeGeometry args={[0.25, 0.02]} />
                        <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                    </mesh>
                    {/* Burn mark */}
                    <mesh position={[0.4, -0.3, 0.13]}>
                        <circleGeometry args={[0.1, 16]} />
                        <meshBasicMaterial color="#1a0a00" transparent opacity={0.7} />
                    </mesh>
                </>
            )}

            {/* Wiring connectors */}
            <mesh position={[-0.6, 0, 0.1]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
                <meshStandardMaterial color="#ffcc00" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0.6, 0, 0.1]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
                <meshStandardMaterial color="#0088ff" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Glow */}
            <pointLight
                position={[0, 0, 0.3]}
                intensity={panel.repaired ? 1 : 0.3}
                distance={4}
                color={panel.repaired ? '#00ff88' : '#ff4444'}
            />
        </group>
    );
};

// ============================================
// CABLE COMPONENT
// ============================================
const Cable = ({ cable, astronautPosition }) => {
    const lineRef = useRef();
    const ringRef = useRef();

    // Calculate distance to astronaut
    const distance = astronautPosition ? Math.sqrt(
        Math.pow(cable.position.x - astronautPosition.x, 2) +
        Math.pow(cable.position.y - astronautPosition.y, 2) +
        Math.pow(cable.position.z - astronautPosition.z, 2)
    ) : 999;

    const isNear = distance < 3 && !cable.connected;

    useFrame((state) => {
        if (lineRef.current && !cable.connected) {
            const curve = lineRef.current.geometry.attributes.position;
            for (let i = 0; i < curve.count; i++) {
                curve.array[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01;
            }
            curve.needsUpdate = true;
        }

        // Animate proximity ring
        if (ringRef.current && isNear) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 2;
            ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
        }
    });

    // Create cable curve
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        points.push(new THREE.Vector3(
            cable.position.x + (cable.connectionPoint.x - cable.position.x) * t,
            cable.position.y + Math.sin(t * Math.PI) * 2,
            cable.position.z + (cable.connectionPoint.z - cable.position.z) * t
        ));
    }

    const cableColors = {
        red: '#ff0000',
        blue: '#0088ff',
        yellow: '#ffff00'
    };

    return (
        <group>
            {/* Proximity Ring */}
            {isNear && (
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[cable.position.x, cable.position.y - 0.5, cable.position.z]}>
                    <ringGeometry args={[0.8, 1.1, 32]} />
                    <meshBasicMaterial
                        color={cableColors[cable.color]}
                        transparent
                        opacity={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* START CONNECTOR - Detailed plug */}
            <group position={[cable.position.x, cable.position.y, cable.position.z]}>
                {/* Connector housing */}
                <mesh castShadow>
                    <cylinderGeometry args={[0.12, 0.18, 0.4, 16]} />
                    <meshStandardMaterial
                        color="#303030"
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>
                {/* Metal collar */}
                <mesh position={[0, 0.15, 0]} castShadow>
                    <cylinderGeometry args={[0.13, 0.11, 0.08, 16]} />
                    <meshStandardMaterial
                        color="#909090"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>
                {/* Colored indicator ring */}
                <mesh position={[0, 0, 0]}>
                    <torusGeometry args={[0.14, 0.03, 16, 32]} />
                    <meshStandardMaterial
                        color={cableColors[cable.color]}
                        emissive={cableColors[cable.color]}
                        emissiveIntensity={0.3}
                        metalness={0.5}
                        roughness={0.4}
                    />
                </mesh>
                {/* Contact pins */}
                {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                    <mesh
                        key={`pin-start-${i}`}
                        position={[
                            Math.cos(angle) * 0.08,
                            -0.15,
                            Math.sin(angle) * 0.08
                        ]}
                    >
                        <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
                        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
                    </mesh>
                ))}
                {/* Strain relief */}
                <mesh position={[0, -0.25, 0]} castShadow>
                    <cylinderGeometry args={[0.1, 0.08, 0.15, 16]} />
                    <meshStandardMaterial
                        color="#202020"
                        metalness={0.3}
                        roughness={0.7}
                    />
                </mesh>
            </group>

            {/* END CONNECTOR - Detailed socket */}
            <group position={[cable.connectionPoint.x, cable.connectionPoint.y, cable.connectionPoint.z]}>
                {/* Socket housing */}
                <mesh castShadow>
                    <cylinderGeometry args={[0.18, 0.12, 0.4, 16]} />
                    <meshStandardMaterial
                        color={cable.connected ? '#00aa55' : '#505050'}
                        metalness={0.6}
                        roughness={0.4}
                        emissive={cable.connected ? '#00ff88' : '#000000'}
                        emissiveIntensity={cable.connected ? 0.3 : 0}
                    />
                </mesh>
                {/* Metal ring */}
                <mesh position={[0, -0.15, 0]} castShadow>
                    <cylinderGeometry args={[0.13, 0.11, 0.08, 16]} />
                    <meshStandardMaterial
                        color="#707070"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>
                {/* Socket opening */}
                <mesh position={[0, 0.18, 0]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
                    <meshStandardMaterial
                        color="#101010"
                        metalness={0.8}
                        roughness={0.3}
                    />
                </mesh>
                {/* Connection status LEDs */}
                {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
                    <mesh
                        key={`led-end-${i}`}
                        position={[
                            Math.cos(angle) * 0.14,
                            0,
                            Math.sin(angle) * 0.14
                        ]}
                    >
                        <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
                        <meshBasicMaterial
                            color={cable.connected ? '#00ff88' : '#ff0000'}
                        />
                    </mesh>
                ))}
                {/* Mounting bracket */}
                <mesh position={[0, 0.25, 0]} castShadow>
                    <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
                    <meshStandardMaterial
                        color="#404040"
                        metalness={0.7}
                        roughness={0.4}
                    />
                </mesh>
            </group>

            {/* CABLE - Braided appearance with multiple strands */}
            {/* Main cable sheath */}
            <line ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.length}
                        array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color={cable.connected ? '#00ff88' : cableColors[cable.color]}
                    linewidth={5}
                />
            </line>

            {/* Inner wire strands for thickness */}
            {[0.02, -0.02, 0.03, -0.03].map((offset, idx) => {
                const strandPoints = points.map((p, i) => {
                    const angle = (i / points.length) * Math.PI * 4;
                    return new THREE.Vector3(
                        p.x + Math.cos(angle) * offset,
                        p.y + Math.sin(angle) * offset * 0.5,
                        p.z + Math.sin(angle) * offset
                    );
                });

                return (
                    <line key={`strand-${idx}`}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={strandPoints.length}
                                array={new Float32Array(strandPoints.flatMap(p => [p.x, p.y, p.z]))}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color={cable.connected ? '#00cc66' : cableColors[cable.color]}
                            linewidth={2}
                            transparent
                            opacity={0.6}
                        />
                    </line>
                );
            })}

            {/* Cable segment cylinders for more solid appearance */}
            {points.filter((_, i) => i % 3 === 0).map((point, i) => (
                <mesh key={`segment-${i}`} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial
                        color={cable.connected ? '#00ff88' : cableColors[cable.color]}
                        metalness={0.4}
                        roughness={0.6}
                    />
                </mesh>
            ))}

            {/* Glow at connection points */}
            <pointLight
                position={[cable.position.x, cable.position.y, cable.position.z]}
                intensity={0.5}
                distance={2}
                color={cableColors[cable.color]}
            />
            {cable.connected && (
                <pointLight
                    position={[cable.connectionPoint.x, cable.connectionPoint.y, cable.connectionPoint.z]}
                    intensity={1}
                    distance={3}
                    color="#00ff88"
                />
            )}
        </group>
    );
};

// ============================================
// SOLAR ARRAY COMPONENT
// ============================================
const SolarArray = ({ solarArray }) => {
    const arrayRef = useRef();

    useFrame((state) => {
        if (arrayRef.current && solarArray.damaged) {
            arrayRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    if (!solarArray.position) return null;

    return (
        <group
            ref={arrayRef}
            position={[solarArray.position.x, solarArray.position.y, solarArray.position.z]}
        >
            {/* Main structure */}
            <mesh castShadow>
                <boxGeometry args={[0.3, 4, 0.3]} />
                <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Solar panels */}
            <mesh position={[-2, 0, 0]} rotation={[0, 0, 0]} castShadow>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial
                    color={solarArray.damaged ? '#003366' : '#0066cc'}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={solarArray.damaged ? '#000000' : '#0066cc'}
                    emissiveIntensity={solarArray.damaged ? 0 : 0.3}
                />
            </mesh>
            <mesh position={[2, 0, 0]} rotation={[0, 0, 0]} castShadow>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial
                    color={solarArray.damaged ? '#003366' : '#0066cc'}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={solarArray.damaged ? '#000000' : '#0066cc'}
                    emissiveIntensity={solarArray.damaged ? 0 : 0.3}
                />
            </mesh>

            {/* Progress indicator */}
            <mesh position={[0, 2.5, 0]}>
                <ringGeometry args={[0.4, 0.5, 32]} />
                <meshBasicMaterial
                    color={solarArray.progress >= 100 ? '#00ff88' : '#ffaa00'}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Damage sparks */}
            {solarArray.damaged && (
                <points>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={30}
                            array={new Float32Array(90).map(() => (Math.random() - 0.5) * 4)}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.1}
                        color="#ff6600"
                        transparent
                        opacity={0.8}
                    />
                </points>
            )}

            {/* Lights */}
            <pointLight
                position={[0, 0, 0]}
                intensity={solarArray.damaged ? 0.3 : 1}
                distance={8}
                color={solarArray.damaged ? '#ff0000' : '#00ff88'}
            />
        </group>
    );
};

// ============================================
// BUBBLE PARTICLES
// ============================================
const UnderwaterBubbles = () => {
    const particlesRef = useRef();

    const particles = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 300; i++) {
            positions.push(
                (Math.random() - 0.5) * 50,
                Math.random() * 20 - 10,
                (Math.random() - 0.5) * 50
            );
        }
        return new Float32Array(positions);
    }, []);

    useFrame(() => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] += 0.03; // Rise up
                if (positions[i] > 10) {
                    positions[i] = -10; // Reset to bottom
                }
                // Add some wobble
                positions[i - 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
                positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.01;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
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
                size={0.15}
                color="#88ccff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// ============================================
// POOL ENVIRONMENT
// ============================================
const PoolEnvironment = () => {
    return (
        <group>
            {/* Pool Floor */}
            <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[60, 60, 30, 30]} />
                <meshStandardMaterial
                    color="#1a3a52"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Pool Walls with blue tint */}
            <mesh position={[0, 2, -30]} receiveShadow>
                <boxGeometry args={[60, 16, 1]} />
                <meshStandardMaterial
                    color="#2a4a62"
                    roughness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <mesh position={[0, 2, 30]} receiveShadow>
                <boxGeometry args={[60, 16, 1]} />
                <meshStandardMaterial
                    color="#2a4a62"
                    roughness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <mesh position={[-30, 2, 0]} receiveShadow>
                <boxGeometry args={[1, 16, 60]} />
                <meshStandardMaterial
                    color="#2a4a62"
                    roughness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <mesh position={[30, 2, 0]} receiveShadow>
                <boxGeometry args={[1, 16, 60]} />
                <meshStandardMaterial
                    color="#2a4a62"
                    roughness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* ISS Training Modules */}
            <group position={[-8, -2, -8]}>
                <mesh castShadow>
                    <boxGeometry args={[4, 3, 4]} />
                    <meshStandardMaterial
                        color="#cccccc"
                        metalness={0.6}
                        roughness={0.4}
                    />
                </mesh>
                <mesh position={[0, 2, 0]}>
                    <cylinderGeometry args={[0.6, 0.6, 0.5, 16]} />
                    <meshStandardMaterial color="#fc3d21" emissive="#fc3d21" emissiveIntensity={0.3} />
                </mesh>
            </group>

            {/* Hatch Module */}
            <group position={[8, 0, -8]}>
                <mesh castShadow>
                    <cylinderGeometry args={[2, 2, 0.8, 32]} />
                    <meshStandardMaterial
                        color="#888888"
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.2, 1.2, 0.9, 32]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
            </group>

            {/* Storage Racks */}
            <group position={[8, -3, 8]}>
                <mesh castShadow>
                    <boxGeometry args={[2, 4, 0.5]} />
                    <meshStandardMaterial color="#666666" metalness={0.5} roughness={0.5} />
                </mesh>
            </group>

            {/* Grid Helper */}
            <gridHelper args={[50, 50, '#0066aa', '#003355']} position={[0, -5.9, 0]} />

            {/* Caustic lighting effect (simulated) */}
            <mesh position={[0, 8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[40, 40]} />
                <meshBasicMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// ============================================
// MAIN SCENE COMPONENT
// ============================================
const NBLSceneEnhanced = ({
    astronautPosition,
    astronautRotation,
    tools,
    repairPanels,
    cables,
    solarArray,
    heldTool
}) => {
    const astronautRef = useRef();

    useFrame(() => {
        if (astronautRef.current) {
            astronautRef.current.position.set(
                astronautPosition.x,
                astronautPosition.y,
                astronautPosition.z
            );
            astronautRef.current.rotation.y = astronautRotation;
        }
    });

    return (
        <>
            {/* LIGHTING */}
            <ambientLight intensity={0.3} color="#4488ff" />
            <directionalLight
                position={[10, 15, 10]}
                intensity={0.7}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight position={[0, 8, 0]} intensity={0.5} color="#88ccff" distance={30} />
            <pointLight position={[10, 5, 10]} intensity={0.3} color="#aaddff" distance={20} />
            <pointLight position={[-10, 5, -10]} intensity={0.3} color="#aaddff" distance={20} />
            <hemisphereLight intensity={0.4} color="#88ccff" groundColor="#003366" />

            {/* STARS (underwater effect) */}
            <Stars
                radius={100}
                depth={50}
                count={1000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* ENVIRONMENT */}
            <PoolEnvironment />
            <UnderwaterBubbles />

            {/* ASTRONAUT */}
            <group ref={astronautRef}>
                <Astronaut buoyancyStatus="neutral" />

                {/* Held tool indicator */}
                {heldTool && (
                    <mesh position={[0.5, 1, 0.5]} rotation={[0, 0, Math.PI / 4]}>
                        <boxGeometry args={[0.1, 0.5, 0.1]} />
                        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
                    </mesh>
                )}
            </group>

            {/* GAME OBJECTS */}
            {tools.map(tool => (
                <FloatingTool key={tool.id} tool={tool} astronautPosition={astronautPosition} />
            ))}

            {repairPanels.map(panel => (
                <RepairPanel key={panel.id} panel={panel} astronautPosition={astronautPosition} hasTool={!!heldTool} />
            ))}

            {cables.map(cable => (
                <Cable key={cable.id} cable={cable} astronautPosition={astronautPosition} />
            ))}

            {solarArray.position && (
                <SolarArray solarArray={solarArray} />
            )}

            {/* FOG (underwater effect) */}
            <fog attach="fog" args={['#1a3a52', 10, 40]} />

            {/* CAMERA CONTROLS */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                maxDistance={35}
                minDistance={5}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 6}
                target={[astronautPosition.x, astronautPosition.y, astronautPosition.z]}
            />
        </>
    );
};

export default NBLSceneEnhanced;
