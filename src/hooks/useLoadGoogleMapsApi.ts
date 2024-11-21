import { useState, useEffect } from "react";

const useLoadGoogleMapsApi = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSygSbpL_k-dfXjydkcn1tF4N5tpRTs9w74r`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        setIsLoaded(true);
      });
      document.body.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  return isLoaded;
};

export default useLoadGoogleMapsApi;
