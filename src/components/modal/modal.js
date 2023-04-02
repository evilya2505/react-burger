import React from 'react';
import modal from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Modal({ children, closePopup }) {
  return (
    <div className={`${modal.modal}`}>
        <button type="button" className={`${modal.closeButton}`} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
    </div>
  );
}

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default Modal;