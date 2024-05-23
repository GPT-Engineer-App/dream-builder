import { Box, Button, Flex, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSubmit = () => {
    // Placeholder for handling user input submission
    setResponse("Thank you for your input! We'll get back to you soon.");
  };

  return (
    <Box>
      <Flex as="nav" bg="blue.800" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="md">InnovatorX</Heading>
        <Flex>
          <Button variant="link" color="white" mr={4}>Home</Button>
          <Button variant="link" color="white" mr={4}>Features</Button>
          <Button variant="link" color="white" mr={4}>About</Button>
          <Button variant="link" color="white">Contact</Button>
        </Flex>
      </Flex>

      <Flex direction="column" align="center" justify="center" p={10} bg="gray.50" minH="80vh">
        <Heading mb={4}>Welcome to InnovatorX</Heading>
        <Text fontSize="lg" mb={6} textAlign="center" maxW="600px">
          InnovatorX is your go-to platform for innovative solutions. Describe your requirements, and we'll help you bring your ideas to life.
        </Text>

        <VStack spacing={4} w="100%" maxW="600px">
          <Textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="Describe your requirements..."
            size="lg"
            bg="white"
          />
          <Button colorScheme="blue" onClick={handleSubmit} rightIcon={<FaPaperPlane />}>
            Submit
          </Button>
          {response && (
            <Text mt={4} color="green.500">
              {response}
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;