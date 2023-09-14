import React, { ReactNode, MouseEvent } from "react";
import modalOverlay from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface IModalOverlayProps {
  children: ReactNode;
  closePopup: () => void;
}

function ModalOverlay({ children, closePopup }: IModalOverlayProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopup]);

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;

    if (target.classList.value.includes("modal-overlay_overlay")) {
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
