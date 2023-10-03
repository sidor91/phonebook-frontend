import styled from 'styled-components';
import { Form, Field } from 'formik';


export const FormElement = styled(Form)`
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
display: flex;
font-size: 16px;
max-width: 400px;

`;

export const LabelName = styled.span`
  width: 100px;
  margin-right: 10px;
`;

export const InputField = styled(Field)`
  width: 100%;
`;
export const Submit = styled.button`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  width: 100px;
`;

export const StyledDiv = styled.div`
display: flex;
/* justify-content: right; */
`