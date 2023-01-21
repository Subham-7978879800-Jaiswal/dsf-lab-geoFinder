import axios from "axios";

const useSaveKmlInFolder = () => {
  const saveKmlInFolder = async (folderId, file) => {
    await axios.post(`api/folder/${folderId}/file`, file, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  };

  return { saveKmlInFolder };
};

export default useSaveKmlInFolder;
