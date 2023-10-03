import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  toggleModal,
  setIsContactEdited,
  addEditedContactData,
} from '@/redux/contacts/slice';
import { deleteContact } from '@/redux/contacts/operations';
import {
  Avatar,
  Button,
  ButtonGroup,
  Box,
  Flex,
  Spacer,
  HStack,
  ListItem,
  Text,
  Divider,
} from '@chakra-ui/react';

const Contact = ({ name, number, favorite, id, avatar }) => {
  const dispatch = useDispatch();
  const handleEdit = async () => {
   await dispatch(
     addEditedContactData({ name, number, favorite, id, avatarURL: avatar })
   );
   await dispatch(setIsContactEdited(true));
    dispatch(toggleModal());
  };
  return (
    <>
      <ListItem>
        <HStack display={{ base: 'block', sm: 'flex' }} w="100%" spacing={4}>
          <Flex justify="space-between" w="100%">
            <Avatar mr={4} name={name} src={avatar} />
            <HStack w="100%">
              <Box>
                <Text fontSize={{ base: 'sm', md: 'md' }}>{name}</Text>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize={{ base: 'sm', md: 'md' }}>{number}</Text>
              </Box>
            </HStack>
          </Flex>
          <Spacer />
          <ButtonGroup
            display={{ base: 'flex', sm: 'inline-flex' }}
            justifyContent={{ base: 'center', sm: 'normal' }}
            w={{ base: '100%', sm: 'auto' }}
          >
            <Button
              size="sm"
              colorScheme="orange"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              size="sm"
              colorScheme="orange"
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </Button>
          </ButtonGroup>
        </HStack>
        <Divider my={4} />
      </ListItem>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Contact;


