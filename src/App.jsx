import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AnalyticsProvider from "./components/AnalyticsProvider.jsx"; // Import the AnalyticsProvider component
import Documentation from "./pages/Documentation.jsx"; // Import the new Documentation page
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Import the ErrorBoundary component

function App() {
  return (
    <ErrorBoundary> {/* Wrap the application with ErrorBoundary */}
      <AnalyticsProvider> {/* Wrap the application with AnalyticsProvider */}
        <Router>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/documentation" element={<Documentation />} /> {/* Add route for Documentation */}
          </Routes>
        </Router>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}

export default App;