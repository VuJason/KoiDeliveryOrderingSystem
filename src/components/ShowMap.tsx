import { useEffect, useState } from 'react';
import useLoadGoogleMapsApi from '../hooks/useLoadGoogleMapsApi';

function ShowMap({ origin, destination }) {
    const [map, setMap] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [distance, setDistance] = useState(null);
    const isLoaded = useLoadGoogleMapsApi();

    useEffect(() => {
        if (isLoaded && window.google) {
            initMap();
        }
    }, [isLoaded]);

    useEffect(() => {
        if (origin && destination && map && directionsRenderer) {
            getRoute();
        }
    }, [origin, destination, map, directionsRenderer]);

    const initMap = () => {
        if (!window.google) return;

        const newMap = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 10.8231, lng: 106.6297 },
            zoom: 12,
        });
        const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
        newDirectionsRenderer.setMap(newMap);

        setMap(newMap);
        setDirectionsRenderer(newDirectionsRenderer);
    };

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
                }
            }
        );
    };

    return (
        <div>
            {distance && (
                <div className="mt-4 text-lg font-semibold">
                    Distance: {distance}
                </div>
            )}
            <div
                id="map"
                className="rounded-lg shadow-lg"
                style={{ height: '500px', width: '100%' }}
            />
        </div>
    );
}

export default ShowMap;
