import React from 'react';
import ReactDOM from 'react-dom'
import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function ModalOverlay({ children, closePopup }) {
  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Escape') closePopup();
  }, [closePopup])

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return() => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    (
      <>
        <div className={modalOverlay.overlay} onClick={closePopup}>
          {children}
        </div>
      </>
    ),
    modalRoot
  );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired
};


export default ModalOverlay;