import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

interface IModalProps {
  children: ReactNode;
  closePopup: () => void;
}

function Modal({ children, closePopup }: IModalProps) {
  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay closePopup={closePopup}>
      <div className={`${modal.modal}`}>
        <button
          type="button"
          className={`${modal.closeButton}`}
          onClick={closePopup}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
