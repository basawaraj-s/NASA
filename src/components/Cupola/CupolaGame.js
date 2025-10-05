import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Trail } from '@react-three/drei';
import './CupolaGame.css';

// ============================================
// GAME CONSTANTS
// ============================================
const GAME_CONFIG = {
    INITIAL_TIME: 90,
    SATELLITE_POINTS: 100,
    ASTEROID_POINTS: 150,
    DEBRIS_POINTS: 100,
    COMBO_MULTIPLIER: 1.5,
    COMBO_TIME: 3000,
    POWER_UP_CHANCE: 0.15,
    CRITICAL_HIT_CHANCE: 0.2,
    CRITICAL_MULTIPLIER: 2,
    STREAK_BONUS_INTERVAL: 5,
    BOSS_SPAWN_SCORE: 2000
};

// Power-up types
const POWER_UPS = {
    SHIELD: { duration: 8000, color: '#00ffff', icon: '🛡️', name: 'Shield' },
    TIME_BOOST: { amount: 20, color: '#ffaa00', icon: '⏱️', name: 'Time Boost' },
    DOUBLE_POINTS: { duration: 10000, color: '#ffd700', icon: '⭐', name: '2x Points' },
    RAPID_FIRE: { duration: 8000, color: '#ff00ff', icon: '⚡', name: 'Rapid Fire' },
    MAGNET: { duration: 12000, color: '#00ff00', icon: '🧲', name: 'Auto-Aim' }
};

// Achievement definitions
const ACHIEVEMENTS = {
    FIRST_BLOOD: { name: 'First Blood', desc: 'Destroy your first threat', icon: '🎯', points: 50 },
    COMBO_MASTER: { name: 'Combo Master', desc: 'Reach 10x combo', icon: '🔥', points: 200 },
    SHARPSHOOTER: { name: 'Sharpshooter', desc: '95% accuracy or higher', icon: '🎖️', points: 300 },
    SPEED_DEMON: { name: 'Speed Demon', desc: 'Reach level 10', icon: '⚡', points: 500 },
    SURVIVOR: { name: 'Survivor', desc: 'Last 3 minutes', icon: '🏆', points: 250 },
    PERFECTIONIST: { name: 'Perfectionist', desc: 'Zero misses in a level', icon: '💎', points: 400 },
    LEGENDARY: { name: 'Legendary', desc: 'Score over 10,000', icon: '👑', points: 1000 }
};

// ============================================
// PARTICLE EFFECTS
// ============================================
const Particles = ({ position, color, count = 20 }) => {
    const particles = useRef([]);
    const [particleData] = useState(() =>
        Array.from({ length: count }, () => ({
            velocity: [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5],
            life: 1
        }))
    );

    useFrame((state, delta) => {
        particles.current.forEach((particle, i) => {
            if (particle) {
                const data = particleData[i];
                particle.position.x += data.velocity[0];
                particle.position.y += data.velocity[1];
                particle.position.z += data.velocity[2];
                data.life -= delta * 2;
                particle.scale.setScalar(Math.max(0, data.life));
            }
        });
    });

    return (
        <group position={position}>
            {particleData.map((_, i) => (
                <mesh key={i} ref={el => particles.current[i] = el}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
};

// ============================================
// MUZZLE FLASH AND SHOOTING EFFECTS
// ============================================
const MuzzleFlash = ({ position }) => {
    const [visible, setVisible] = useState(true);
    const flashRef = useRef();
    const [scale] = useState(Math.random() * 0.5 + 1);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 100);
        return () => clearTimeout(timer);
    }, []);

    useFrame((state, delta) => {
        if (flashRef.current && visible) {
            flashRef.current.rotation.z += delta * 10;
        }
    });

    if (!visible) return null;

    return (
        <group position={position}>
            {/* Bright flash sphere */}
            <mesh ref={flashRef}>
                <sphereGeometry args={[0.3 * scale, 8, 8]} />
                <meshBasicMaterial color="#ffff00" transparent opacity={0.9} />
            </mesh>

            {/* Flash rays */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0]}
                        rotation={[0, 0, angle]}
                    >
                        <boxGeometry args={[0.4, 0.05, 0.05]} />
                        <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
                    </mesh>
                );
            })}

            {/* Core glow */}
            <mesh>
                <sphereGeometry args={[0.5 * scale, 16, 16]} />
                <meshBasicMaterial color="#ff6600" transparent opacity={0.4} />
            </mesh>

            {/* Point light for illumination */}
            <pointLight color="#ffaa00" intensity={20} distance={5} />
        </group>
    );
};

// Laser Beam effect
const LaserBeam = ({ start, end }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 150);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    const direction = {
        x: end[0] - start.x,
        y: end[1] - start.y,
        z: end[2] - start.z
    };
    const distance = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
    const midpoint = [
        start.x + direction.x / 2,
        start.y + direction.y / 2,
        start.z + direction.z / 2
    ];

    return (
        <group position={midpoint}>
            {/* Main beam */}
            <mesh>
                <cylinderGeometry args={[0.05, 0.05, distance, 8]} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.9} />
            </mesh>

            {/* Glow */}
            <mesh>
                <cylinderGeometry args={[0.15, 0.15, distance, 8]} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

// ============================================
// POWER-UP COMPONENT
// ============================================
const PowerUp = ({ position, type, onCollect, id }) => {
    const meshRef = useRef();
    const glowRef = useRef();
    const powerUpData = POWER_UPS[type];

    useFrame((state) => {
        if (meshRef.current) {
            // Floating and rotating animation
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 3) * 0.02;
            meshRef.current.rotation.y += 0.05;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }

        if (glowRef.current) {
            // Pulsing glow
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
            glowRef.current.scale.setScalar(pulse);
        }
    });

    const handleCollect = () => {
        onCollect(id, type);
        playSound('scan');
    };

    return (
        <group ref={meshRef} position={position} onClick={handleCollect}>
            {/* Outer glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshBasicMaterial color={powerUpData.color} transparent opacity={0.3} />
            </mesh>

            {/* Main power-up sphere */}
            <mesh>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial
                    color={powerUpData.color}
                    emissive={powerUpData.color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Inner core */}
            <mesh>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Rotating ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.6, 0.08, 8, 24]} />
                <meshBasicMaterial color={powerUpData.color} />
            </mesh>
        </group>
    );
};

