import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapComponent from "./components/Map/Map"; // Rename imported component
import SelectFolder from "./components/SelectFolder/SelectFolder";
import useExportKML from "./hooks/useExportKML";
import "./App.css";
import useKML from "./hooks/useKML";
import { useStore } from "./context/store";
import LeftPane from "./components/LeftPane/leftPane";
import AutoHideToast from "./components/AutoHideToast/autoHideToast";
import Login from "./Login";

const center = {
  lat: -3.745,
  lng: -38.523,
};

function App() {
  const [dataForm, setDataForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    selectFolder,
    updateSelectFolder,
    previewFlow,
    updateFolderIdForKmlSave,
  } = useStore();

  const [latLng, setLatLng] = useState({});
  const { kml, setSpecificKML, setKml } = useKML();
  const { exportKML } = useExportKML();
  const { user } = useStore();

  const mapClickHandler = (event) => {
    const { lat, lng } = event.latLng;
    const latitude = lat();
    const longitude = lng();
    setLatLng({ lat: latitude, lng: longitude });
    setDataForm(true);
  };

  useEffect(() => {
    if (user !== "user@gmail.com") {
      return;
    }
    const allKml = [
      {
        id: "603c692c-a2e8-44ba-ab68-148c742b2cb6",
        name: "ndn-ek.kml",
        folder_id: "603c692c-a2e8-44ba-ab68-148c742b2cb6",
        thumbnail_id: "603c692c-a2e8-44ba-ab68-148c742b2cb6",
        width: 0,
        height: 0,
        title: "",
        sort_index: 0,
        kind: "$original",
        mime: "application/vnd.google-earth.kml+xml",
        child_item_kinds: [],
        position_x: 0,
        position_y: 0,
        position_z: 0,
        position_t: "",
        source_item_id: "",
        virtual_id:
          "Session-2023-10-04-09-38-10-ndn-ek-kml-603c692c-a2e8-44ba-ab68-148c742b2cb6",
        created_at: "2023-12-18T06:44:25.349335Z",
      },
      {
        id: "b3ad7a32-d72a-45be-aa21-838c58d5caf0",
        name: "map.kml",
        folder_id: "b3ad7a32-d72a-45be-aa21-838c58d5caf0",
        thumbnail_id: "b3ad7a32-d72a-45be-aa21-838c58d5caf0",
        width: 0,
        height: 0,
        title: "",
        sort_index: 0,
        kind: "$original",
        mime: "application/vnd.google-earth.kml+xml",
        child_item_kinds: [],
        position_x: 0,
        position_y: 0,
        position_z: 0,
        position_t: "",
        source_item_id: "",
        virtual_id:
          "Session-2023-10-04-09-38-10-map-kml-b3ad7a32-d72a-45be-aa21-838c58d5caf0",
        created_at: "2023-12-18T10:40:25.492811Z",
      },
      {
        id: "ed5adb3c-1e49-48ee-be44-b95e4305476b",
        name: "map1.kml",
        folder_id: "ed5adb3c-1e49-48ee-be44-b95e4305476b",
        thumbnail_id: "ed5adb3c-1e49-48ee-be44-b95e4305476b",
        width: 0,
        height: 0,
        title: "",
        sort_index: 0,
        kind: "$original",
        mime: "application/vnd.google-earth.kml+xml",
        child_item_kinds: [],
        position_x: 0,
        position_y: 0,
        position_z: 0,
        position_t: "",
        source_item_id: "",
        virtual_id:
          "Session-2023-10-04-09-38-10-map1-kml-ed5adb3c-1e49-48ee-be44-b95e4305476b",
        created_at: "2023-12-18T10:45:24.844209Z",
      },
      {
        id: "ce706598-8751-49a7-b88c-a16a3bb8297c",
        name: "new-algeria-lab.kml",
        folder_id: "ce706598-8751-49a7-b88c-a16a3bb8297c",
        thumbnail_id: "ce706598-8751-49a7-b88c-a16a3bb8297c",
        width: 0,
        height: 0,
        title: "",
        sort_index: 0,
        kind: "$original",
        mime: "application/vnd.google-earth.kml+xml",
        child_item_kinds: [],
        position_x: 0,
        position_y: 0,
        position_z: 0,
        position_t: "",
        source_item_id: "",
        virtual_id:
          "Session-2023-10-04-09-38-10-new-algeria-lab-kml-ce706598-8751-49a7-b88c-a16a3bb8297c",
        created_at: "2024-04-07T05:43:23.563226Z",
      },
    ];

    setKml(allKml);
  }, [user]);

  const getValues = useCallback(
    async (placeData, placeDescription, folderIdForKmlSave) => {
      await exportKML(
        placeData,
        placeDescription,
        latLng.lng,
        latLng.lat,
        folderIdForKmlSave
      );
      setDataForm(false);
      setSaved(true);
      updateFolderIdForKmlSave("");
      setLatLng({});
    },
    [latLng, exportKML]
  );

  const onFolderSelectForKmlPreview = (data) => {
    setSpecificKML(data.virtual_id);
    updateSelectFolder(false);
  };

  const onFolderSelectForNewKmlSaving = (data) => {
    updateFolderIdForKmlSave(data.id);
    updateSelectFolder(false);
  };

  const onFolderSelect = previewFlow
    ? onFolderSelectForKmlPreview
    : onFolderSelectForNewKmlSaving;

  const MapView = () => {
    return (
      <div className="app-container">
        <LeftPane
          dataForm={dataForm}
          getValues={getValues}
          setDataForm={setDataForm}
        ></LeftPane>
        <div>
          {!selectFolder && (
            <MapComponent // Use imported component here
              kml={kml}
              center={center}
              mapClickHandler={mapClickHandler}
            ></MapComponent>
          )}
          {selectFolder && (
            <SelectFolder onFolderSelect={onFolderSelect}></SelectFolder>
          )}
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <>
      {saved && <AutoHideToast></AutoHideToast>}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/map" element={<MapView />} />
          {/* Use MapView component here */}
        </Routes>
      </Router>
    </>
  );
}

export default React.memo(App);
