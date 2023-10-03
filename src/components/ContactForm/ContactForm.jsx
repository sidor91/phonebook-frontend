/* eslint-disable no-useless-escape */
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useContacts } from '@/utilites/hooks/useContacts';
import { useAuth } from '@/utilites/hooks/useAuth';
import {
  addContact,
  patchContact,
} from '@/redux/contacts/operations';
import { updateUserById } from "@/redux/auth/operations";
import {
  toggleModal,
  setIsContactEdited,
  addEditedContactData,
} from '@/redux/contacts/slice';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Button,
  ButtonGroup,
  Checkbox,
  Avatar,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { setIsUserEdited } from "@/redux/auth/slice";

export default function ContactForm() {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [file, setFile] = useState(null);
  const [avatarLocalURL, setAvatarLocalURL] = useState('');
  const { isContactEdited, editedContactData, isLoading } = useContacts();
  const { isUserEdited, userId } = useAuth();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const resetEditedContact = () => {
    dispatch(addEditedContactData(null));
    dispatch(setIsContactEdited(false));
  };

  useEffect(() => {
    if (editedContactData?.avatarURL) {
      setAvatarLocalURL(editedContactData.avatarURL);
    }
  }, [editedContactData]);

  const handleFileInputClick = () => {
    if (!avatarLocalURL) {
      fileInputRef.current.click();
    } else {
      setFile(null);
      setAvatarLocalURL('');
    }
  };

  const handleFileChange = e => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarLocalURL(imageUrl);
    }
  };

  const handleCancel = () => {
    if (isContactEdited) {
     resetEditedContact();
    } else if (isUserEdited) {
      dispatch(setIsUserEdited(false));
    }
    dispatch(toggleModal());
  };

  

  const handleSubmit = ({ name, number, favorite }) => {
    if (isContactEdited && file) {
      const data = new FormData();
      data.append('name', name);
      data.append('number', number);
      data.append('favorite', favorite);
      data.append('avatar', file);
      dispatch(patchContact({ data, id: editedContactData.id }));
      resetEditedContact();
    } else if (isContactEdited && !file) {
      dispatch(
        patchContact({
          data: { name, number, favorite },
          id: editedContactData.id,
        })
      );
      resetEditedContact();
    } else if (isUserEdited && file) {
      const data = new FormData();
      data.append('name', name);
      data.append('avatar', file);
      dispatch(updateUserById({id: userId, data}));
      dispatch(setIsUserEdited(false));
    } else if (isUserEdited && !file) {
      dispatch(updateUserById({ id: userId, data: {name} }));
      dispatch(setIsUserEdited(false));
    } else {
      dispatch(addContact({ name, number, favorite }));
    }
  };

  const schema = yup.object({
    name: yup.string().required('Required'),
    number: yup
      .string()
      .matches(/^(\+)?([ 0-9]){10,16}$/, 'Invalid format')
      .required('Required'),
    favorite: yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: editedContactData?.name || '',
      number: editedContactData?.number || '',
      favorite: editedContactData?.favorite || false,
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  const isNameError = formik.touched.name && formik.errors.name;
  const isNameCorrect = formik.touched.name && !formik.errors.name;
  const isNumberError = formik.touched.number && formik.errors.number;
  const isNumberCorrect = formik.touched.number && !formik.errors.number;

  return (
    <form onSubmit={formik.handleSubmit}>
      {isContactEdited  && (
          <VStack mb={8}>
            <Avatar
              size="xl"
              mb={2}
              name={formik.values.name}
              // onClick={handleFileInputClick}
              src={avatarLocalURL}
              // style={{ cursor: 'pointer' }}
            />
            <Text
              fontSize="md"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleFileInputClick}
            >
              {avatarLocalURL ? 'Delete' : 'Add avatar'}
            </Text>
            <input
              style={{ display: 'none' }}
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </VStack>
        )}
      <FormControl isRequired isInvalid={isNameError}>
        <FormLabel>Full name</FormLabel>
        <Input
          id="name"
          name="name"
          type="text"
          focusBorderColor="#DD6B20"
          onChange={formik.handleChange}
          onBlur={e => {
            formik.handleBlur(e);
            setIsNameFocused(false);
          }}
          onFocus={() => {
            setIsNameFocused(true);
          }}
          value={formik.values.name}
          style={
            (isNameCorrect &&
              !isNameFocused && {
                borderColor: 'green',
                boxShadow: '0 0 0 1px green',
              }) ||
            null
          }
        />
        {isNameError && (
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mt={4} isRequired isInvalid={isNumberError}>
        <FormLabel>Phone number</FormLabel>
        <Input
          id="number"
          name="number"
          type="tel"
          focusBorderColor="#DD6B20"
          onChange={formik.handleChange}
          onBlur={e => {
            formik.handleBlur(e);
            setIsNumberFocused(false);
          }}
          onFocus={() => {
            setIsNumberFocused(true);
          }}
          value={formik.values.number}
          style={
            (isNumberCorrect &&
              !isNumberFocused && {
                borderColor: 'green',
                boxShadow: '0 0 0 1px green',
              }) ||
            null
          }
        />

        {isNumberError ? (
          <FormErrorMessage>{formik.errors.number}</FormErrorMessage>
        ) : (
          <FormHelperText>
            Minimum 10 digits. Spaces and hyphens are allowed
          </FormHelperText>
        )}
      </FormControl>

      <FormControl mt={4}>
        <Checkbox
          id="favorite"
          name="favorite"
          isChecked={formik.values.favorite}
          onChange={formik.handleChange}
        >
          Favorite
        </Checkbox>
      </FormControl>

      <ButtonGroup spacing="4" mt={4}>
        <Button mt={4} colorScheme="orange" isLoading={isLoading} type="submit">
          Save
        </Button>

        <Button mt={4} colorScheme="gray" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}
