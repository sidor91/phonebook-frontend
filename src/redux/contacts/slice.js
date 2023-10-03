import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  patchContact,
} from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
  isModalOpen: false,
  editedContact: {
    editedContactData: null,
    isContactEdited: false,
  },
};

const handlePending = state => {
  state.contacts.isLoading = true;
};
const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleModal: state => {
      state.isModalOpen = !state.isModalOpen;
    },
    addEditedContactData: (state, action) => {
      state.editedContact.editedContactData = action.payload;
    },
    setIsContactEdited: (state, action) => {
      state.editedContact.isContactEdited = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isModalOpen = !state.isModalOpen;
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(patchContact.pending, handlePending)
      .addCase(patchContact.fulfilled, (state, action) => {
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1, action.payload);
        state.isModalOpen = !state.isModalOpen;
        state.editedContact.isContactEdited = false;
        state.editedContact.editedContactData = null;
        state.contacts.isLoading = false;
      })
      .addDefaultCase(state => state);
  },
});

export const {
  addFilter,
  toggleModal,
  setIsContactEdited,
  addEditedContactData,
  setEditedContactId,
} = contactsSlice.actions;
export default contactsSlice.reducer;
