import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from "@/components/Loader/Loader.jsx";
import {
  StyledHeader,
} from './SharedLayout.styled';
import Navigation from '@/components/Navigation/Navigation';
import UserMenu from '@/components/UserMenu/UserMenu';
import AuthNav from '@/components/AuthNav/AuthNav';
import { useAuth } from "@/utilites/hooks/useAuth";
import { useContacts } from "@/utilites/hooks/useContacts";
import {
  Flex,
  Box,
  Spacer,
  Container,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import ModalComponent from '@/components/Modal/Modal';
import ContactForm from '@/components/ContactForm';
import UserForm from '@/components/UserForm/UserForm';
import { useState, useEffect, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';


export default function SharedLayout() {
  const [modalHeader, setModalHeader] = useState('');
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const { isUserEdited, isRefreshing, isLoggedIn } = useAuth();
  const { isLoading, isContactEdited } = useContacts();
  // const dispatch = useDispatch();
  const { toggleColorMode, colorMode } = useColorMode();

   useEffect(() => {
     setIsComponentLoading( isRefreshing);
   }, [isRefreshing]);
  
  
  useEffect(() => {
    setIsComponentLoading(isLoading || isRefreshing);
  }, [isLoading, isRefreshing]);
  
    const defineModalHeader = useCallback(() => {
      if (isContactEdited && !isComponentLoading && !isUserEdited) {
        setModalHeader('Edit contact');
      } else if (!isContactEdited && !isComponentLoading && !isUserEdited) {
        setModalHeader('Add contact');
      } else if (isUserEdited && !isComponentLoading && !isContactEdited) {
        setModalHeader('Edit user');
      } else if (isComponentLoading) {
        setModalHeader('Loading...');
      }
    }, [isContactEdited, isUserEdited, isComponentLoading]);
  
    useEffect(() => {
      defineModalHeader();
    }, [defineModalHeader]);
  
  return (
    <Container maxW="container.xl">
      <StyledHeader>
        <Flex align="center">
          <Box p="4">
            <Navigation />
          </Box>
          <Spacer />
          <IconButton
            aria-label="toggle theme"
            rounded="full"
            size="xs"
            onClick={toggleColorMode}
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          />
          <Box p="4">{isLoggedIn ? <UserMenu /> : <AuthNav />}</Box>
        </Flex>
      </StyledHeader>
      <ModalComponent header={modalHeader}>
        {isComponentLoading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
         {!isComponentLoading && isUserEdited && <UserForm />}
        {!isComponentLoading && !isUserEdited && <ContactForm />}
       
      </ModalComponent>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};


  