// ============================================
// GAME OBJECTS
// ============================================

// Satellite Component (Friendly - Scan for points)
const Satellite = ({ position, onScan, onDestroy, id, isHighlighted }) => {
    const meshRef = useRef();
    const glowRef = useRef();
    const [isScanned, setIsScanned] = useState(false);
    const [showParticles, setShowParticles] = useState(false);

    useFrame((state) => {
        if (meshRef.current && !isScanned) {
            // Rotate satellite
            meshRef.current.rotation.y += 0.02;
            meshRef.current.rotation.x += 0.01;

            // Floating motion
            meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
            meshRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.3) * 0.01;

            // Pulse glow when highlighted
            if (glowRef.current && isHighlighted) {
                glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 5) * 0.2);
            }
        }
    });

    const handleScan = () => {
        if (!isScanned) {
            setIsScanned(true);
            setShowParticles(true);
            onScan(id);
            playSound('scan');
            setTimeout(() => onDestroy(id), 500);
        }
    };

    return (
        <group ref={meshRef} position={position} onClick={handleScan}>
            {/* Glow effect */}
            {isHighlighted && (
                <mesh ref={glowRef}>
                    <sphereGeometry args={[1.5, 16, 16]} />
                    <meshBasicMaterial color="#00ff88" transparent opacity={0.2} />
                </mesh>
            )}

            {/* Satellite body */}
            <mesh castShadow>
                <boxGeometry args={[0.6, 0.6, 0.6]} />
                <meshStandardMaterial
                    color={isScanned ? '#00ff88' : isHighlighted ? '#88ffff' : '#4488ff'}
                    emissive={isScanned ? '#00ff88' : isHighlighted ? '#44ffff' : '#2244ff'}
                    emissiveIntensity={isScanned ? 1 : isHighlighted ? 0.8 : 0.5}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Solar panels */}
            <mesh position={[-0.8, 0, 0]} castShadow>
                <boxGeometry args={[0.5, 1.2, 0.05]} />
                <meshStandardMaterial color="#1155ff" metalness={0.9} roughness={0.1} emissive="#0044ff" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.8, 0, 0]} castShadow>
                <boxGeometry args={[0.5, 1.2, 0.05]} />
                <meshStandardMaterial color="#1155ff" metalness={0.9} roughness={0.1} emissive="#0044ff" emissiveIntensity={0.3} />
            </mesh>

            {/* Antenna */}
            <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.5} />
            </mesh>

            {/* Scan effect when scanned */}
            {isScanned && (
                <>
                    <mesh>
                        <sphereGeometry args={[1.2, 16, 16]} />
                        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} wireframe />
                    </mesh>
                    <pointLight color="#00ff88" intensity={5} distance={15} />
                </>
            )}

            {/* Particles on scan */}
            {showParticles && <Particles position={[0, 0, 0]} color="#00ff88" count={30} />}
        </group>
    );
};

// Asteroid Component (Threat - Destroy for points)
const Asteroid = ({ position, speed, onDestroy, id, level, isHighlighted }) => {
    const meshRef = useRef();
    const glowRef = useRef();
    const [isDestroyed, setIsDestroyed] = useState(false);
    const [showExplosion, setShowExplosion] = useState(false);
    const rotationSpeed = useRef({ x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 });

    useFrame((state) => {
        if (meshRef.current && !isDestroyed) {
            // Dynamic rotation
            meshRef.current.rotation.x += rotationSpeed.current.x;
            meshRef.current.rotation.y += rotationSpeed.current.y;

            // Move asteroid toward camera (more threatening)
            meshRef.current.position.z += speed * (1 + level * 0.3);

            // Slight wobble
            meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 2) * 0.01;

            // Remove if too close (danger!)
            if (meshRef.current.position.z > 5) {
                onDestroy(id, false); // Missed - no points
            }

            // Pulse glow when highlighted
            if (glowRef.current && isHighlighted) {
                glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 6) * 0.3);
            }
        }
    });

    const handleShoot = () => {
        if (!isDestroyed) {
            setIsDestroyed(true);
            setShowExplosion(true);
            onDestroy(id, true); // Hit - get points
            playSound('explosion');

            // Remove after explosion
            setTimeout(() => {
                if (meshRef.current) {
                    meshRef.current.visible = false;
                }
            }, 600);
        }
    };

    return (
        <group ref={meshRef} position={position} onClick={handleShoot}>
            {/* Danger glow */}
            {isHighlighted && !isDestroyed && (
                <mesh ref={glowRef}>
                    <sphereGeometry args={[1.2, 16, 16]} />
                    <meshBasicMaterial color="#ff4444" transparent opacity={0.3} />
                </mesh>
            )}

            <mesh castShadow receiveShadow>
                <dodecahedronGeometry args={[0.7, 1]} />
                <meshStandardMaterial
                    color={isDestroyed ? '#ff4444' : isHighlighted ? '#ff8888' : '#888888'}
                    emissive={isDestroyed ? '#ff0000' : isHighlighted ? '#ff4444' : '#222222'}
                    emissiveIntensity={isDestroyed ? 2 : isHighlighted ? 0.6 : 0.2}
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Explosion effect */}
            {isDestroyed && (
                <>
                    <mesh>
                        <sphereGeometry args={[1.5, 16, 16]} />
                        <meshBasicMaterial color="#ff6600" transparent opacity={0.6} />
                    </mesh>
                    <mesh>
                        <sphereGeometry args={[2, 16, 16]} />
                        <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
                    </mesh>
                    <pointLight color="#ff6600" intensity={10} distance={20} decay={2} />
                </>
            )}

            {showExplosion && <Particles position={[0, 0, 0]} color="#ff6600" count={40} />}
        </group>
    );
};

