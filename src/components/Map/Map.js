import React, { useState } from "react";
import {
  GoogleMap,
  KmlLayer,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useStore } from "../../context/store";

const containerStyle = {
  width: window.innerWidth - 400,
  height: window.innerHeight,
};

const { REACT_APP_GOOGLE_MAPS_API_KEY, REACT_APP_HOST } = process.env;

const libraries = ["places"];

const Map = ({ mapClickHandler, center }) => {
  const [directions, setDirections] = useState(null);
  const { kml } = useStore();
  function handleLoad() {}

  function handlePlacesChanged() {
    // * TODO IMPLEMENT Search Feature
    console.log("handlePlacesChanged");
  }

  const directionsCallback = (response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    } else {
      console.log("Error fetching directions");
    }
  };

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        onRightClick={mapClickHandler}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
      >
        <StandaloneSearchBox
          onLoad={handleLoad}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
        {kml.length > 0 &&
          kml.map((kml, index) => {
            return (
              <KmlLayer
                onClick={(event) => {
                  const url = `https://www.google.com/maps?q=${event.latLng.lat()},${event.latLng.lng()}`;

                  // Open the URL in a new tab
                  window.open(url, "_blank");
                }}
                key={index}
                url={`${REACT_APP_HOST}/api/image/${kml.id}/download`}
              />
            );
          })}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
