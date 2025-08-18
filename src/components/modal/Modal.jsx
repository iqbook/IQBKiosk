// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import { MdClose } from "react-icons/md";
import { ClickAwayListener } from '@mui/material';
import { useSelector } from 'react-redux';

const Modal = ({ isOpen, setIsOpen, setModal1, setModal2, setModal3, setModal4, setSelectedServices, setSelectedBarber, children }) => {

  const { colors } = useSelector(state => state.theme);

  const closeModal = () => {

    setIsOpen(false)
    setModal1(false)
    setModal2(false)
    setModal3(false)
    setModal4(false)
    setSelectedServices([])
    setSelectedBarber(false)
  }

  return ReactDOM.createPortal(
    <>

      <div className={style.main__modal__container}>
        <ClickAwayListener onClickAway={closeModal}>
          <div>
            <div 
            className={style.modal__content}
            style={{
              backgroundColor: colors.color1,
              border: `0.1rem solid ${colors.borderColor}`
            }}
            >
              <button onClick={closeModal} className={style.main__modal__close} style={{ cursor: "pointer",border: `0.1rem solid ${colors.borderColor}` }}><MdClose /></button>
              <br />
              {children}
            </div>
          </div>
        </ClickAwayListener>
      </div>

    </>,
    document.getElementById('overlays')
  );
};

export default Modal;