import React, { useContext, useState } from "react";

const Store = React.createContext({
  selectfolder: false,
});

const StoreProvider = ({ children }) => {
  const [selectFolder, setSelectFolder] = useState(false);
  const [folderIdForKmlSave, setFolderIdForKmlSave] = useState();
  const [previewFlow, setPreviewFlow] = useState(false);

  const updateSelectFolder = (data) => {
    setSelectFolder(data);
  };
  const updateFolderIdForKmlSave = (data) => {
    setFolderIdForKmlSave(data);
  };

  const updatePreviewFlow = (data) => {
    setPreviewFlow(data);
  };

  return (
    <Store.Provider
      value={{
        selectFolder,
        folderIdForKmlSave,
        previewFlow,
        updateSelectFolder,
        updateFolderIdForKmlSave,
        updatePreviewFlow,
      }}
    >
      {children}
    </Store.Provider>
  );
};

const useStore = () => {
  return useContext(Store);
};

export { useStore, StoreProvider };
