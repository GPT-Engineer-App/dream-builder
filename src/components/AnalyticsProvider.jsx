import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackEvent } from "../utils/analytics";

const AnalyticsProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return children;
};

export default AnalyticsProvider;