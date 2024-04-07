import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import KmlForm from "../KmlForm/Kmlform";
import { useStore } from "../../context/store";

function LeftPane({ dataForm, getValues, setDataForm }) {
  const { selectFolder, updateSelectFolder, updatePreviewFlow, user } =
    useStore();

  return (
    <div className="left-pane">
      {selectFolder && (
        <Alert variant="info">Click On a Folder to Open your Locations</Alert>
      )}
      {dataForm && (
        <KmlForm className="form-container" getValues={getValues}></KmlForm>
      )}

      {
        <div style={{ position: "absolute", bottom: "20px" }}>
          {user === "admin@gmail.com" && (
            <div className="mb-3">
              <Button
                onClick={() => {
                  updatePreviewFlow(true);
                  updateSelectFolder(true);
                }}
              >
                View Existing Labs
              </Button>
            </div>
          )}
          {user === "admin@gmail.com" && (
            <Alert variant="info">
              Right Click on map to create a New Lab location
            </Alert>
          )}
          {user === "user@gmail.com" && (
            <Alert variant="info">All Labs are marked on the map</Alert>
          )}
        </div>
      }
    </div>
  );
}

export default React.memo(LeftPane);
