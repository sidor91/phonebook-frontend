import { Heading, Text,Box } from '@chakra-ui/layout';
import { useAuth } from "@/utilites/hooks/useAuth";

export default function HomePage () {
  const { isLoggedIn } = useAuth();
  return (
    <Box align="center">
      <Heading
        mt={6}
        as="h1"
        colorScheme="orange"
        fontSize={{ base: 'md', sm: 'xl' }}
      >
        Hey, welcome to the Phonebook app!
      </Heading>

      {isLoggedIn ? (
        <Text fontSize={{ base: 'md', sm: 'xl' }}>
          Please follow the contacts page to add or review the contacts.
        </Text>
      ) : (
        <Text fontSize={{ base: 'md', sm: 'xl' }}>
          Please, either login or register to use this app
        </Text>
      )}
    </Box>
  );
};

