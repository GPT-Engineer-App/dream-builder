import React, { Component } from 'react';
import { Box, Heading, Text, Button } from "@chakra-ui/react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box p={4}>
          <Heading as="h1" mb={4}>Something went wrong.</Heading>
          <Text>{this.state.error && this.state.error.toString()}</Text>
          <Text>{this.state.errorInfo && this.state.errorInfo.componentStack}</Text>
        <Button mt={4} colorScheme="teal" onClick={this.handleReload}>Reload Page</Button>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;