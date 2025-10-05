import React from 'react';
import './NBLControls.css';

const NBLControls = ({
    astronautWeight,
    onWeightChange,
    onMove,
    buoyancyStatus,
    buoyancyColor,
    currentTask,
    isTaskActive,
    onCompleteTask
}) => {
    return (
        <div className="nbl-controls-simple">
            {/* Movement Controls */}
            <div className="movement-panel">
                <h3>🎮 MOVE</h3>
                <div className="movement-grid">
                    <div></div>
                    <button className="move-btn" onClick={() => onMove('forward')}>
                        ⬆️
                    </button>
                    <div></div>
                    <button className="move-btn" onClick={() => onMove('left')}>
                        ⬅️
                    </button>
                    <div className="move-center"></div>
                    <button className="move-btn" onClick={() => onMove('right')}>
                        ➡️
                    </button>
                    <div></div>
                    <button className="move-btn" onClick={() => onMove('backward')}>
                        ⬇️
                    </button>
                    <div></div>
                </div>
            </div>

            {/* Weight & Buoyancy Control */}
            <div className="weight-panel">
                <h3>⚖️ WEIGHT</h3>
                <div className="weight-display-large" style={{ color: buoyancyColor }}>
                    {astronautWeight > 0 ? '+' : ''}{astronautWeight.toFixed(1)} kg
                </div>

                <div className="buoyancy-indicator" style={{ borderColor: buoyancyColor }}>
                    <div className="status-dot" style={{ backgroundColor: buoyancyColor }}></div>
                    <span style={{ color: buoyancyColor }}>{buoyancyStatus.toUpperCase()}</span>
                </div>

                <div className="weight-buttons-simple">
                    <button className="weight-btn-big decrease" onClick={() => onWeightChange(-1)}>
                        - 1 kg
                    </button>
                    <button className="weight-btn-big increase" onClick={() => onWeightChange(1)}>
                        + 1 kg
                    </button>
                </div>
                <button className="reset-btn" onClick={() => onWeightChange(-astronautWeight)}>
                    RESET
                </button>
            </div>

            {/* Current Task Display */}
            {currentTask && (
                <div className="current-task-simple">
                    <div className="task-info">
                        <h4>{currentTask.task}</h4>
                        <p>Target: {currentTask.targetWeight} kg (±{currentTask.toleranceRange})</p>
                        <p className="task-points">🏆 {currentTask.points} points</p>
                    </div>
                    {isTaskActive && (
                        <button className="complete-btn" onClick={onCompleteTask}>
                            ✓ COMPLETE TASK
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default NBLControls;