// Space Debris Component (Threat - Destroy for points)
const Debris = ({ position, speed, onDestroy, id, level, isHighlighted }) => {
    const meshRef = useRef();
    const glowRef = useRef();
    const [isDestroyed, setIsDestroyed] = useState(false);
    const [showExplosion, setShowExplosion] = useState(false);

    useFrame((state) => {
        if (meshRef.current && !isDestroyed) {
            meshRef.current.rotation.z += 0.08;
            meshRef.current.rotation.x += 0.02;
            meshRef.current.position.z += speed * (1 + level * 0.2);
            meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 1.5) * 0.025;

            if (meshRef.current.position.z > 5) {
                onDestroy(id, false);
            }

            if (glowRef.current && isHighlighted) {
                glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 5) * 0.25);
            }
        }
    });

    const handleShoot = () => {
        if (!isDestroyed) {
            setIsDestroyed(true);
            setShowExplosion(true);
            onDestroy(id, true);
            playSound('laser');
            setTimeout(() => {
                if (meshRef.current) meshRef.current.visible = false;
            }, 400);
        }
    };

    return (
        <group ref={meshRef} position={position} onClick={handleShoot}>
            {isHighlighted && !isDestroyed && (
                <mesh ref={glowRef}>
                    <sphereGeometry args={[0.8, 16, 16]} />
                    <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} />
                </mesh>
            )}

            <mesh castShadow>
                <torusGeometry args={[0.35, 0.12, 10, 16]} />
                <meshStandardMaterial
                    color={isDestroyed ? '#ff8800' : isHighlighted ? '#ffcc88' : '#666666'}
                    emissive={isDestroyed ? '#ff4400' : isHighlighted ? '#ff8800' : '#111111'}
                    emissiveIntensity={isDestroyed ? 1.5 : isHighlighted ? 0.5 : 0.1}
                    metalness={0.8}
                    roughness={0.4}
                />
            </mesh>

            {isDestroyed && (
                <>
                    <mesh>
                        <sphereGeometry args={[0.7, 12, 12]} />
                        <meshBasicMaterial color="#ffaa00" transparent opacity={0.7} />
                    </mesh>
                    <pointLight color="#ffaa00" intensity={8} distance={15} />
                </>
            )}

            {showExplosion && <Particles position={[0, 0, 0]} color="#ffaa00" count={25} />}
        </group>
    );
};

// Boss Asteroid - Rare, high HP, big rewards
const BossAsteroid = ({ position, onDestroy, id }) => {
    const meshRef = useRef();
    const [health, setHealth] = useState(5);
    const [showHit, setShowHit] = useState(false);
    const maxHealth = 5;

    useFrame((state) => {
        if (meshRef.current && health > 0) {
            meshRef.current.rotation.x += 0.02;
            meshRef.current.rotation.y += 0.03;
            meshRef.current.position.z += 0.01;

            // Menacing wobble
            meshRef.current.position.x += Math.sin(state.clock.elapsedTime) * 0.03;
            meshRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.7) * 0.03;

            if (meshRef.current.position.z > 5) {
                onDestroy(id, false); // Boss escaped!
            }
        }
    });

    const handleHit = () => {
        if (health > 0) {
            setHealth(prev => prev - 1);
            setShowHit(true);
            playSound('explosion');

            setTimeout(() => setShowHit(false), 100);

            if (health - 1 <= 0) {
                onDestroy(id, true); // Boss defeated!
                playSound('levelup');
            }
        }
    };

    const healthPercent = (health / maxHealth) * 100;

    return (
        <group ref={meshRef} position={position} onClick={handleHit}>
            {/* Boss aura */}
            <mesh>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="#ff00ff" transparent opacity={0.1} />
            </mesh>

            {/* Boss body */}
            <mesh castShadow>
                <icosahedronGeometry args={[2, 1]} />
                <meshStandardMaterial
                    color={showHit ? '#ffffff' : '#ff00ff'}
                    emissive={showHit ? '#ffffff' : '#ff00ff'}
                    emissiveIntensity={showHit ? 2 : 0.8}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Rotating rings */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[2.5, 0.15, 16, 32]} />
                <meshBasicMaterial color="#ff00ff" />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.15, 16, 32]} />
                <meshBasicMaterial color="#ff00ff" />
            </mesh>

            {/* Boss light */}
            <pointLight color="#ff00ff" intensity={20} distance={30} />

            {health > 0 && <Particles position={[0, 0, 0]} color="#ff00ff" count={10} />}
        </group>
    );
};

// Earth Component - Enhanced with atmosphere
const Earth = () => {
    const meshRef = useRef();
    const atmosphereRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += 0.001;
        }
    });

    return (
        <group position={[0, -20, -50]}>
            {/* Main Earth */}
            <mesh ref={meshRef} receiveShadow>
                <sphereGeometry args={[15, 64, 64]} />
                <meshStandardMaterial
                    color="#1155ff"
                    emissive="#0033aa"
                    emissiveIntensity={0.4}
                    roughness={0.7}
                    metalness={0.2}
                />
            </mesh>

            {/* Atmosphere glow */}
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[15.5, 64, 64]} />
                <meshBasicMaterial
                    color="#4488ff"
                    transparent
                    opacity={0.15}
                    side={2}
                />
            </mesh>

            {/* Additional atmosphere layer */}
            <mesh>
                <sphereGeometry args={[16, 64, 64]} />
                <meshBasicMaterial
                    color="#88aaff"
                    transparent
                    opacity={0.08}
                    side={2}
                />
            </mesh>
        </group>
    );
};

// ============================================
// CROSSHAIR/RETICLE - Professional targeting system
// ============================================

