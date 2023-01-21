import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "./KmlForm.css";
import { useRef } from "react";
import { useStore } from "../../context/store";

const KmlForm = ({ className, getValues }) => {
  const data = useRef();
  const {
    updateSelectFolder,
    folderIdForKmlSave,
    updatePreviewFlow,
    previewFlow,
    updateFolderIdForKmlSave,
  } = useStore();

  const submitHandler = (event) => {
    event.preventDefault();
    const place = data.current[0].value;
    const placeDescription = data.current[1].value;
    getValues(place, placeDescription, folderIdForKmlSave);
    updateFolderIdForKmlSave("");
  };

  const selectFolderClickHandler = () => {
    updatePreviewFlow(false);
    updateSelectFolder(true);
  };

  return (
    <Form className={`${className}`} ref={data} onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label className="color-white">Place Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Place Name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="color-white">Place Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Place Description" />
      </Form.Group>
      <Button variant="primary" onClick={selectFolderClickHandler}>
        Select Folder
      </Button>
      {folderIdForKmlSave && !previewFlow && (
        <div className="mt-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      )}
    </Form>
  );
};

export default React.memo(KmlForm);
