import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const Documentation = () => (
  <Box p={4}>
    <Heading as="h1" mb={4}>InnovatorX Tech Stack Documentation</Heading>
    <VStack spacing={4} align="start">
      <Box>
        <Heading as="h2" size="md">Frontend</Heading>
        <Text>
          <strong>Library:</strong> React<br />
          <strong>Description:</strong> A JavaScript library for building user interfaces.
        </Text>
      </Box>
      <Box>
        <Heading as="h2" size="md">Backend</Heading>
        <Text>
          <strong>Framework:</strong> Node.js<br />
          <strong>Description:</strong> A JavaScript runtime built on Chrome's V8 JavaScript engine.
        </Text>
      </Box>
      <Box>
        <Heading as="h2" size="md">AI Models</Heading>
        <Text>
          <strong>Library:</strong> TensorFlow<br />
          <strong>Description:</strong> An end-to-end open-source platform for machine learning.
        </Text>
      </Box>
    </VStack>
  </Box>
);

export default Documentation;