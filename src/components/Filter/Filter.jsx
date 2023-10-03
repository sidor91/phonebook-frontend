// import { FilterLabel, FilterInput, FilterLabelName } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { addFilter } from "@/redux/contacts/slice";
import { Input } from '@chakra-ui/react';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Input
      focusBorderColor="#DD6B20"
      size="sm"
      mb={4}
      placeholder="Find contacts by name"
      type="text"
      name="filter"
      onChange={e => {
        dispatch(addFilter(e.target.value));
      }}
    />
  );
};

export default Filter;
