import React, { useContext, useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { ModalContext } from "../../context/ModalContext/ModalContext"

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

const StyledModalBackDrop = styled("div")<{ closing: boolean }>`
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

  ${(props) =>
    props.closing ? backdropAnimationOnClose : backdropAnimationOnOpen};
`

const StyledModal = styled("div")<{ closing: boolean }>`
  margin-top: -200px;
  background-color: white;
  width: 800px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);

  ${(props) => (props.closing ? modalAnimationOnClose : modalAnimationOnOpen)};
`

const modalAnimationOnOpen = css`
  animation: ${showModal} 0.3s ease-out;
`
const modalAnimationOnClose = css`
  animation: ${hideModal} 0.3s ease-out;
`
const backdropAnimationOnOpen = css`
  animation: ${showModalBackDrop} 0.3s ease-out;
`
const backdropAnimationOnClose = css`
  animation: ${hideModalBackDrop} 0.3s ease-out;
`

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(219, 219, 219);
  & > h3 {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
`

const StyledModalBody = styled.div`
  padding: 10px 20px;
`

type ModalProps = {
  title: string
  children: React.ReactElement | undefined
  
}

const Modal = (props: ModalProps) => {
  const { title, children } = props

  const { closeModal } = useContext(ModalContext)

  const [closing, setClosing] = useState(false)

  const onClickClose = () => {
    setClosing(true)
    const closeTimeout = setTimeout(() => {
      clearTimeout(closeTimeout)
      closeModal()
    }, 290)
  }

  return (
    <StyledModalBackDrop onClick={onClickClose} closing={closing}>
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        closing={closing}
        data-testid='modal'
      >
        <StyledModalHeader>
          <h3>{title}</h3>
          <button onClick={onClickClose}>x</button>
        </StyledModalHeader>
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalBackDrop>
  )
}

export default Modal
