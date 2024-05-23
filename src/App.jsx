import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AnalyticsProvider from "./components/AnalyticsProvider.jsx"; // Import the AnalyticsProvider component
import Documentation from "./pages/Documentation.jsx"; // Import the new Documentation page
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Import the ErrorBoundary component
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"; // Import ChakraProvider, extendTheme, and ColorModeScript

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function App() {
  return (
    <ErrorBoundary> {/* Wrap the application with ErrorBoundary */}
      <AnalyticsProvider> {/* Wrap the application with AnalyticsProvider */}
        <ChakraProvider theme={theme}> {/* Wrap the application with ChakraProvider */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} /> {/* Add ColorModeScript */}
          <Router>
            <Routes>
              <Route exact path="/" element={<Index />} />
              <Route path="/documentation" element={<Documentation />} /> {/* Add route for Documentation */}
            </Routes>
          </Router>
        </ChakraProvider>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}

export default App;