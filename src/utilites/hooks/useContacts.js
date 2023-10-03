import { useSelector } from 'react-redux';
import {
	getContacts,
	getIsLoading,
	getError,
	getFilter,
	getIsModalOpen,
	getIsContactEdited,
	getEditedContactData,
} from "@/redux/contacts/selectors";

export const useContacts = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const contactsErrorMessage = useSelector(getError);
  const filter = useSelector(getFilter);
  const isModalOpen = useSelector(getIsModalOpen);
  const isContactEdited = useSelector(getIsContactEdited);
  const editedContactData = useSelector(getEditedContactData);

  return {
    contacts,
    isLoading,
    contactsErrorMessage,
    filter,
    isModalOpen,
    isContactEdited,
    editedContactData,
  };
};

