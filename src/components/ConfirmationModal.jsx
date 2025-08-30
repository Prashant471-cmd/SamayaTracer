import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, currentTask, newTask }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
                    <h2>Switch Task?</h2>
                    <button className="close-btn" onClick={onCancel}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-text">
                        <span className="current-task">"{currentTask}"</span> is currently running.
                    </p>
                    <p className="modal-text">
                        Do you want to pause it and start <span className="new-task">"{newTask}"</span>?
                    </p>
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onCancel}>
                        Keep Current Task
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        Switch Tasks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