const Crosshair = ({ position, locked = false }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += locked ? 0.05 : 0.02;
        }
    });

    return (
        <group position={[position.x, position.y, position.z]} ref={ref}>
            {/* Center dot */}
            <mesh>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} />
            </mesh>

            {/* Inner circle */}
            <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[0.15, 0.18, 32]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.8} />
            </mesh>

            {/* Outer circle */}
            <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[0.45, 0.48, 32]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.6} />
            </mesh>

            {/* Cross lines */}
            <mesh position={[0.35, 0, 0]}>
                <boxGeometry args={[0.25, 0.02, 0.02]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.9} />
            </mesh>
            <mesh position={[-0.35, 0, 0]}>
                <boxGeometry args={[0.25, 0.02, 0.02]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
                <boxGeometry args={[0.02, 0.25, 0.02]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, -0.35, 0]}>
                <boxGeometry args={[0.02, 0.25, 0.02]} />
                <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.9} />
            </mesh>

            {/* Corner brackets */}
            {[...Array(4)].map((_, i) => {
                const angle = (i * Math.PI / 2);
                const x = Math.cos(angle) * 0.6;
                const y = Math.sin(angle) * 0.6;
                return (
                    <group key={i} position={[x, y, 0]}>
                        <mesh rotation={[0, 0, angle]}>
                            <boxGeometry args={[0.15, 0.03, 0.02]} />
                            <meshBasicMaterial color={locked ? "#ff0000" : "#00ff00"} transparent opacity={0.8} />
                        </mesh>
                    </group>
                );
            })}

            {/* Lock indicator */}
            {locked && (
                <mesh>
                    <ringGeometry args={[0.25, 0.27, 32]} />
                    <meshBasicMaterial color="#ff0000" transparent opacity={1} />
                </mesh>
            )}
        </group>
    );
};

// ============================================
// MAIN GAME SCENE
// ============================================

const GameScene = ({
    satellites,
    asteroids,
    debris,
    powerUps,
    bossAsteroids,
    muzzleFlashes,
    laserBeams,
    onScanSatellite,
    onDestroyAsteroid,
    onDestroyDebris,
    onDestroySatellite,
    onCollectPowerUp,
    onDestroyBoss,
    level,
    crosshairPos,
    targetLocked
}) => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, 5);
        camera.fov = 75;
    }, [camera]);

    // Calculate closest object for highlighting
    const getClosestObject = () => {
        let minDist = 2;
        let closest = null;
        const crossPos = crosshairPos;

        [...satellites, ...asteroids, ...debris].forEach(obj => {
            const objPos = obj.position;
            const dist = Math.sqrt(
                Math.pow(objPos[0] - crossPos.x, 2) +
                Math.pow(objPos[1] - crossPos.y, 2)
            );
            if (dist < minDist) {
                minDist = dist;
                closest = obj.id;
            }
        });

        return closest;
    };

    const highlightedObject = getClosestObject();

    return (
        <>
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
            <pointLight position={[-10, -10, 10]} intensity={0.6} color="#4488ff" />
            <pointLight position={[0, 0, 0]} intensity={0.3} color="#ffffff" />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.5}
                castShadow
            />

            {/* Background */}
            <Stars radius={150} depth={60} count={8000} factor={5} fade speed={1.5} />
            <Earth />

            {/* Crosshair */}
            <Crosshair position={crosshairPos} locked={targetLocked} />

            {/* Game Objects with highlighting */}
            {satellites.map(sat => (
                <Satellite
                    key={sat.id}
                    id={sat.id}
                    position={sat.position}
                    onScan={onScanSatellite}
                    onDestroy={onDestroySatellite}
                    isHighlighted={highlightedObject === sat.id}
                />
            ))}

            {asteroids.map(ast => (
                <Asteroid
                    key={ast.id}
                    id={ast.id}
                    position={ast.position}
                    speed={ast.speed}
                    level={level}
                    onDestroy={onDestroyAsteroid}
                    isHighlighted={highlightedObject === ast.id}
                />
            ))}

            {debris.map(deb => (
                <Debris
                    key={deb.id}
                    id={deb.id}
                    position={deb.position}
                    speed={deb.speed}
                    level={level}
                    onDestroy={onDestroyDebris}
                    isHighlighted={highlightedObject === deb.id}
                />
            ))}

            {/* Power-Ups */}
            {powerUps.map(powerUp => (
                <PowerUp
                    key={powerUp.id}
                    id={powerUp.id}
                    position={powerUp.position}
                    type={powerUp.type}
                    onCollect={onCollectPowerUp}
                />
            ))}

            {/* Boss Asteroids */}
            {bossAsteroids.map(boss => (
                <BossAsteroid
                    key={boss.id}
                    id={boss.id}
                    position={boss.position}
                    onDestroy={onDestroyBoss}
                />
            ))}

            {/* Muzzle Flashes */}
            {muzzleFlashes.map(flash => (
                <MuzzleFlash
                    key={flash.id}
                    position={flash.position}
                />
            ))}

            {/* Laser Beams */}
            {laserBeams.map(beam => (
                <LaserBeam
                    key={beam.id}
                    start={beam.start}
                    end={beam.end}
                />
            ))}

            {/* Fog for depth */}
            <fog attach="fog" args={['#000010', 40, 100]} />
        </>
    );
};

// ============================================
// ENHANCED SOUND SYSTEM
// ============================================

const playSound = (type) => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (type === 'laser') {
            oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.15);
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } else if (type === 'explosion') {
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 0.4);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        } else if (type === 'scan') {
            oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 0.1);
            oscillator.frequency.linearRampToValueAtTime(700, audioContext.currentTime + 0.25);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.25);
        } else if (type === 'levelup') {
            // Play ascending tone for level up
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.2);
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } else if (type === 'combo') {
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(900, audioContext.currentTime + 0.1);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        }
    } catch (error) {
        console.log('Audio not supported');
    }
};

// ============================================
// MAIN GAME COMPONENT
// ============================================

