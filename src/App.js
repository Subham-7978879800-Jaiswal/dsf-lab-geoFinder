import React, { useState, useCallback } from "react";

import Map from "./components/Map/Map";
import SelectFolder from "./components/SelectFolder/SelectFolder";

import useExportKML from "./hooks/useExportKML";

import "./App.css";

import useKML from "./hooks/useKML";
import { useStore } from "./context/store";
import LeftPane from "./components/LeftPane/leftPane";
import AutoHideToast from "./components/AutoHideToast/autoHideToast";

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
  const { kml, setSpecificKML } = useKML();
  const { exportKML } = useExportKML();

  const mapClickHandler = (event) => {
    const { lat, lng } = event.latLng;
    const latitude = lat();
    const longitude = lng();
    setLatLng({ lat: latitude, lng: longitude });
    setDataForm(true);
  };

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

  return (
    <>
      {saved && <AutoHideToast></AutoHideToast>}
      <div className="app-container">
        <LeftPane
          dataForm={dataForm}
          getValues={getValues}
          setDataForm={setDataForm}
        ></LeftPane>
        <div>
          {!selectFolder && (
            <Map
              kml={kml}
              center={center}
              mapClickHandler={mapClickHandler}
            ></Map>
          )}
          {selectFolder && (
            <SelectFolder onFolderSelect={onFolderSelect}></SelectFolder>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(App);
