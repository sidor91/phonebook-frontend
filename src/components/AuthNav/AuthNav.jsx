import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/button';
// import { turnOffIsLoginFailed } from 'redux/auth/slice';
// import { useDispatch } from 'react-redux';
import { useAuth } from "@/utilites/hooks/useAuth";

const AuthNav = () => {
  // const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isRefreshing } = useAuth();

  return (
    <nav>
      <ButtonGroup gap="2">
        <Button
          isLoading={isRefreshing}
          loadingText="Loading"
          spinnerPlacement="start"
          onClick={() => {
            navigate('/login');
          }}
          isActive={pathname === '/login'}
          colorScheme="orange"
        >
          Login
        </Button>
        <Button
          isLoading={isRefreshing}
          loadingText="Loading"
          spinnerPlacement="start"
          onClick={() => {
            navigate('/register');
          }}
          isActive={pathname === '/register'}
          colorScheme="orange"
        >
          Register
        </Button>
      </ButtonGroup>
    </nav>
  );
};

export default AuthNav;
