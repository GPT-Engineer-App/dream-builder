import { Box, Button, Flex, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { create } from 'lib/openai';
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSubmit = async () => {
    const newMessage = { role: 'user', content: userInput };
    const updatedConversation = [...conversation, newMessage];
    setConversation(updatedConversation);
    setUserInput("");

    const response = await create({
      messages: updatedConversation,
      model: 'gpt-3.5-turbo'
    });

    const botMessage = { role: 'assistant', content: response.choices[0].message.content };
    setConversation([...updatedConversation, botMessage]);
    setResponse(response.choices[0].message.content);
  };

  return (
    <Box>
      <Flex as="nav" bg="blue.800" color="white" p={4} justifyContent="space-between" alignItems="center" wrap="wrap" direction={{ base: "column", md: "row" }}>
        <Heading size="md">InnovatorX</Heading>
        <Flex>
          <Button variant="link" color="white" mr={4}>Home</Button>
          <Button variant="link" color="white" mr={4}>Features</Button>
          <Button variant="link" color="white" mr={4}>About</Button>
          <Button variant="link" color="white">Contact</Button>
        </Flex>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} align={{ base: "stretch", md: "center" }} justify="center" p={{ base: 4, md: 10 }} bg="gray.50" minH="80vh">
        <Heading mb={4}>Welcome to InnovatorX</Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} mb={6} textAlign="center" maxW="600px">
          InnovatorX is your go-to platform for innovative solutions. Describe your requirements, and we'll help you bring your ideas to life.
        </Text>

        <VStack spacing={4} w="100%" maxW={{ base: "100%", md: "600px" }}>
          <Box w="100%" bg="white" p={4} borderRadius="md" boxShadow="md">
            {conversation.map((msg, index) => (
              <Text key={index} alignSelf={msg.role === 'user' ? 'flex-start' : 'flex-end'} color={msg.role === 'user' ? 'blue.500' : 'green.500'}>
                {msg.content}
              </Text>
            ))}
          </Box>
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