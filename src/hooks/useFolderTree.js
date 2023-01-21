import { useState } from "react";
import axios from "axios";
import "react-folder-tree/dist/style.css";


const useFolderTree = () => {
  const [folderTree, setFolderTree] = useState();

  const getFolderTreeServiceCall = async () => {
    const result = await axios.post(`/rpc.FolderService/Tree`, {});
    setFolderTree(result.data);
  };

  return {
    folderTree,
    getFolderTreeServiceCall,
  };
};

export default useFolderTree;