import { useCallback } from "react";
import { kmlGenerator } from "../utils/kmlGenerator";
import useSaveKmlInFolder from "./useSaveKmlInFolder";

const useExportKML = () => {
  const { saveKmlInFolder } = useSaveKmlInFolder();
  const exportKML = useCallback(
    async (placeName, placeDescription, lat, lng, folderId) => {
      const fileName = `${placeName}.kml`;
      const fileData = kmlGenerator(
        fileName,
        placeName,
        placeDescription,
        lat,
        lng
      );
      const blob = new Blob([fileData], { type: "text/kml" });
      const formData = new FormData();
      formData.append("file", blob, fileName);
      await saveKmlInFolder(folderId, formData);
    },
    []
  );

  return { exportKML };
};

export default useExportKML;
