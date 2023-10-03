import { useDispatch } from 'react-redux';
import { useContacts } from '@/utilites/hooks/useContacts';
import { useAuth } from '@/utilites/hooks/useAuth';
import {
  toggleModal,
  addEditedContactData,
  setIsContactEdited,
} from '@/redux/contacts/slice';
import { setIsUserEdited } from "@/redux/auth/slice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';


const ModalComponent = ({ header, children }) => {
  const dispatch = useDispatch();
  const {
    isModalOpen,
    isContactEdited,
    // isLoading
  } = useContacts();
  const { isUserEdited } = useAuth();

  const handleModalClose = () => {
    dispatch(toggleModal());
    if (isContactEdited) {
      dispatch(addEditedContactData(null));
      dispatch(setIsContactEdited(false));
    } else if (isUserEdited) {
      dispatch(setIsUserEdited(false));
    }
  };

  return (
    <Modal onClose={handleModalClose} isOpen={isModalOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} align="center" justify="center">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
