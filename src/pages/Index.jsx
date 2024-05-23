import { Box, Button, Flex, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { create, generateCodeSnippet, detectErrors, correctErrors } from 'lib/openai';
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { TreeNode, depthFirstSearch, breadthFirstSearch } from '../utils/treeSearch';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState([]);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [errorDetection, setErrorDetection] = useState("");
  const [correctedCode, setCorrectedCode] = useState("");

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

    // Generate code snippet
    const codeResponse = await generateCodeSnippet({
      messages: updatedConversation,
      model: 'code-davinci-002' // Example model for code generation
    });

    const generatedCode = codeResponse.choices[0].text;
    setCodeSnippet(generatedCode);

    // Detect errors in the generated code
    const errorResponse = await detectErrors(generatedCode);
    setErrorDetection(errorResponse.choices[0].message.content);

    // Correct errors in the generated code
    const correctionResponse = await correctErrors(generatedCode);
    setCorrectedCode(correctionResponse.choices[0].message.content);
  };

  // Example usage of tree-search algorithms
  const exampleTreeSearch = () => {
    const root = new TreeNode('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    const grandChild1 = new TreeNode('GrandChild 1');
    const grandChild2 = new TreeNode('GrandChild 2');

    root.addChild(child1);
    root.addChild(child2);
    child1.addChild(grandChild1);
    child2.addChild(grandChild2);

    console.log('DFS Traversal:');
    depthFirstSearch(root, value => console.log(value));

    console.log('BFS Traversal:');
    breadthFirstSearch(root, value => console.log(value));
  };

  exampleTreeSearch();

  return (
    <Box>
      <Flex as="nav" bg="blue.800" color="white" p={4} justifyContent="space-between" alignItems="center" wrap="wrap" direction={{ base: "column", md: "row" }}>
        <Heading size="md">InnovatorX</Heading>
        <Flex>
          <Button variant="link" color="white" mr={4}>Home</Button>
          <Button variant="link" color="white" mr={4}>Features</Button>
          <Button variant="link" color="white" mr={4}>About</Button>
          <Button variant="link" color="white" as={Link} to="/documentation">Documentation</Button> {/* Add Documentation link */}
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
          {codeSnippet && (
            <Box mt={4} p={4} bg="gray.100" borderRadius="md" w="100%">
              <Heading size="sm" mb={2}>Generated Code Snippet:</Heading>
              <Text fontFamily="monospace" whiteSpace="pre-wrap">{codeSnippet}</Text>
            </Box>
          )}
          {errorDetection && (
            <Box mt={4} p={4} bg="red.100" borderRadius="md" w="100%">
              <Heading size="sm" mb={2}>Detected Errors:</Heading>
              <Text fontFamily="monospace" whiteSpace="pre-wrap">{errorDetection}</Text>
            </Box>
          )}
          {correctedCode && (
            <Box mt={4} p={4} bg="green.100" borderRadius="md" w="100%">
              <Heading size="sm" mb={2}>Corrected Code Snippet:</Heading>
              <Text fontFamily="monospace" whiteSpace="pre-wrap">{correctedCode}</Text>
            </Box>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;