import React, { useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { ModalContext } from '../../context/ModalContext/ModalContext';

interface IModalBackdropStyle {
  closing: boolean
}

const showModalBackDrop = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
` 
const hideModalBackDrop = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
` 

const showModal = keyframes`
  from {
    transform: scale(0)
  }

  to {
    transform: scale(1)
  }
` 

const hideModal = keyframes`
  from {
    transform: scale(1)
  }

  to {
    transform: scale(0)
  }
` 

const StyledModalBackDrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;

  animation: ${showModalBackDrop}; .3s ease-out;
`;

const StyledModal = styled('div')`
  background-color: white;
  width: 800px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);

  animation: ${showModal} .3s ease-out;
`;

const StyledModalHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const StyledModalBody = styled.div`
  padding: 10px 20px;
`;

const Modal = (props: any) => {
  const {title, children} = props

  const {closeModal} = useContext(ModalContext)
  
  const [closing, setClosing] = useState(false)

  const onClickClose = () => {
    setClosing(true)

    closeModal()
  }



  return (
    <StyledModalBackDrop onClick={onClickClose}>
      <StyledModal onClick={(e) => {e.stopPropagation()}}>
        <StyledModalHeader>
          {title}
        </StyledModalHeader>
        <StyledModalBody>
          {children}
        </StyledModalBody>
      </StyledModal>
    </StyledModalBackDrop>
  )
}

export default Modal