import React from "react";
import {
  GoogleMap,
  KmlLayer,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useStore } from "../../context/store";

const containerStyle = {
  width: window.innerWidth - 400,
  height: window.innerHeight,
};

const { REACT_APP_GOOGLE_MAPS_API_KEY, REACT_APP_HOST } = process.env;

const libraries = ["places"];

const Map = ({ mapClickHandler, center }) => {
  const { kml } = useStore();
  function handleLoad() {}

  function handlePlacesChanged() {
    // * TODO IMPLEMENT Search Feature
    console.log("handlePlacesChanged");
  }

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
                onClick={() => {}}
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
