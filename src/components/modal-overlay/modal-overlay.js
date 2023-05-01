import React from "react";
import modalOverlay from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, closePopup }) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopup]);

  function handleOverlayClick(e) {
    if (e.target.classList.value.includes("modal-overlay_overlay")) {
      closePopup();
    }
  }

  return (
    <div className={modalOverlay.overlay} onClick={handleOverlayClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
