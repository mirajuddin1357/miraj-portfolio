import { useEffect } from 'react';

export function useVisitorTracking() {
  useEffect(() => {
    // Track initial page visit
    const trackVisit = async () => {
      try {
        const response = await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Visit tracked:', data);
        }
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);

  // Track page changes for SPAs
  const trackPageView = async (page: string) => {
    try {
      await fetch('/api/track-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page })
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  return { trackPageView };
}