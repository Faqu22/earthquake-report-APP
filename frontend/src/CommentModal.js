import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { BiCommentAdd } from "react-icons/bi";


const CommentModal = ({ title, content, sendFunction, setIsInvalid }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleActionClick = () => {
    sendFunction()
      .then((response) => {
        if (response === true) {
          onOpenChange();
        }
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
      });
  };
  
  const handleClose = () => {
    setIsInvalid(false);
    onOpenChange();
  };
  return (
    <>
      <button onClick={onOpen}>
        <BiCommentAdd size={23}/>
      </button>
      <Modal isOpen={isOpen} onOpenChange={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={() => handleActionClick()}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentModal;