const CupolaGame = () => {
    // Game state
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.INITIAL_TIME);
    const [gameActive, setGameActive] = useState(false);
    const [satellites, setSatellites] = useState([]);
    const [asteroids, setAsteroids] = useState([]);
    const [debris, setDebris] = useState([]);
    const [crosshairPos, setCrosshairPos] = useState({ x: 0, y: 0, z: 0 });

    // Advanced features
    const [combo, setCombo] = useState(0);
    const [comboTimer, setComboTimer] = useState(null);
    const [highScore, setHighScore] = useState(localStorage.getItem('issGameHighScore') || 0);
    const [targetLocked, setTargetLocked] = useState(false);
    const [missedThreats, setMissedThreats] = useState(0);
    const [totalDestroyed, setTotalDestroyed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [shotsFired, setShotsFired] = useState(0);
    const [shotsHit, setShotsHit] = useState(0);

    // New exciting features!
    const [powerUps, setPowerUps] = useState([]);
    const [activePowerUps, setActivePowerUps] = useState([]);
    const [bossAsteroids, setBossAsteroids] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
    const [recentAchievement, setRecentAchievement] = useState(null);
    const [streak, setStreak] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [criticalHits, setCriticalHits] = useState(0);
    const [showCritical, setShowCritical] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [particles, setParticles] = useState([]);
    const [muzzleFlashes, setMuzzleFlashes] = useState([]);
    const [laserBeams, setLaserBeams] = useState([]);
    const [screenShake, setScreenShake] = useState(0);

    const gameIntervalRef = useRef(null);
    const timerIntervalRef = useRef(null);

    // Generate random position
    const randomPos = () => ({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 10,
        z: -20 + Math.random() * -10
    });

    // Combo system
    const handleCombo = () => {
        if (comboTimer) clearTimeout(comboTimer);

        setCombo(prev => {
            const newCombo = prev + 1;
            if (newCombo > maxCombo) setMaxCombo(newCombo);

            // Achievement: Combo Master
            if (newCombo >= 10) {
                unlockAchievement('COMBO_MASTER');
            }

            return newCombo;
        });

        const newTimer = setTimeout(() => {
            setCombo(0);
        }, GAME_CONFIG.COMBO_TIME);

        setComboTimer(newTimer);
    };

    // Unlock achievement
    const unlockAchievement = (achId) => {
        if (!unlockedAchievements.has(achId)) {
            const achievement = ACHIEVEMENTS[achId];
            setUnlockedAchievements(prev => new Set([...prev, achId]));
            setRecentAchievement(achievement);
            setScore(prev => prev + achievement.points);
            playSound('levelup');

            setTimeout(() => setRecentAchievement(null), 4000);
        }
    };

    // Check for critical hit
    const isCriticalHit = () => {
        if (Math.random() < GAME_CONFIG.CRITICAL_HIT_CHANCE) {
            setCriticalHits(prev => prev + 1);
            setShowCritical(true);
            setScreenShake(0.5); // Strong shake on critical
            setTimeout(() => setShowCritical(false), 500);
            setTimeout(() => setScreenShake(0), 100);
            return true;
        }
        return false;
    };

    // Add shooting visual effects
    const addShootingEffects = (targetPosition) => {
        // Muzzle flash at crosshair
        const flashId = `flash-${Date.now()}-${Math.random()}`;
        setMuzzleFlashes(prev => [...prev, { id: flashId, position: [crosshairPos.x, crosshairPos.y, crosshairPos.z] }]);
        setTimeout(() => {
            setMuzzleFlashes(prev => prev.filter(f => f.id !== flashId));
        }, 150);

        // Laser beam from crosshair to target
        if (targetPosition) {
            const beamId = `beam-${Date.now()}-${Math.random()}`;
            setLaserBeams(prev => [...prev, {
                id: beamId,
                start: crosshairPos,
                end: targetPosition
            }]);
            setTimeout(() => {
                setLaserBeams(prev => prev.filter(b => b.id !== beamId));
            }, 200);
        }

        // Screen shake
        setScreenShake(0.2);
        setTimeout(() => setScreenShake(0), 80);
    };

    // Calculate score with combo and critical multipliers
    const addScore = (basePoints) => {
        let multiplier = combo >= 3 ? GAME_CONFIG.COMBO_MULTIPLIER : 1;

        // Critical hit bonus
        const critical = isCriticalHit();
        if (critical) {
            multiplier *= GAME_CONFIG.CRITICAL_MULTIPLIER;
        }

        // Double points power-up
        const hasDoublePoints = activePowerUps.some(p => p.type === 'DOUBLE_POINTS');
        if (hasDoublePoints) {
            multiplier *= 2;
        }

        const points = Math.floor(basePoints * multiplier);
        setScore(prev => prev + points);

        // Check for legendary achievement
        if (score + points > 10000) {
            unlockAchievement('LEGENDARY');
        }

        return points;
    };

    // Activate power-up
    const activatePowerUp = (type) => {
        const powerUp = POWER_UPS[type];

        if (type === 'TIME_BOOST') {
            setTimeLeft(prev => Math.min(prev + powerUp.amount, GAME_CONFIG.INITIAL_TIME));
            playSound('levelup');
        } else if (type === 'SHIELD') {
            setActivePowerUps(prev => [...prev, { type, endTime: Date.now() + powerUp.duration }]);
        } else {
            setActivePowerUps(prev => [...prev, { type, endTime: Date.now() + powerUp.duration }]);
        }
    };

    // Spawn power-up randomly
    const spawnPowerUp = () => {
        if (Math.random() < GAME_CONFIG.POWER_UP_CHANCE) {
            const types = Object.keys(POWER_UPS);
            const randomType = types[Math.floor(Math.random() * types.length)];

            const newPowerUp = {
                id: `powerup-${Date.now()}-${Math.random()}`,
                type: randomType,
                position: [randomPos().x, randomPos().y, randomPos().z]
            };

            setPowerUps(prev => [...prev, newPowerUp]);
        }
    };

    // Spawn boss asteroid
    const spawnBoss = () => {
        const newBoss = {
            id: `boss-${Date.now()}`,
            position: [0, 0, -35]
        };

        setBossAsteroids(prev => [...prev, newBoss]);
        playSound('levelup');
    };

    // Start game
    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setLevel(1);
        setTimeLeft(GAME_CONFIG.INITIAL_TIME);
        setSatellites([]);
        setAsteroids([]);
        setDebris([]);
        setCombo(0);
        setMissedThreats(0);
        setTotalDestroyed(0);
        setShotsFired(0);
        setShotsHit(0);
        setAccuracy(100);

        // Reset new features
        setPowerUps([]);
        setActivePowerUps([]);
        setBossAsteroids([]);
        setStreak(0);
        setMaxCombo(0);
        setCriticalHits(0);
        setGameTime(0);
        setParticles([]);

        // Spawn initial objects
        spawnObjects();

        // Game loop - spawn new objects
        gameIntervalRef.current = setInterval(() => {
            spawnObjects();
        }, 4000 - (level * 200)); // Faster spawning as level increases

        // Timer countdown
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Spawn game objects with progressive difficulty
    const spawnObjects = () => {
        // Spawn satellites (2-4, more at higher levels)
        const satCount = 2 + Math.floor(Math.random() * 2) + Math.floor(level / 3);
        const newSats = Array.from({ length: Math.min(satCount, 6) }, (_, i) => ({
            id: `sat-${Date.now()}-${i}-${Math.random()}`,
            position: [randomPos().x, randomPos().y, randomPos().z]
        }));
        setSatellites(prev => [...prev, ...newSats]);

        // Spawn asteroids (3-6, increases with level)
        const astCount = 3 + Math.floor(Math.random() * 3) + Math.floor(level / 2);
        const newAsts = Array.from({ length: Math.min(astCount, 10) }, (_, i) => ({
            id: `ast-${Date.now()}-${i}-${Math.random()}`,
            position: [randomPos().x, randomPos().y, randomPos().z],
            speed: 0.02 + Math.random() * 0.03 + (level * 0.005)
        }));
        setAsteroids(prev => [...prev, ...newAsts]);

        // Spawn debris (2-5)
        const debCount = 2 + Math.floor(Math.random() * 3) + Math.floor(level / 4);
        const newDeb = Array.from({ length: Math.min(debCount, 8) }, (_, i) => ({
            id: `deb-${Date.now()}-${i}-${Math.random()}`,
            position: [randomPos().x, randomPos().y, randomPos().z],
            speed: 0.03 + Math.random() * 0.02 + (level * 0.003)
        }));
        setDebris(prev => [...prev, ...newDeb]);

        // Spawn power-ups occasionally
        spawnPowerUp();

        // Spawn boss every BOSS_SPAWN_SCORE points
        if (score > 0 && score % GAME_CONFIG.BOSS_SPAWN_SCORE === 0 && bossAsteroids.length === 0) {
            spawnBoss();
        }
    };

    // End game
    const endGame = () => {
        setGameActive(false);
        clearInterval(gameIntervalRef.current);
        clearInterval(timerIntervalRef.current);

        // Update high score
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('issGameHighScore', score);
        }
    };

    // Handle satellite scan
    const handleScanSatellite = (id) => {
        const points = addScore(GAME_CONFIG.SATELLITE_POINTS);
        handleCombo();
        setShotsHit(prev => prev + 1);
        playSound('scan');

        // Show score popup
        showScorePopup(points);
    };

    // Handle satellite destruction (remove from array)
    const handleDestroySatellite = (id) => {
        setSatellites(prev => prev.filter(s => s.id !== id));
    };

    // Handle asteroid destruction
    const handleDestroyAsteroid = (id, wasHit) => {
        if (wasHit) {
            const points = addScore(GAME_CONFIG.ASTEROID_POINTS);
            handleCombo();
            setTotalDestroyed(prev => prev + 1);
            setShotsHit(prev => prev + 1);
            showScorePopup(points);
        } else {
            setMissedThreats(prev => prev + 1);
            setCombo(0); // Break combo on miss
        }
        setAsteroids(prev => prev.filter(a => a.id !== id));
        setShotsFired(prev => prev + 1);
        updateAccuracy();
    };

    // Handle debris destruction
    const handleDestroyDebris = (id, wasHit) => {
        if (wasHit) {
            const points = addScore(GAME_CONFIG.DEBRIS_POINTS);
            handleCombo();
            setTotalDestroyed(prev => prev + 1);
            setShotsHit(prev => prev + 1);
            showScorePopup(points);

            // First blood achievement
            if (totalDestroyed === 0) {
                unlockAchievement('FIRST_BLOOD');
            }
        } else {
            setMissedThreats(prev => prev + 1);
            setCombo(0);
        }
        setDebris(prev => prev.filter(d => d.id !== id));
        setShotsFired(prev => prev + 1);
        updateAccuracy();
    };

    // Handle power-up collection
    const handleCollectPowerUp = (id, type) => {
        activatePowerUp(type);
        setPowerUps(prev => prev.filter(p => p.id !== id));
    };

    // Handle boss destruction
    const handleDestroyBoss = (id, wasDefeated) => {
        if (wasDefeated) {
            // Boss gives massive points!
            const bossPoints = 1000 + (level * 200);
            addScore(bossPoints);
            setTotalDestroyed(prev => prev + 1);
            playSound('levelup');

            // Guaranteed power-up drop
            const types = Object.keys(POWER_UPS);
            const randomType = types[Math.floor(Math.random() * types.length)];
            const newPowerUp = {
                id: `powerup-boss-${Date.now()}`,
                type: randomType,
                position: [0, 0, -20]
            };
            setPowerUps(prev => [...prev, newPowerUp]);
        } else {
            setMissedThreats(prev => prev + 5); // Boss escape is bad!
        }
        setBossAsteroids(prev => prev.filter(b => b.id !== id));
    };

    // Update accuracy calculation
    const updateAccuracy = () => {
        setShotsFired(prev => {
            const newFired = prev + 1;
            const acc = newFired > 0 ? Math.round((shotsHit / newFired) * 100) : 100;
            setAccuracy(acc);
            return newFired;
        });
    };

    // Show score popup (you can implement this with state)
    const showScorePopup = (points) => {
        // This would trigger a UI animation showing +points
        console.log(`+${points} points!`);
    };

    // Level up with visual feedback
    useEffect(() => {
        if (score > 0 && score % 1000 === 0) {
            setLevel(prev => {
                const newLevel = prev + 1;
                playSound('levelup');
                // Add time bonus on level up
                setTimeLeft(prev => Math.min(prev + 15, GAME_CONFIG.INITIAL_TIME));
                return newLevel;
            });
        }
    }, [score]);

    // Mouse movement for crosshair with smoothing
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setCrosshairPos({ x: x * 3.5, y: y * 2.5, z: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Keyboard controls for crosshair (WASD + Arrow keys)
    useEffect(() => {
        const handleKeyDown = (e) => {
            const speed = 0.3;
            setCrosshairPos(prev => {
                let newPos = { ...prev };
                if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newPos.y += speed;
                if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newPos.y -= speed;
                if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') newPos.x -= speed;
                if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') newPos.x += speed;

                // Clamp position
                newPos.x = Math.max(-4, Math.min(4, newPos.x));
                newPos.y = Math.max(-3, Math.min(3, newPos.y));

                return newPos;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearInterval(gameIntervalRef.current);
            clearInterval(timerIntervalRef.current);
            if (comboTimer) clearTimeout(comboTimer);
        };
    }, [comboTimer]);

    // Check for achievements based on game stats
    useEffect(() => {
        if (gameActive) {
            // Speed Demon - Level 10
            if (level >= 10) unlockAchievement('SPEED_DEMON');

            // Sharpshooter - 95% accuracy
            if (accuracy >= 95 && shotsFired > 10) unlockAchievement('SHARPSHOOTER');

            // Survivor - 3 minutes (180 seconds played)
            if (gameTime >= 180) unlockAchievement('SURVIVOR');
        }
    }, [level, accuracy, gameTime, gameActive]);

    // Track game time and check achievements
    useEffect(() => {
        let timeTracker;
        if (gameActive) {
            timeTracker = setInterval(() => {
                setGameTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timeTracker);
    }, [gameActive]);

    // Clean up expired power-ups
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setActivePowerUps(prev => prev.filter(p => p.endTime > now));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="cupola-game-container">
            {/* Game UI Overlay */}
            <div className="game-ui-overlay">
                {/* Top Stats Bar */}
                <div className="game-stats">
                    <div className="stat-box score-box">
                        <span className="stat-label">SCORE</span>
                        <span className="stat-value">{score.toLocaleString()}</span>
                        {score > highScore && <span className="new-record">NEW RECORD!</span>}
                    </div>
                    <div className="stat-box level-box">
                        <span className="stat-label">LEVEL</span>
                        <span className="stat-value">{level}</span>
                    </div>
                    <div className={`stat-box timer-box ${timeLeft <= 10 ? 'warning' : ''}`}>
                        <span className="stat-label">TIME</span>
                        <span className="stat-value">{timeLeft}s</span>
                    </div>
                </div>

                {/* Combo Indicator */}
                {gameActive && combo >= 3 && (
                    <div className="combo-indicator">
                        <span className="combo-text">COMBO x{combo}</span>
                        <span className="multiplier">+{Math.floor(GAME_CONFIG.COMBO_MULTIPLIER * 100)}% POINTS!</span>
                    </div>
                )}

                {/* Critical Hit Flash */}
                {showCritical && (
                    <div className="critical-hit-indicator">
                        <span className="critical-text">⚡ CRITICAL HIT! ⚡</span>
                        <span className="critical-multiplier">2X DAMAGE!</span>
                    </div>
                )}

                {/* Active Power-Ups Display */}
                {gameActive && activePowerUps.length > 0 && (
                    <div className="active-powerups">
                        <div className="powerups-title">🎁 ACTIVE POWER-UPS</div>
                        {activePowerUps.map((powerUp, idx) => {
                            const powerUpData = POWER_UPS[powerUp.type];
                            const timeLeft = Math.ceil((powerUp.endTime - Date.now()) / 1000);
                            return (
                                <div key={idx} className="powerup-badge" style={{ borderColor: powerUpData.color }}>
                                    <span className="powerup-icon">{powerUpData.icon}</span>
                                    <span className="powerup-name">{powerUpData.name}</span>
                                    <span className="powerup-timer">{timeLeft}s</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Achievement Unlock Notification */}
                {recentAchievement && (
                    <div className="achievement-unlock">
                        <div className="achievement-banner">
                            <span className="achievement-icon">{recentAchievement.icon}</span>
                            <div className="achievement-info">
                                <div className="achievement-title">🏆 ACHIEVEMENT UNLOCKED!</div>
                                <div className="achievement-name">{recentAchievement.name}</div>
                                <div className="achievement-desc">{recentAchievement.desc}</div>
                                <div className="achievement-points">+{recentAchievement.points} BONUS POINTS!</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Side Stats */}
                {gameActive && (
                    <div className="side-stats">
                        <div className="side-stat-item">
                            <span className="side-stat-label">ACCURACY</span>
                            <span className={`side-stat-value ${accuracy >= 80 ? 'good' : accuracy >= 60 ? 'ok' : 'bad'}`}>
                                {accuracy}%
                            </span>
                        </div>
                        <div className="side-stat-item">
                            <span className="side-stat-label">DESTROYED</span>
                            <span className="side-stat-value">{totalDestroyed}</span>
                        </div>
                        <div className="side-stat-item">
                            <span className="side-stat-label">MAX COMBO</span>
                            <span className="side-stat-value">{maxCombo}x</span>
                        </div>
                        <div className="side-stat-item">
                            <span className="side-stat-label">CRITICAL HITS</span>
                            <span className="side-stat-value gold">{criticalHits}</span>
                        </div>
                        <div className="side-stat-item">
                            <span className="side-stat-label">HIGH SCORE</span>
                            <span className="side-stat-value gold">{highScore.toLocaleString()}</span>
                        </div>
                    </div>
                )}

                {/* Start/End Overlay */}
                {!gameActive && (
                    <div className="game-start-overlay">
                        <div className="game-start-panel">
                            <h1 className="game-title">🛰️ ISS DEFENSE SYSTEM</h1>
                            <p className="game-subtitle">Protect the International Space Station</p>

                            <div className="game-instructions">
                                <h3>MISSION BRIEFING</h3>
                                <p>As an ISS Defense Officer, your mission is to:</p>
                                <ul>
                                    <li>🛰️ <strong>Scan Allied Satellites</strong> for data collection (+{GAME_CONFIG.SATELLITE_POINTS} pts)</li>
                                    <li>💥 <strong>Destroy Asteroids</strong> threatening the station (+{GAME_CONFIG.ASTEROID_POINTS} pts)</li>
                                    <li>🔧 <strong>Clear Space Debris</strong> from orbit (+{GAME_CONFIG.DEBRIS_POINTS} pts)</li>
                                </ul>

                                <div className="controls-section">
                                    <h4>CONTROLS</h4>
                                    <p>🖱️ <strong>Mouse:</strong> Aim targeting system</p>
                                    <p>⌨️ <strong>WASD/Arrows:</strong> Move crosshair</p>
                                    <p>🖱️ <strong>Click:</strong> Scan/Destroy target</p>
                                </div>

                                <div className="tips-section">
                                    <h4>PRO TIPS</h4>
                                    <p>⚡ Build COMBOS for {Math.floor(GAME_CONFIG.COMBO_MULTIPLIER * 100)}% bonus points!</p>
                                    <p>🎁 Collect POWER-UPS for special abilities!</p>
                                    <p>💥 CRITICAL HITS deal 2x damage randomly!</p>
                                    <p>👑 Defeat BOSS ASTEROIDS for massive rewards!</p>
                                    <p>🏆 Unlock ACHIEVEMENTS for bonus points!</p>
                                    <p>📊 Maintain accuracy for better performance!</p>
                                    <p>⏱️ Earn +15s time bonus every level up!</p>
                                    <p>🎯 Objects glow when targeted - aim carefully!</p>
                                </div>
                            </div>

                            {timeLeft === 0 && score > 0 && (
                                <div className="game-over-stats">
                                    <h2>✅ MISSION COMPLETE!</h2>
                                    <div className="final-stats-grid">
                                        <div className="final-stat">
                                            <span className="final-stat-label">Final Score</span>
                                            <span className="final-stat-value">{score.toLocaleString()}</span>
                                        </div>
                                        <div className="final-stat">
                                            <span className="final-stat-label">Level Reached</span>
                                            <span className="final-stat-value">{level}</span>
                                        </div>
                                        <div className="final-stat">
                                            <span className="final-stat-label">Accuracy</span>
                                            <span className="final-stat-value">{accuracy}%</span>
                                        </div>
                                        <div className="final-stat">
                                            <span className="final-stat-label">Threats Destroyed</span>
                                            <span className="final-stat-value">{totalDestroyed}</span>
                                        </div>
                                        <div className="final-stat">
                                            <span className="final-stat-label">Max Combo</span>
                                            <span className="final-stat-value">x{combo}</span>
                                        </div>
                                        <div className="final-stat">
                                            <span className="final-stat-label">Threats Missed</span>
                                            <span className="final-stat-value danger">{missedThreats}</span>
                                        </div>
                                    </div>
                                    {score > highScore && (
                                        <div className="new-high-score">
                                            🏆 NEW HIGH SCORE! 🏆
                                        </div>
                                    )}
                                </div>
                            )}

                            <button className="start-game-btn" onClick={startGame}>
                                {timeLeft === 0 ? '🔄 PLAY AGAIN' : '🚀 START MISSION'}
                            </button>

                            {highScore > 0 && timeLeft !== 0 && (
                                <div className="high-score-display">
                                    High Score: {highScore.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Active Game Hints */}
                {gameActive && (
                    <div className="game-hints">
                        <div className="hint-item">
                            <span className="hint-icon">🛰️</span>
                            <span className="hint-text">Blue Glow = Scan</span>
                        </div>
                        <div className="hint-item">
                            <span className="hint-icon">💥</span>
                            <span className="hint-text">Red Glow = Destroy</span>
                        </div>
                        <div className="hint-item">
                            <span className="hint-icon">🔧</span>
                            <span className="hint-text">Orange Glow = Clear</span>
                        </div>
                        <div className="hint-item">
                            <span className="hint-icon">🎁</span>
                            <span className="hint-text">Collect Power-Ups!</span>
                        </div>
                        <div className="hint-item">
                            <span className="hint-icon">👑</span>
                            <span className="hint-text">Boss = 5 Hits!</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Three.js Canvas */}
            <Canvas className="game-canvas" style={{ transform: `translate(${screenShake * (Math.random() - 0.5) * 20}px, ${screenShake * (Math.random() - 0.5) * 20}px)` }}>
                <GameScene
                    satellites={satellites}
                    asteroids={asteroids}
                    debris={debris}
                    powerUps={powerUps}
                    bossAsteroids={bossAsteroids}
                    muzzleFlashes={muzzleFlashes}
                    laserBeams={laserBeams}
                    onScanSatellite={handleScanSatellite}
                    onDestroyAsteroid={handleDestroyAsteroid}
                    onDestroyDebris={handleDestroyDebris}
                    onDestroySatellite={handleDestroySatellite}
                    onCollectPowerUp={handleCollectPowerUp}
                    onDestroyBoss={handleDestroyBoss}
                    level={level}
                    crosshairPos={crosshairPos}
                    targetLocked={targetLocked}
                />
            </Canvas>
        </div>
    );
};

export default CupolaGame;
