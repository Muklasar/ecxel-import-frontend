import axios from "axios";

// create product
export const createProduct = async (product) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {},
  });
};

export const readProduct = async (uic) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${uic}`, {
    headers: {},
  });
};

export const updateProduct = async (product) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${product.uic}`,
    product,
    {
      headers: {},
    }
  );
};
