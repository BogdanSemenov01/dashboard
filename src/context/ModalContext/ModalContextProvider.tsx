import React, { useState } from 'react'
import { ModalContext } from './ModalContext'
import Modal from '../../components/common/Modal'

const ModalProvider = ({children}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({})

  const openModal = (modalConfig: any) => {
    setModalContent(modalConfig)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const valueModalProvider = {
    openModal,
    closeModal
  }

  return (
    <ModalContext.Provider value={valueModalProvider}>
      {isModalOpen && <Modal data-testid='modal' title={''} children={undefined} {...modalContent} />}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider