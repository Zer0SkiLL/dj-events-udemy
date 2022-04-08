import { React, useState, useEffect } from 'react';
import Image from 'next/image';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';

export default function EventMap({ evt }) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        longitude: 8.55,
        latitude: 47.36667,
        zoom: 12,
    });

    // run as soon as the page loads (useEffect)
    useEffect(() => {
        // Get latitude & longitude from address.
        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setViewport({ ...viewport, latitude: lat, longitude: lng });
                setLoading(false);
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    if (loading) {
        return false;
    }

    return (
        <Map
            reuseMaps
            initialViewState={viewport}
            style={{ width: 800, height: 600 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            onViewportChange={(vp) => setViewport(vp)}
        >
            <Marker key={evt.id} longitude={lng} latitude={lat} color="red">
                <Image src="/images/pin.svg" width={30} height={30}></Image>
            </Marker>
        </Map>
    );
}
