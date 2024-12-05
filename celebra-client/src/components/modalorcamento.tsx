import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";

export const ModalOrcamento = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>Não deu tempo de fazer 😁</ModalBody>
      </ModalContent>
    </Modal>
  );
};
