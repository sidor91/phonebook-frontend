import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/utilites/hooks/useAuth";
import { logoutUser } from "@/redux/auth/operations";
import { Button, Flex, Avatar,HStack } from '@chakra-ui/react';
import { toggleModal } from "@/redux/contacts/slice";
import { setIsUserEdited } from "@/redux/auth/slice";

const UserMenu = () => {
  const navigate = useNavigate();
  const { userName, userAvatar, } = useAuth();
  const dispatch = useDispatch();

    
    return (
      <Flex align="center" flexDir={{ base: 'column', sm: 'row' }}>
        <HStack
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch(toggleModal());
            dispatch(setIsUserEdited(true));
          }}
        >
          <Avatar name={userName} src={userAvatar || ''} size="sm" />
          <p>Hello, {userName}!</p>
        </HStack>
        <Button
          mt={{ base: 1, sm: 'unset' }}
          fontSize="sm"
          size="sm"
          ml={{ base: 1, sm: '4' }}
          colorScheme="orange"
          onClick={() => {
            dispatch(logoutUser());
            navigate('/', { replace: true });
          }}
        >
          Logout
        </Button>
      </Flex>
    );
};

export default UserMenu;

