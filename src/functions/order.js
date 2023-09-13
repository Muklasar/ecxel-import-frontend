import axios from "axios";

// get list of categories
export const getOrder = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/orders`);
};

// get a single tray
export const getTray = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/trays/${id}`);
};

// create tray
export const createOrder = async (order) => {
  return await axios.post(`${process.env.REACT_APP_API}/order/`, order, {
    headers: {},
  });
};

// update tray
export const updateOrder = async (order) => {
  return await axios.put(`${process.env.REACT_APP_API}/order/${order.uic}`, order, {
    headers: {},
  });
};

// delete tray
export const deleteTray = async (id) => {
  // console.log("deletetoken", token);
  return await axios.delete(`${process.env.REACT_APP_API}/tray/${id}`, {
    headers: {},
  });
};

export const findTrayId = async (type) => {
  // console.log("deletetoken", token);
  return await axios.get(`${process.env.REACT_APP_API}/find-trays-id/${type}`, {
    headers: {},
  });
};

export const gradChecker = async (grade) => {
  return await axios.get(`${process.env.REACT_APP_API}/orders/${grade}`);
};

export const trayChecker = async (current_tray) => {
  return await axios.get(`${process.env.REACT_APP_API}/orders/${current_tray}`);
};

export const findOrder = async (uic) => {
  return await axios.get(`${process.env.REACT_APP_API}/order-by/${uic}`);
};
