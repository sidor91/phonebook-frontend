import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { loginUser, signupUser } from "@/redux/auth/operations";
// import { useAuth } from 'utilites/hooks/useAuth'; 
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Container,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const { isLoginFailed } = useAuth();


  const handleSubmit = values => {

    if (pathname === '/login') {
      dispatch(
        loginUser(values)
      );
        return;
    }
    dispatch(signupUser(values));
  };

  const registerSchema = yup.object({
    name: yup.string().required('Required'),
    email: yup.string().email().required('Required'),
    password: yup.string().required('Required'),
  });

  const loginSchema = yup.object({
    email: yup.string().email().required('Required'),
    password: yup.string().required('Required'),
  });

  const registerInitialValues = {
    name: '',
    email: '',
    password: '',
  };

  const loginInitialValues = {
    email: '',
    password: ''
  }

const formik = useFormik({
  initialValues:
    pathname === '/register' ? registerInitialValues : loginInitialValues,
  validationSchema: pathname === '/register' ? registerSchema : loginSchema,
  onSubmit: handleSubmit,
});

  const isNameError = formik.touched.name && formik.errors.name;
  // const isNameCorrect = formik.touched.name && !formik.errors.name;
  const isEmailError = formik.touched.email && formik.errors.email;
  // const isEmailCorrect = formik.touched.email && !formik.errors.email;
  const isPasswordError = formik.touched.password && formik.errors.password;
  // const isPasswordCorrect = formik.touched.password && !formik.errors.password;

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        {pathname === '/register' && (
          <FormControl isRequired isInvalid={isNameError}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter username"
              focusBorderColor="#DD6B20"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>
              You have entered an invalid email or password
            </FormErrorMessage>
          </FormControl>
        )}
        <FormControl isRequired isInvalid={isEmailError}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter email"
            focusBorderColor="#DD6B20"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>
            You have entered an invalid email or password
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={isPasswordError}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              focusBorderColor="#DD6B20"
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            You have entered an invalid email or password
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="orange" type="submit" mt={4}>
          {pathname === '/register' ? 'Register' : 'Login'}
        </Button>
      </form>
    </Container>
  );
};

export default AuthForm;
