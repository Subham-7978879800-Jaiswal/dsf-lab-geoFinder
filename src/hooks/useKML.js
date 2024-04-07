import axios from "axios";
import { useStore } from "../context/store";

const useKML = () => {
  const { selectFolder, kml, setKml } = useStore();
  const getAllKmls = async () => {
    const body = {
      query: "kml",
      filter: "sde_items",
    };
    const result = await axios.post(`/rpc.FolderService/Search`, body);
    setKml(result.data.folder_items);
  };

  const setSpecificKML = async (id) => {
    const body = { folderId: id };
    const result = await axios.post(`/rpc.FolderService/Items`, body);

    const kmls = result.data.items.filter(
      (data) => data.name.split(".")[1] === "kml"
    );

    setKml(kmls);
  };

  console.log(kml);

  return { kml, getAllKmls, setSpecificKML, setKml };
};

export default useKML;
