/* ============================================
   ENHANCED NBL TRAINING GAME
   Fun, Engaging Astronaut Training Simulation
   ============================================ */

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import NBLSceneEnhanced from './NBLSceneEnhanced';

const NBLExperienceEnhanced = () => {
    // ============================================
    // GAME STATE
    // ============================================
    const [gameStarted, setGameStarted] = useState(false);
    const [gameMode, setGameMode] = useState('menu'); // menu, mission, freeplay
    const [currentMission, setCurrentMission] = useState(null);
    const [missionObjective, setMissionObjective] = useState(null);

    // Astronaut State
    const [astronautPosition, setAstronautPosition] = useState({ x: 0, y: 0, z: 0 });
    const [astronautRotation, setAstronautRotation] = useState(0);
    const [astronautVelocity, setAstronautVelocity] = useState({ x: 0, y: 0, z: 0 });

    // Game Progress
    const [score, setScore] = useState(0);
    const [oxygen, setOxygen] = useState(100);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [missionTime, setMissionTime] = useState(0);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [level, setLevel] = useState(1);

    // Tools & Objects State
    const [tools, setTools] = useState([]);
    const [heldTool, setHeldTool] = useState(null);
    const [repairPanels, setRepairPanels] = useState([]);
    const [cables, setCables] = useState([]);
    const [solarArray, setSolarArray] = useState({ damaged: true, progress: 0 });

    // Game Mechanics
    const [penalties, setPenalties] = useState(0);
    const [combo, setCombo] = useState(0);
    const [speedBonus, setSpeedBonus] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    // UI State
    const [showTutorial, setShowTutorial] = useState(true);
    const [showMissionComplete, setShowMissionComplete] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showObjectiveTracker, setShowObjectiveTracker] = useState(true);
    const [notification, setNotification] = useState('');
    const [hint, setHint] = useState('');
    const [currentObjective, setCurrentObjective] = useState(0);

    // Audio Context
    const audioContextRef = useRef(null);

    // ============================================
    // MISSIONS DATA
    // ============================================
    const missions = [
        {
            id: 1,
            title: "Fix the Solar Panel",
            description: "Navigate to the damaged solar array and repair it before oxygen runs out!",
            objectives: [
                "Collect the repair tool",
                "Navigate to solar array",
                "Complete repair sequence"
            ],
            timeLimit: 120,
            difficulty: "Easy",
            reward: 500,
            requiredAccuracy: 70
        },
        {
            id: 2,
            title: "Tool Recovery Mission",
            description: "Multiple tools are floating away! Collect them all before they drift too far.",
            objectives: [
                "Collect all 5 floating tools",
                "Return tools to storage",
                "Maintain neutral buoyancy"
            ],
            timeLimit: 90,
            difficulty: "Medium",
            reward: 750,
            requiredAccuracy: 80
        },
        {
            id: 3,
            title: "Cable Connection Crisis",
            description: "Critical cables have disconnected! Reconnect them in the correct sequence.",
            objectives: [
                "Find disconnected cables",
                "Connect cables in order (Red→Blue→Yellow)",
                "Test all connections"
            ],
            timeLimit: 150,
            difficulty: "Medium",
            reward: 1000,
            requiredAccuracy: 85
        },
        {
            id: 4,
            title: "Emergency Repair",
            description: "Multiple systems failing! Repair all panels before catastrophic failure.",
            objectives: [
                "Repair 4 critical panels",
                "Work quickly - oxygen depleting faster",
                "Avoid collisions (penalties)"
            ],
            timeLimit: 180,
            difficulty: "Hard",
            reward: 1500,
            requiredAccuracy: 90
        },
        {
            id: 5,
            title: "Master EVA Challenge",
            description: "The ultimate test! Complete all tasks perfectly in record time.",
            objectives: [
                "Fix solar array",
                "Collect 3 tools",
                "Connect 2 cables",
                "Repair 2 panels"
            ],
            timeLimit: 240,
            difficulty: "Expert",
            reward: 3000,
            requiredAccuracy: 95
        }
    ];

    // ============================================
    // AUDIO SYSTEM
    // ============================================
    const initAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    const playSound = (type) => {
        initAudio();
        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'pickup':
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
                gainNode.gain.setValueAtTime(0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                oscillator.start(now);
                oscillator.stop(now + 0.15);
                break;

            case 'repair':
                oscillator.frequency.setValueAtTime(600, now);
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;

            case 'success':
                oscillator.frequency.setValueAtTime(523.25, now); // C5
                oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
                oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
                gainNode.gain.setValueAtTime(0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                oscillator.start(now);
                oscillator.stop(now + 0.4);
                break;

            case 'error':
                oscillator.frequency.setValueAtTime(200, now);
                oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;

            case 'alarm':
                oscillator.frequency.setValueAtTime(440, now);
                oscillator.frequency.setValueAtTime(880, now + 0.1);
                oscillator.frequency.setValueAtTime(440, now + 0.2);
                oscillator.type = 'triangle';
                gainNode.gain.setValueAtTime(0.4, now);
                gainNode.gain.setValueAtTime(0.01, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;

            case 'bubbles':
                oscillator.frequency.setValueAtTime(100 + Math.random() * 200, now);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                oscillator.start(now);
                oscillator.stop(now + 0.5);
                break;

            default:
                oscillator.stop();
        }
    };

    // ============================================
    // GAME INITIALIZATION
    // ============================================
    const startGame = (mode) => {
        initAudio();
        setGameMode(mode);
        setGameStarted(true);
        setShowTutorial(mode === 'mission');
        resetGameState();

        if (mode === 'mission') {
            startMission(missions[0]);
        } else {
            initializeFreePlay();
        }

        playSound('success');
    };

    const resetGameState = () => {
        setScore(0);
        setOxygen(100);
        setTimeElapsed(0);
        setMissionTime(0);
        setPenalties(0);
        setCombo(0);
        setAccuracy(100);
        setAstronautPosition({ x: 0, y: 0, z: 0 });
        setAstronautVelocity({ x: 0, y: 0, z: 0 });
        setAstronautRotation(0);
        setHeldTool(null);
    };

    const startMission = (mission) => {
        setCurrentMission(mission);
        setMissionObjective(mission.objectives[0]);
        setMissionTime(mission.timeLimit);
        spawnMissionObjects(mission);
        setNotification(`Mission Started: ${mission.title}`);
        setTimeout(() => setNotification(''), 3000);
    };

    const initializeFreePlay = () => {
        // Spawn random tools and objects for free exploration
        spawnRandomTools(5);
        spawnRepairPanels(3);
        spawnCables(2);
        setHint('Free Play Mode: Explore and practice your EVA skills!');
    };

    // ============================================
    // SPAWN SYSTEMS
    // ============================================
    const spawnMissionObjects = (mission) => {
        switch (mission.id) {
            case 1:
                spawnRandomTools(1);
                setSolarArray({ damaged: true, progress: 0, position: { x: 10, y: 2, z: -10 } });
                break;
            case 2:
                spawnRandomTools(5);
                break;
            case 3:
                spawnCables(3);
                break;
            case 4:
                spawnRepairPanels(4);
                break;
            case 5:
                spawnRandomTools(3);
                spawnRepairPanels(2);
                spawnCables(2);
                setSolarArray({ damaged: true, progress: 0, position: { x: 10, y: 2, z: -10 } });
                break;
            default:
                break;
        }
    };

    const spawnRandomTools = (count) => {
        const newTools = [];
        for (let i = 0; i < count; i++) {
            newTools.push({
                id: `tool-${Date.now()}-${i}`,
                type: ['wrench', 'screwdriver', 'pliers', 'hammer'][Math.floor(Math.random() * 4)],
                position: {
                    x: (Math.random() - 0.5) * 20,
                    y: Math.random() * 5,
                    z: (Math.random() - 0.5) * 20
                },
                rotation: Math.random() * Math.PI * 2,
                collected: false
            });
        }
        setTools(newTools);
    };

    const spawnRepairPanels = (count) => {
        const newPanels = [];
        for (let i = 0; i < count; i++) {
            newPanels.push({
                id: `panel-${i}`,
                position: {
                    x: (Math.random() - 0.5) * 15,
                    y: 1 + Math.random() * 3,
                    z: (Math.random() - 0.5) * 15
                },
                health: 0,
                maxHealth: 100,
                repaired: false
            });
        }
        setRepairPanels(newPanels);
    };

    const spawnCables = (count) => {
        const colors = ['red', 'blue', 'yellow'];
        const newCables = [];
        for (let i = 0; i < count; i++) {
            newCables.push({
                id: `cable-${i}`,
                color: colors[i % 3],
                position: {
                    x: -8 + i * 5,
                    y: 2,
                    z: -8
                },
                connected: false,
                connectionPoint: {
                    x: -8 + i * 5,
                    y: 2,
                    z: 8
                }
            });
        }
        setCables(newCables);
    };

    // ============================================
    // MOVEMENT CONTROLS
    // ============================================
    const handleKeyPress = (e) => {
        if (!gameStarted || gameMode === 'menu') return;

        const speed = 0.3;
        const rotSpeed = 0.1;

        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                setAstronautVelocity(prev => ({ ...prev, z: -speed }));
                break;
            case 's':
            case 'arrowdown':
                setAstronautVelocity(prev => ({ ...prev, z: speed }));
                break;
            case 'a':
            case 'arrowleft':
                setAstronautRotation(prev => prev + rotSpeed);
                setAstronautVelocity(prev => ({ ...prev, x: -speed }));
                break;
            case 'd':
            case 'arrowright':
                setAstronautRotation(prev => prev - rotSpeed);
                setAstronautVelocity(prev => ({ ...prev, x: speed }));
                break;
            case ' ':
                setAstronautVelocity(prev => ({ ...prev, y: speed }));
                break;
            case 'shift':
                setAstronautVelocity(prev => ({ ...prev, y: -speed }));
                break;
            case 'e':
                handleInteraction();
                break;
            case 'h':
                setShowHelp(prev => !prev);
                break;
            case 'tab':
                e.preventDefault();
                setShowObjectiveTracker(prev => !prev);
                break;
            default:
                break;
        }

        playSound('bubbles');
    };

    const handleKeyRelease = () => {
        // Simulate drag in water
        setAstronautVelocity(prev => ({
            x: prev.x * 0.9,
            y: prev.y * 0.9,
            z: prev.z * 0.9
        }));
    };

    // ============================================
    // INTERACTION SYSTEM
    // ============================================
    const handleInteraction = () => {
        let interacted = false;

        // Check for nearby tools
        tools.forEach(tool => {
            const distance = Math.sqrt(
                Math.pow(tool.position.x - astronautPosition.x, 2) +
                Math.pow(tool.position.y - astronautPosition.y, 2) +
                Math.pow(tool.position.z - astronautPosition.z, 2)
            );

            if (distance < 3 && !tool.collected && !interacted) {
                collectTool(tool);
                interacted = true;
            }
        });

        // Check for repair panels
        if (!interacted) {
            repairPanels.forEach(panel => {
                const distance = Math.sqrt(
                    Math.pow(panel.position.x - astronautPosition.x, 2) +
                    Math.pow(panel.position.y - astronautPosition.y, 2) +
                    Math.pow(panel.position.z - astronautPosition.z, 2)
                );

                if (distance < 3 && !panel.repaired && heldTool && !interacted) {
                    repairPanel(panel);
                    interacted = true;
                }
            });
        }

        // Check for cables
        if (!interacted) {
            cables.forEach(cable => {
                const distance = Math.sqrt(
                    Math.pow(cable.position.x - astronautPosition.x, 2) +
                    Math.pow(cable.position.y - astronautPosition.y, 2) +
                    Math.pow(cable.position.z - astronautPosition.z, 2)
                );

                if (distance < 3 && !cable.connected && !interacted) {
                    connectCable(cable);
                    interacted = true;
                }
            });
        }

        // Check solar array
        if (!interacted && solarArray.damaged && heldTool && solarArray.position) {
            const distance = Math.sqrt(
                Math.pow(solarArray.position.x - astronautPosition.x, 2) +
                Math.pow(solarArray.position.y - astronautPosition.y, 2) +
                Math.pow(solarArray.position.z - astronautPosition.z, 2)
            );

            if (distance < 4) {
                repairSolarArray();
                interacted = true;
            }
        }

        if (!interacted) {
            setNotification('No objects nearby. Look for glowing items!');
            setTimeout(() => setNotification(''), 2000);
        }
    };

    // ============================================
    // INTERACTION HELPERS
    // ============================================
    const canInteract = () => {
        if (!gameStarted || gameMode === 'menu') return false;

        // Check if near any interactable object
        const nearbyTool = tools.some(tool => {
            const distance = Math.sqrt(
                Math.pow(tool.position.x - astronautPosition.x, 2) +
                Math.pow(tool.position.y - astronautPosition.y, 2) +
                Math.pow(tool.position.z - astronautPosition.z, 2)
            );
            return distance < 3 && !tool.collected;
        });

        const nearbyPanel = repairPanels.some(panel => {
            const distance = Math.sqrt(
                Math.pow(panel.position.x - astronautPosition.x, 2) +
                Math.pow(panel.position.y - astronautPosition.y, 2) +
                Math.pow(panel.position.z - astronautPosition.z, 2)
            );
            return distance < 3 && !panel.repaired && heldTool;
        });

        const nearbyCable = cables.some(cable => {
            const distance = Math.sqrt(
                Math.pow(cable.position.x - astronautPosition.x, 2) +
                Math.pow(cable.position.y - astronautPosition.y, 2) +
                Math.pow(cable.position.z - astronautPosition.z, 2)
            );
            return distance < 3 && !cable.connected;
        });

        const nearbySolar = solarArray.damaged && heldTool && solarArray.position && (() => {
            const distance = Math.sqrt(
                Math.pow(solarArray.position.x - astronautPosition.x, 2) +
                Math.pow(solarArray.position.y - astronautPosition.y, 2) +
                Math.pow(solarArray.position.z - astronautPosition.z, 2)
            );
            return distance < 4;
        })();

        return nearbyTool || nearbyPanel || nearbyCable || nearbySolar;
    };

    const getInteractionHint = () => {
        if (!gameStarted || gameMode === 'menu') return 'Start game to interact';

        // Check what's nearby
        const nearbyTool = tools.find(tool => {
            const distance = Math.sqrt(
                Math.pow(tool.position.x - astronautPosition.x, 2) +
                Math.pow(tool.position.y - astronautPosition.y, 2) +
                Math.pow(tool.position.z - astronautPosition.z, 2)
            );
            return distance < 3 && !tool.collected;
        });

        if (nearbyTool) {
            return `🔧 Collect ${nearbyTool.type.toUpperCase()}`;
        }

        const nearbyPanel = repairPanels.find(panel => {
            const distance = Math.sqrt(
                Math.pow(panel.position.x - astronautPosition.x, 2) +
                Math.pow(panel.position.y - astronautPosition.y, 2) +
                Math.pow(panel.position.z - astronautPosition.z, 2)
            );
            return distance < 3 && !panel.repaired;
        });

        if (nearbyPanel) {
            if (heldTool) {
                return `🔨 Repair Panel (${nearbyPanel.health}/${nearbyPanel.maxHealth} HP)`;
            } else {
                return '❌ Need tool to repair!';
            }
        }

        const nearbyCable = cables.find(cable => {
            const distance = Math.sqrt(
                Math.pow(cable.position.x - astronautPosition.x, 2) +
                Math.pow(cable.position.y - astronautPosition.y, 2) +
                Math.pow(cable.position.z - astronautPosition.z, 2)
            );
            return distance < 3 && !cable.connected;
        });

        if (nearbyCable) {
            return `🔌 Connect ${nearbyCable.color.toUpperCase()} Cable`;
        }

        if (solarArray.damaged && solarArray.position && heldTool) {
            const distance = Math.sqrt(
                Math.pow(solarArray.position.x - astronautPosition.x, 2) +
                Math.pow(solarArray.position.y - astronautPosition.y, 2) +
                Math.pow(solarArray.position.z - astronautPosition.z, 2)
            );
            if (distance < 4) {
                return `☀️ Repair Solar Array (${Math.floor(solarArray.progress)}%)`;
            }
        }

        return '🔍 Move closer to objects...';
    };

    const collectTool = (tool) => {
        setTools(prev => prev.map(t =>
            t.id === tool.id ? { ...t, collected: true } : t
        ));
        setHeldTool(tool);
        setScore(prev => prev + 50);
        setCombo(prev => prev + 1);
        playSound('pickup');
        setNotification(`Collected ${tool.type}! +50 points`);
        setTimeout(() => setNotification(''), 2000);

        checkAchievements('toolCollector', combo + 1);
    };

    const repairPanel = (panel) => {
        setRepairPanels(prev => prev.map(p => {
            if (p.id === panel.id) {
                const newHealth = Math.min(p.health + 20, p.maxHealth);
                const repaired = newHealth >= p.maxHealth;

                if (repaired && !p.repaired) {
                    setScore(prevScore => prevScore + 200);
                    setCombo(prev => prev + 1);
                    playSound('success');
                    setNotification('Panel Repaired! +200 points');
                    setTimeout(() => setNotification(''), 2000);
                    checkAchievements('fastFixer', timeElapsed);
                }

                return { ...p, health: newHealth, repaired };
            }
            return p;
        }));

        playSound('repair');
    };

    const connectCable = (cable) => {
        setCables(prev => prev.map(c =>
            c.id === cable.id ? { ...c, connected: true } : c
        ));
        setScore(prev => prev + 150);
        setCombo(prev => prev + 1);
        playSound('success');
        setNotification(`Cable Connected! +150 points`);
        setTimeout(() => setNotification(''), 2000);
    };

    const repairSolarArray = () => {
        setSolarArray(prev => {
            const newProgress = Math.min(prev.progress + 20, 100);
            const completed = newProgress >= 100;

            if (completed && prev.damaged) {
                setScore(prevScore => prevScore + 500);
                playSound('success');
                setNotification('Solar Array Fixed! +500 points');
                setTimeout(() => setNotification(''), 2000);
                checkMissionCompletion();
            } else {
                setNotification(`Repairing Solar Array... ${newProgress}%`);
                setTimeout(() => setNotification(''), 1500);
            }

            return { ...prev, progress: newProgress, damaged: !completed };
        });

        playSound('repair');
    };

    // ============================================
    // COLLISION DETECTION
    // ============================================
    const checkCollisions = () => {
        // Check if astronaut hits walls or objects
        const bounds = 20;
        if (Math.abs(astronautPosition.x) > bounds ||
            Math.abs(astronautPosition.z) > bounds ||
            astronautPosition.y < -5 || astronautPosition.y > 8) {

            handleCollision();
        }
    };

    const handleCollision = () => {
        setPenalties(prev => prev + 1);
        setAccuracy(prev => Math.max(0, prev - 5));
        setScore(prev => Math.max(0, prev - 50));
        setCombo(0);
        playSound('error');
        setNotification('Collision! -50 points');
        setTimeout(() => setNotification(''), 2000);

        // Bounce back
        setAstronautVelocity({ x: 0, y: 0, z: 0 });
    };

    // ============================================
    // MISSION COMPLETION
    // ============================================
    const checkMissionCompletion = () => {
        if (!currentMission || showMissionComplete) return;

        let objectivesCompleted = 0;

        // Check based on mission type
        if (currentMission.id === 1 && !solarArray.damaged) objectivesCompleted = 3;
        if (currentMission.id === 2 && tools.filter(t => t.collected).length === tools.length) objectivesCompleted = 3;
        if (currentMission.id === 3 && cables.filter(c => c.connected).length === cables.length) objectivesCompleted = 3;
        if (currentMission.id === 4 && repairPanels.filter(p => p.repaired).length === repairPanels.length) objectivesCompleted = 4;

        if (objectivesCompleted >= currentMission.objectives.length) {
            completeMission();
        }
    };

    const completeMission = () => {
        const timeBonus = Math.max(0, missionTime * 10);
        const accuracyBonus = Math.floor(accuracy * 5);
        const comboBonus = combo * 50;
        const totalReward = currentMission.reward + timeBonus + accuracyBonus + comboBonus;

        setScore(prev => prev + totalReward);
        setCompletedMissions(prev => [...prev, currentMission.id]);
        setShowMissionComplete(true);
        playSound('success');

        checkAchievements('missionMaster', completedMissions.length + 1);

        if (accuracy >= currentMission.requiredAccuracy) {
            checkAchievements('accuracyExpert', accuracy);
        }
    };

    // ============================================
    // ACHIEVEMENTS SYSTEM
    // ============================================
    const checkAchievements = (type, value) => {
        const newAchievements = [];

        switch (type) {
            case 'toolCollector':
                if (value >= 5 && !achievements.includes('Tool Master')) {
                    newAchievements.push('Tool Master');
                }
                break;
            case 'fastFixer':
                if (value < 30 && !achievements.includes('Fast Fixer')) {
                    newAchievements.push('Fast Fixer');
                }
                break;
            case 'missionMaster':
                if (value >= 3 && !achievements.includes('Mission Master')) {
                    newAchievements.push('Mission Master');
                }
                if (value >= 5 && !achievements.includes('Zero-Gravity Ninja')) {
                    newAchievements.push('Zero-Gravity Ninja');
                }
                break;
            case 'accuracyExpert':
                if (value >= 95 && !achievements.includes('Precision Pro')) {
                    newAchievements.push('Precision Pro');
                }
                break;
            default:
                break;
        }

        if (newAchievements.length > 0) {
            setAchievements(prev => [...prev, ...newAchievements]);
            playSound('success');
            setNotification(`🏆 Achievement Unlocked: ${newAchievements[0]}`);
            setTimeout(() => setNotification(''), 3000);
        }
    };

    // ============================================
    // GAME LOOP
    // ============================================
    useEffect(() => {
        if (!gameStarted || showMissionComplete) return;

        const gameLoop = setInterval(() => {
            // Update astronaut position based on velocity
            setAstronautPosition(prev => ({
                x: prev.x + astronautVelocity.x,
                y: Math.max(-5, Math.min(8, prev.y + astronautVelocity.y)),
                z: prev.z + astronautVelocity.z
            }));

            // Check collisions
            checkCollisions();

            // Update oxygen
            if (gameMode === 'mission') {
                setOxygen(prev => {
                    const newOxygen = Math.max(0, prev - 0.1);
                    if (newOxygen <= 20 && newOxygen > 19.9) {
                        playSound('alarm');
                        setHint('WARNING: Oxygen levels critical!');
                    }
                    if (newOxygen <= 0) {
                        gameOver();
                    }
                    return newOxygen;
                });

                setMissionTime(prev => {
                    const newTime = Math.max(0, prev - 0.1);
                    if (newTime <= 0) {
                        gameOver();
                    }
                    return newTime;
                });
            }

            // Update elapsed time
            setTimeElapsed(prev => prev + 0.1);

            // Animate floating tools
            setTools(prev => prev.map(tool => ({
                ...tool,
                position: {
                    ...tool.position,
                    y: tool.position.y + Math.sin(Date.now() * 0.001 + tool.position.x) * 0.01
                },
                rotation: tool.rotation + 0.01
            })));

            // Check proximity and show hints
            let nearbyObject = null;

            // Check for nearby tools
            tools.forEach(tool => {
                if (!tool.collected) {
                    const distance = Math.sqrt(
                        Math.pow(tool.position.x - astronautPosition.x, 2) +
                        Math.pow(tool.position.y - astronautPosition.y, 2) +
                        Math.pow(tool.position.z - astronautPosition.z, 2)
                    );
                    if (distance < 3) {
                        nearbyObject = `Press E to collect ${tool.type}`;
                    }
                }
            });

            // Check for nearby repair panels
            if (!nearbyObject && heldTool) {
                repairPanels.forEach(panel => {
                    if (!panel.repaired) {
                        const distance = Math.sqrt(
                            Math.pow(panel.position.x - astronautPosition.x, 2) +
                            Math.pow(panel.position.y - astronautPosition.y, 2) +
                            Math.pow(panel.position.z - astronautPosition.z, 2)
                        );
                        if (distance < 3) {
                            nearbyObject = `Press E to repair panel (${panel.health}/${panel.maxHealth})`;
                        }
                    }
                });
            }

            // Check for nearby cables
            if (!nearbyObject) {
                cables.forEach(cable => {
                    if (!cable.connected) {
                        const distance = Math.sqrt(
                            Math.pow(cable.position.x - astronautPosition.x, 2) +
                            Math.pow(cable.position.y - astronautPosition.y, 2) +
                            Math.pow(cable.position.z - astronautPosition.z, 2)
                        );
                        if (distance < 3) {
                            nearbyObject = `Press E to connect ${cable.color} cable`;
                        }
                    }
                });
            }

            // Check for solar array
            if (!nearbyObject && heldTool && solarArray.damaged && solarArray.position) {
                const distance = Math.sqrt(
                    Math.pow(solarArray.position.x - astronautPosition.x, 2) +
                    Math.pow(solarArray.position.y - astronautPosition.y, 2) +
                    Math.pow(solarArray.position.z - astronautPosition.z, 2)
                );
                if (distance < 4) {
                    nearbyObject = `Press E to repair solar array (${solarArray.progress}%)`;
                }
            }

            if (nearbyObject) {
                setHint(nearbyObject);
            } else if (gameMode === 'freeplay') {
                setHint('Use WASD to move, Space/Shift for up/down, E to interact');
            }


            // Check mission objectives
            if (gameMode === 'mission') {
                checkMissionCompletion();
            }

        }, 100);

        return () => clearInterval(gameLoop);
    }, [gameStarted, showMissionComplete, astronautVelocity, astronautPosition, oxygen, missionTime]);

    // Keyboard controls
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyRelease);
        };
    }, [gameStarted, astronautPosition, tools, repairPanels, cables, solarArray, heldTool]);

    const gameOver = () => {
        setNotification('Mission Failed!');
        playSound('error');
        setTimeout(() => {
            setGameMode('menu');
            setGameStarted(false);
        }, 3000);
    };

    const nextMission = () => {
        setShowMissionComplete(false);
        const nextMissionIndex = missions.findIndex(m => m.id === currentMission.id) + 1;

        if (nextMissionIndex < missions.length) {
            startMission(missions[nextMissionIndex]);
            resetGameState();
        } else {
            setNotification('🎉 All Missions Complete! You are a true astronaut!');
            setTimeout(() => {
                setGameMode('menu');
                setGameStarted(false);
            }, 5000);
        }
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="nbl-enhanced-container">
            {/* MAIN MENU */}
            {gameMode === 'menu' && (
                <div className="game-menu-overlay">
                    <div className="game-menu-panel">
                        <h1 className="game-title">🚀 NBL TRAINING ACADEMY</h1>
                        <p className="game-subtitle">Neutral Buoyancy Laboratory</p>

                        <div className="menu-buttons">
                            <button className="menu-btn primary" onClick={() => startGame('mission')}>
                                🎯 START MISSIONS
                            </button>
                            <button className="menu-btn secondary" onClick={() => startGame('freeplay')}>
                                🎮 FREE PLAY
                            </button>
                        </div>

                        {completedMissions.length > 0 && (
                            <div className="stats-preview">
                                <h3>Your Progress</h3>
                                <p>Missions Completed: {completedMissions.length}/{missions.length}</p>
                                <p>Achievements: {achievements.length}</p>
                                <p>High Score: {score}</p>
                            </div>
                        )}

                        <div className="controls-info">
                            <h3>🎮 Controls</h3>
                            <p><strong>WASD / Arrows:</strong> Move</p>
                            <p><strong>Space:</strong> Ascend</p>
                            <p><strong>Shift:</strong> Descend</p>
                            <p><strong>E:</strong> Interact</p>
                        </div>
                    </div>
                </div>
            )}

            {/* TUTORIAL OVERLAY */}
            {showTutorial && gameStarted && (
                <div className="tutorial-overlay" onClick={() => setShowTutorial(false)}>
                    <div className="tutorial-panel">
                        <h2>🎓 Mission Briefing</h2>
                        <h3>{currentMission?.title}</h3>
                        <p>{currentMission?.description}</p>

                        <div className="objectives-list">
                            <h4>Objectives:</h4>
                            {currentMission?.objectives.map((obj, idx) => (
                                <div key={idx} className="objective-item">
                                    <span className="objective-number">{idx + 1}</span>
                                    <span>{obj}</span>
                                </div>
                            ))}
                        </div>

                        {/* Show what objects spawn in this mission */}
                        <div className="mission-objects">
                            <h4>📦 Objects in This Mission:</h4>
                            <div className="objects-grid">
                                {currentMission?.id === 1 && (
                                    <>
                                        <div className="object-badge">🔧 1 Tool</div>
                                        <div className="object-badge">☀️ Solar Array</div>
                                    </>
                                )}
                                {currentMission?.id === 2 && (
                                    <div className="object-badge">🔧 5 Tools</div>
                                )}
                                {currentMission?.id === 3 && (
                                    <div className="object-badge">🔌 3 Cables</div>
                                )}
                                {currentMission?.id === 4 && (
                                    <>
                                        <div className="object-badge">📦 4 Panels</div>
                                        <div className="object-badge-note">⚠️ Find tools first!</div>
                                    </>
                                )}
                                {currentMission?.id === 5 && (
                                    <>
                                        <div className="object-badge">🔧 3 Tools</div>
                                        <div className="object-badge">📦 2 Panels</div>
                                        <div className="object-badge">🔌 2 Cables</div>
                                        <div className="object-badge">☀️ Solar Array</div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mission-info">
                            <span>⏱️ Time: {currentMission?.timeLimit}s</span>
                            <span>🏆 Reward: {currentMission?.reward} pts</span>
                            <span>⭐ Difficulty: {currentMission?.difficulty}</span>
                        </div>

                        <div className="quick-tips">
                            <h4>💡 Quick Tips:</h4>
                            <ul>
                                <li>Look for glowing objects with particle effects</li>
                                <li>Get within 3 units and press E to interact</li>
                                <li>Press H during mission for help</li>
                                <li>Use Tab to track objectives</li>
                            </ul>
                        </div>

                        <button className="tutorial-close-btn" onClick={() => setShowTutorial(false)}>
                            START MISSION
                        </button>
                    </div>
                </div>
            )}

            {/* MISSION COMPLETE OVERLAY */}
            {showMissionComplete && (
                <div className="mission-complete-overlay">
                    <div className="mission-complete-panel">
                        <h1>🎉 MISSION COMPLETE!</h1>
                        <h2>{currentMission?.title}</h2>

                        <div className="mission-stats">
                            <div className="stat-row">
                                <span>Base Reward:</span>
                                <span>+{currentMission?.reward}</span>
                            </div>
                            <div className="stat-row">
                                <span>Time Bonus:</span>
                                <span>+{Math.max(0, Math.floor(missionTime * 10))}</span>
                            </div>
                            <div className="stat-row">
                                <span>Accuracy Bonus:</span>
                                <span>+{Math.floor(accuracy * 5)}</span>
                            </div>
                            <div className="stat-row">
                                <span>Combo Bonus:</span>
                                <span>+{combo * 50}</span>
                            </div>
                            <div className="stat-row total">
                                <span>Total Score:</span>
                                <span>{score}</span>
                            </div>
                        </div>

                        {achievements.length > 0 && (
                            <div className="achievements-earned">
                                <h3>🏆 Achievements</h3>
                                {achievements.map((ach, idx) => (
                                    <div key={idx} className="achievement-badge">{ach}</div>
                                ))}
                            </div>
                        )}

                        <button className="next-mission-btn" onClick={nextMission}>
                            NEXT MISSION →
                        </button>
                    </div>
                </div>
            )}

            {/* GAME HUD */}
            {gameStarted && gameMode !== 'menu' && (
                <div className="game-hud">
                    <div className="hud-top">
                        <div className="hud-stat score">
                            <span className="stat-label">SCORE</span>
                            <span className="stat-value">{Math.floor(score)}</span>
                        </div>

                        <div className="hud-stat oxygen">
                            <span className="stat-label">O₂</span>
                            <div className="oxygen-bar">
                                <div
                                    className="oxygen-fill"
                                    style={{
                                        width: `${oxygen}%`,
                                        backgroundColor: oxygen > 50 ? '#00ff88' : oxygen > 20 ? '#ffaa00' : '#ff4444'
                                    }}
                                />
                            </div>
                            <span className="stat-value">{Math.floor(oxygen)}%</span>
                        </div>

                        {gameMode === 'mission' && (
                            <div className="hud-stat timer">
                                <span className="stat-label">TIME</span>
                                <span className="stat-value">{Math.floor(missionTime)}s</span>
                            </div>
                        )}

                        <div className="hud-stat combo">
                            <span className="stat-label">COMBO</span>
                            <span className="stat-value">x{combo}</span>
                        </div>

                        {/* Show object counter in ALL game modes */}
                        <div className="hud-stat objects">
                            <span className="stat-label">OBJECTS</span>
                            <span className="stat-value">
                                T: {tools.filter(t => !t.collected).length} |
                                P: {repairPanels.filter(p => !p.repaired).length} |
                                C: {cables.filter(c => !c.connected).length}
                            </span>
                        </div>
                    </div>

                    {/* Debug position display (bottom-right corner) */}
                    {gameStarted && (
                        <div className="position-display">
                            <div>X: {astronautPosition.x.toFixed(1)}</div>
                            <div>Y: {astronautPosition.y.toFixed(1)}</div>
                            <div>Z: {astronautPosition.z.toFixed(1)}</div>
                        </div>
                    )}

                    <div className="hud-bottom">
                        {heldTool && (
                            <div className="held-tool-display">
                                <span>🔧 {heldTool.type.toUpperCase()}</span>
                            </div>
                        )}

                        {hint && (
                            <div className="hint-display">
                                💡 {hint}
                            </div>
                        )}
                    </div>

                    {notification && (
                        <div className="notification-popup">
                            {notification}
                        </div>
                    )}

                    {/* ON-SCREEN MOVEMENT CONTROLS */}
                    <div className="on-screen-controls">
                        <div className="control-section movement-controls">
                            <h4>🕹️ MOVEMENT</h4>
                            <div className="control-grid">
                                <button className="control-btn" onMouseDown={() => handleKeyPress({ key: 'w' })} onMouseUp={handleKeyRelease}>
                                    ⬆️ W
                                </button>
                                <div className="control-row">
                                    <button className="control-btn" onMouseDown={() => handleKeyPress({ key: 'a' })} onMouseUp={handleKeyRelease}>
                                        ⬅️ A
                                    </button>
                                    <button className="control-btn" onMouseDown={() => handleKeyPress({ key: 's' })} onMouseUp={handleKeyRelease}>
                                        ⬇️ S
                                    </button>
                                    <button className="control-btn" onMouseDown={() => handleKeyPress({ key: 'd' })} onMouseUp={handleKeyRelease}>
                                        ➡️ D
                                    </button>
                                </div>
                                <div className="control-row">
                                    <button className="control-btn up-down" onMouseDown={() => handleKeyPress({ key: ' ' })} onMouseUp={handleKeyRelease}>
                                        ⬆️ SPACE<br />(Up)
                                    </button>
                                    <button className="control-btn up-down" onMouseDown={() => handleKeyPress({ key: 'shift' })} onMouseUp={handleKeyRelease}>
                                        ⬇️ SHIFT<br />(Down)
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="control-section action-controls">
                            <h4>⚡ ACTIONS</h4>
                            <button
                                className="control-btn action-btn collect-btn"
                                onClick={() => handleKeyPress({ key: 'e' })}
                                disabled={!canInteract()}
                            >
                                🔧 COLLECT / REPAIR (E)
                            </button>
                            <div className="interaction-hint">
                                {getInteractionHint()}
                            </div>
                        </div>
                    </div>

                    {/* Help Button Hint */}
                    <div className="help-hint">
                        Press H for Help
                    </div>
                </div>
            )}

            {/* HELP OVERLAY */}
            {showHelp && gameStarted && (
                <div className="help-overlay" onClick={() => setShowHelp(false)}>
                    <div className="help-panel" onClick={(e) => e.stopPropagation()}>
                        <button className="close-help-btn" onClick={() => setShowHelp(false)}>✕</button>

                        <h2>📖 Quick Guide</h2>

                        <div className="help-section">
                            <h3>🎯 Current Mission</h3>
                            {gameMode === 'mission' && currentMission ? (
                                <>
                                    <h4>{currentMission.title}</h4>
                                    <p>{currentMission.description}</p>
                                    <div className="objectives-checklist">
                                        {currentMission.objectives.map((obj, idx) => (
                                            <div key={idx} className="checklist-item">
                                                <span className="checkbox">☐</span>
                                                <span>{obj}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p>Free Play Mode - Explore and practice!</p>
                            )}
                        </div>

                        <div className="help-section">
                            <h3>🔍 Available Objects</h3>
                            <div className="objects-list">
                                <div className="object-info">
                                    <span className="object-icon">🔧</span>
                                    <div>
                                        <strong>Tools ({tools.filter(t => !t.collected).length} remaining)</strong>
                                        <p>Look for glowing gold, red, teal, or mint objects. Press E to collect.</p>
                                    </div>
                                </div>

                                {repairPanels.length > 0 && (
                                    <div className="object-info">
                                        <span className="object-icon">📦</span>
                                        <div>
                                            <strong>Repair Panels ({repairPanels.filter(p => !p.repaired).length} remaining)</strong>
                                            <p>Red panels with health bars. Need a tool to repair. Press E repeatedly.</p>
                                        </div>
                                    </div>
                                )}

                                {cables.length > 0 && (
                                    <div className="object-info">
                                        <span className="object-icon">🔌</span>
                                        <div>
                                            <strong>Cables ({cables.filter(c => !c.connected).length} remaining)</strong>
                                            <p>Red, Blue, Yellow cables. Connect in order. Press E.</p>
                                        </div>
                                    </div>
                                )}

                                {solarArray.position && solarArray.damaged && (
                                    <div className="object-info">
                                        <span className="object-icon">☀️</span>
                                        <div>
                                            <strong>Solar Array ({solarArray.progress}% repaired)</strong>
                                            <p>Large blue panels at X:10, Y:2, Z:-10. Need tool. Press E repeatedly.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="help-section">
                            <h3>🕹️ Controls</h3>
                            <div className="controls-grid">
                                <div><kbd>W A S D</kbd> Move around</div>
                                <div><kbd>SPACE</kbd> Swim up</div>
                                <div><kbd>SHIFT</kbd> Swim down</div>
                                <div><kbd>E</kbd> Interact with objects</div>
                                <div><kbd>H</kbd> Toggle this help</div>
                                <div><kbd>TAB</kbd> Toggle objectives</div>
                            </div>
                        </div>

                        <div className="help-section">
                            <h3>💡 Tips</h3>
                            <ul>
                                <li>Watch the <strong>hint at bottom center</strong> - it shows nearby objects</li>
                                <li>Check <strong>position display (bottom-right)</strong> to navigate</li>
                                <li>Objects <strong>glow</strong> - look for colorful lights</li>
                                <li><strong>Collect a tool first</strong> before trying to repair</li>
                                <li>Get within <strong>3 units</strong> of objects to interact</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* OBJECTIVE TRACKER */}
            {showObjectiveTracker && gameStarted && gameMode === 'mission' && currentMission && (
                <div className="objective-tracker">
                    <div className="tracker-header">
                        <h3>Mission Objectives</h3>
                        <button className="minimize-btn" onClick={() => setShowObjectiveTracker(false)}>−</button>
                    </div>
                    <div className="tracker-content">
                        {currentMission.objectives.map((obj, idx) => {
                            let completed = false;

                            // Determine if objective is completed
                            if (currentMission.id === 1) {
                                if (idx === 0) completed = heldTool !== null;
                                if (idx === 1) completed = heldTool !== null;
                                if (idx === 2) completed = !solarArray.damaged;
                            } else if (currentMission.id === 2) {
                                if (idx === 0) completed = tools.filter(t => t.collected).length === tools.length;
                            } else if (currentMission.id === 3) {
                                if (idx === 0) completed = cables.length > 0;
                                if (idx === 1) completed = cables.filter(c => c.connected).length === cables.length;
                            } else if (currentMission.id === 4) {
                                if (idx === 0) completed = repairPanels.filter(p => p.repaired).length === repairPanels.length;
                            }

                            return (
                                <div key={idx} className={`objective-item ${completed ? 'completed' : ''}`}>
                                    <span className="objective-checkbox">{completed ? '✅' : '☐'}</span>
                                    <span className="objective-text">{obj}</span>
                                </div>
                            );
                        })}

                        <div className="tracker-stats">
                            <div>⏱️ Time: {Math.floor(missionTime)}s</div>
                            <div>🎯 Score: {score}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* 3D SCENE */}
            {gameStarted && (
                <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
                    <NBLSceneEnhanced
                        astronautPosition={astronautPosition}
                        astronautRotation={astronautRotation}
                        tools={tools}
                        repairPanels={repairPanels}
                        cables={cables}
                        solarArray={solarArray}
                        heldTool={heldTool}
                    />
                </Canvas>
            )}
        </div>
    );
};

export default NBLExperienceEnhanced;
