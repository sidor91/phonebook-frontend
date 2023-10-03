import styled from 'styled-components';
import { FcPlus } from 'react-icons/fc';

export const StyledButton = styled.button`
display: inline-flex;
width: fit-content;
border: none;
background-color: white;
cursor: pointer;
`

export const StyledIcon = styled(FcPlus)`
  width: 50px;
  height: 50px;
  margin-left: 10px;
`;

export const Container = styled.div`
display: flex;
align-items: center;
font-size: 24px;
font-weight: 500;
`

