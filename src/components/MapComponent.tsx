import { useEffect, useState } from "react";
import useLoadGoogleMapsApi from "../hooks/useLoadGoogleMapsApi";

function MapComponent({
  onOriginChange,
  onDestinationChange,
  onDistanceChange,
  getRouteRef,
}) {
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [distance, setDistance] = useState(null);
  const isLoaded = useLoadGoogleMapsApi();

  const fetchSuggestions = async (input) => {
    const apiKey = "AlzaSygSbpL_k-dfXjydkcn1tF4N5tpRTs9w74r";
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(
          input
        )}&offset=3&location=10.8231,106.6297&radius=1000&language=vi&key=${apiKey}`
      );
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e, inputType) => {
    const value = e.target.value;
    if (inputType === "origin") {
      setOrigin(value);
      onOriginChange(value);
    } else {
      setDestination(value);
      onDestinationChange(value);
    }
    setActiveInput(inputType);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(suggestion);
    if (activeInput === "origin") {
      setOrigin(suggestion.description);
      onOriginChange(suggestion.description);
    } else {
      setDestination(suggestion.description);
      onDestinationChange(suggestion.description);
    }
    setSuggestions([]);
    setActiveInput(null);
  };
  // useEffect(() => {
  //   if (isLoaded && window.google) {
  //     initMap();
  //   }
  // }, [isLoaded]);

  // const initMap = () => {
  //   if (!window.google) return;

  //   const newMap = new window.google.maps.Map(document.getElementById("map"), {
  //     center: { lat: 10.8231, lng: 106.6297 },
  //     zoom: 12,
  //   });
  //   const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
  //   newDirectionsRenderer.setMap(newMap);

  //   setMap(newMap);
  //   setDirectionsRenderer(newDirectionsRenderer);
  // };

  const getRoute = () => {
    if (!window.google || !map || !directionsRenderer) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          const routeDistance = result.routes[0].legs[0].distance.text;
          setDistance(routeDistance);
          onDistanceChange(routeDistance);
        } else {
          alert("No route found or error in fetching route.");
        }
      }
    );
  };
  useEffect(() => {
    if (getRouteRef) {
      getRouteRef.current = getRoute;
    }
  }, [map, directionsRenderer, origin, destination, getRouteRef]);
  return (
    <div>
      <div className="space-y-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter origin address"
            value={origin}
            onChange={(e) => handleInputChange(e, "origin")}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {activeInput === "origin" && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter destination address"
            value={destination}
            onChange={(e) => handleInputChange(e, "destination")}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {activeInput === "destination" && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <button
          onClick={getRoute}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
        >
          Get Route
        </button> */}
      </div>
      {distance && (
        <div className="mt-4 text-lg font-semibold">Distance: {distance}</div>
      )}
      {/* <div
        id="map"
        className="rounded-lg shadow-lg"
        style={{ height: "500px", width: "100%" }}
      /> */}
    </div>
  );
}

export default MapComponent;
