import React from 'react';
import ReactDOM from 'react-dom'
import modal from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

function Modal({ children, closePopup }) {
  return ReactDOM.createPortal(
    (
      <ModalOverlay closePopup={closePopup}>
        <div className={`${modal.modal}`}>
            <button type="button" className={`${modal.closeButton}`} onClick={closePopup}>
              <CloseIcon type="primary" />
            </button>
            {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default Modal;