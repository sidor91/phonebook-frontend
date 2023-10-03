import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from "@/redux/contacts/operations";
import Section from '@/components/Section';
import ContactList from '@/components/ContactList';
import Filter from '@/components/Filter';
import Loader from '@/components/Loader';
import { useContacts } from "@/utilites/hooks/useContacts";
import { Button, Divider, Text, VStack, Container } from '@chakra-ui/react';
import { toggleModal } from "@/redux/contacts/slice";


export default function ContactsPage() {
  const { contacts, isLoading, error } = useContacts();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Section title="Add a contact by clicking a button">
        <VStack justifyContent="center">
          <Button
            colorScheme="orange"
            fontSize="sm"
            size="sm"
            type="button"
            onClick={() => {
              dispatch(toggleModal());
            }}
          >
            Add
          </Button>
        </VStack>
      </Section>
      <Divider />
      <Section title="Contacts">
        {isLoading && !error && contacts.length > 0 && <Loader />}
        {/* {error && <p>Something went wrong. {error}</p>} */}
        {contacts.length > 0 && !isLoading && (
          <>
            <Filter />
            <ContactList />
          </>
        )}
        {contacts.length === 0 && !isLoading && (
          <Text fontSize={{ base: 'md', sm: 'xl' }}>
            You haven't added any contacts yet
          </Text>
        )}
      </Section>
    </Container>
  );
}
