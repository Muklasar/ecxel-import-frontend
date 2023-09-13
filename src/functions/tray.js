import axios from "axios";

// get list of categories
export const getTrays = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/trays`);
};

// get a single tray
export const getTray = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/trays/${id}`);
};

// create tray
export const createTray = async (tray, token) => {
  console.log("trayAxios", tray);
  return await axios.post(`${process.env.REACT_APP_API}/tray/`, tray, {
    headers: {
    
    },
  });
};

// update tray
export const updateTray = async (tray) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/tray/${tray.id}`,
    tray,
    {
      headers: {
    
      },
    }
  );
};

// delete tray
export const deleteTray = async (id) => {
  // console.log("deletetoken", token);
  return await axios.delete(`${process.env.REACT_APP_API}/tray/${id}`, {
    headers: {
    },
  });
};

export const findTrayId = async (type) => {
  // console.log("deletetoken", token);
  return await axios.get(`${process.env.REACT_APP_API}/find-trays-id/${type}`, {
    headers: {
    },
  });
};