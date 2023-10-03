import PropTypes from 'prop-types';
import { Heading, Box } from '@chakra-ui/react';

const Section = ({ title, children }) => (
  <section>
    <Box my={4} textAlign="center">
      {title && (
        <Heading
          my={4}
          as="h2"
          align="center"
          fontSize={{ base: 'md', sm: 'xl' }}
        >
          {title}
        </Heading>
      )}
      {children}
    </Box>
  </section>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
