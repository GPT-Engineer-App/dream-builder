const trackPageView = (page) => {
  console.log(`Page view tracked: ${page}`);
  // Implement actual tracking logic here (e.g., sending data to an analytics service)
};

const trackEvent = (event, data) => {
  console.log(`Event tracked: ${event}`, data);
  // Implement actual tracking logic here (e.g., sending data to an analytics service)
};

export { trackPageView, trackEvent };