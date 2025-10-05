import React from 'react';
import './TaskPanel.css';

const TaskPanel = ({ tasks, completedTasks, currentTask, onStartTask, onClose }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#00ff88';
            case 'medium': return '#ffaa00';
            case 'hard': return '#ff4444';
            case 'expert': return '#ff00ff';
            default: return '#ffffff';
        }
    };

    return (
        <div className="task-panel-overlay" onClick={onClose}>
            <div className="task-panel-simple" onClick={(e) => e.stopPropagation()}>
                <div className="task-panel-header">
                    <h3>🎯 TRAINING MISSIONS</h3>
                    <button className="close-panel-btn" onClick={onClose}>✕</button>
                </div>

                <div className="tasks-grid">
                    {tasks.map((task) => {
                        const isCompleted = completedTasks.includes(task.id);
                        const isCurrent = currentTask?.id === task.id;

                        return (
                            <div
                                key={task.id}
                                className={`task-card-simple ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
                            >
                                {isCompleted && <div className="completed-badge-simple">✓</div>}

                                <div className="task-card-header">
                                    <h4>{task.task}</h4>
                                    <span
                                        className="difficulty-tag"
                                        style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
                                    >
                                        {task.difficulty}
                                    </span>
                                </div>

                                <p className="task-description">{task.instructions}</p>

                                <div className="task-stats-simple">
                                    <span>⚖️ {task.targetWeight} kg</span>
                                    <span>⏱️ {task.duration}s</span>
                                    <span>🏆 {task.points} pts</span>
                                </div>

                                {!isCompleted && !isCurrent && (
                                    <button
                                        className="start-task-btn-simple"
                                        onClick={() => onStartTask(task)}
                                    >
                                        START MISSION
                                    </button>
                                )}

                                {isCurrent && (
                                    <div className="active-badge-simple">⚡ ACTIVE</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TaskPanel;
