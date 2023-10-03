import { useAuth } from "@/utilites/hooks/useAuth";
// import { useDispatch } from 'react-redux';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();
  // const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch(turnOffIsLoginFailed());
  // }
  
  return (
    <nav>
      <ButtonGroup gap="2">
        <Button
          isActive={pathname === '/'}
          colorScheme="orange"
          variant="link"
          // onClick={handleClick}
          fontSize="xl"
        >
          <Link to="/">Home</Link>
        </Button>
        {isLoggedIn && (
          <Button
            isActive={pathname === '/contacts'}
            colorScheme="orange"
            variant="link"
            // onClick={handleClick}
            fontSize="xl"
          >
            <Link to="/contacts">Contacts</Link>
          </Button>
        )}
      </ButtonGroup>
    </nav>
  );
}


export default Navigation;











