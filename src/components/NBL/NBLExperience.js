import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import NBLScene from './NBLScene';
import NBLControls from './NBLControls';
import TaskPanel from './TaskPanel';
import nblTasks from '../../data/nblTasks.json';
import './NBLExperience_old.css';

const NBLExperience = () => {
    const [astronautWeight, setAstronautWeight] = useState(0);
    const [astronautPosition, setAstronautPosition] = useState({ x: 0, y: 0, z: 0 });
    const [currentTask, setCurrentTask] = useState(null);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [isTaskActive, setIsTaskActive] = useState(false);
    const [showTaskPanel, setShowTaskPanel] = useState(false);

    const handleWeightChange = (delta) => {
        setAstronautWeight(prev => Math.max(-10, Math.min(10, prev + delta)));
    };

    const handleMovement = (direction) => {
        setAstronautPosition(prev => {
            const speed = 1;
            switch (direction) {
                case 'forward': return { ...prev, z: Math.max(prev.z - speed, -10) };
                case 'backward': return { ...prev, z: Math.min(prev.z + speed, 10) };
                case 'left': return { ...prev, x: Math.max(prev.x - speed, -10) };
                case 'right': return { ...prev, x: Math.min(prev.x + speed, 10) };
                default: return prev;
            }
        });
    };

    const startTask = (task) => {
        setCurrentTask(task);
        setIsTaskActive(true);
        setShowTaskPanel(false);
    };

    const completeTask = () => {
        if (currentTask && !completedTasks.includes(currentTask.id)) {
            const weightDiff = Math.abs(astronautWeight - currentTask.targetWeight);
            const isWithinTolerance = weightDiff <= currentTask.toleranceRange;

            if (isWithinTolerance) {
                setCompletedTasks([...completedTasks, currentTask.id]);
                setTotalScore(totalScore + currentTask.points);
                setIsTaskActive(false);
                setCurrentTask(null);
            } else {
                alert(`Adjust weight to ${currentTask.targetWeight} kg (±${currentTask.toleranceRange} kg)`);
            }
        }
    };

    const getBuoyancyStatus = () => {
        if (astronautWeight > 1) return { status: 'sinking', color: '#ff4444' };
        if (astronautWeight < -1) return { status: 'rising', color: '#44ff44' };
        return { status: 'neutral', color: '#00ff88' };
    };

    const buoyancy = getBuoyancyStatus();

    return (
        <div className="nbl-container">
            {/* Simple Header */}
            <div className="nbl-simple-header">
                <div className="score-box">
                    <span className="score-number">{totalScore}</span>
                    <span className="score-label">POINTS</span>
                </div>
                <div className="tasks-box">
                    <span className="tasks-number">{completedTasks.length}/{nblTasks.length}</span>
                    <span className="tasks-label">TASKS</span>
                </div>
                <button className="show-tasks-btn" onClick={() => setShowTaskPanel(!showTaskPanel)}>
                    {showTaskPanel ? '✕ Close' : '📋 Tasks'}
                </button>
            </div>

            <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
                <NBLScene
                    astronautWeight={astronautWeight}
                    astronautPosition={astronautPosition}
                    buoyancyStatus={buoyancy.status}
                    currentTask={currentTask}
                />
            </Canvas>

            <NBLControls
                astronautWeight={astronautWeight}
                onWeightChange={handleWeightChange}
                onMove={handleMovement}
                buoyancyStatus={buoyancy.status}
                buoyancyColor={buoyancy.color}
                currentTask={currentTask}
                isTaskActive={isTaskActive}
                onCompleteTask={completeTask}
            />

            {showTaskPanel && (
                <TaskPanel
                    tasks={nblTasks}
                    completedTasks={completedTasks}
                    currentTask={currentTask}
                    onStartTask={startTask}
                    onClose={() => setShowTaskPanel(false)}
                />
            )}
        </div>
    );
};

export default NBLExperience;
