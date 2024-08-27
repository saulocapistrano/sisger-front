import React from 'react';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Box>
      <Flex as="nav" bg="teal.500" p={4} color="white">
        <Link as={RouterLink} to="/" mr={4}>Home</Link>
        <Link as={RouterLink} to="/profile" mr={4}>Profile</Link>
        <Link as={RouterLink} to="/settings">Settings</Link>
      </Flex>
      <Box p={5}>
        <Heading>Bem-vindo ao Sistema</Heading>
        <p>Essa é a sua dashboard inicial.</p>
      </Box>
    </Box>
  );
}
