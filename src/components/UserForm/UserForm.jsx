/* eslint-disable no-useless-escape */
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useAuth } from "@/utilites/hooks/useAuth";
import { updateUserById } from "@/redux/auth/operations";
import { toggleModal } from "@/redux/contacts/slice";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  ButtonGroup,
  Avatar,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { setIsUserEdited } from "@/redux/auth/slice";

export default function UserForm() {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [file, setFile] = useState(null);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const { isUserEdited, userId, userAvatar, userName, isRefreshing } =
    useAuth();
  const [avatarLocalURL, setAvatarLocalURL] = useState(userAvatar || '');
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    if (!avatarLocalURL) {
      fileInputRef.current.click();
    } else {
      setIsAvatarChanged(true);
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
    dispatch(setIsUserEdited(false));
    dispatch(toggleModal());
  };

  const handleSubmit = ({ name }) => {
    if (isUserEdited && file) {
      const data = new FormData();
      data.append('name', name);
      data.append('avatar', file);
      dispatch(updateUserById({ id: userId, data }));
      dispatch(setIsUserEdited(false));
    } else if (isUserEdited && !file) {
      dispatch(updateUserById({ id: userId, data: { name, isAvatarChanged } }));
      dispatch(setIsUserEdited(false));
    } 
    dispatch(toggleModal());
  };

  const schema = yup.object({
    name: yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: userName,
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  const isNameError = formik.touched.name && formik.errors.name;
  const isNameCorrect = formik.touched.name && !formik.errors.name;

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <FormControl isInvalid={isNameError}>
        <FormLabel>Name</FormLabel>
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

      <ButtonGroup spacing="4" mt={4}>
        <Button
          mt={4}
          colorScheme="orange"
          isLoading={isRefreshing}
          type="submit"
        >
          Save
        </Button>

        <Button mt={4} colorScheme="gray" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}
