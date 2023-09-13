import axios from "axios";

// get list of categories
export const getGrads = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/grads`);
};

// get a single grad
export const getGrad = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/grads/${slug}`);
};

// create grad
export const createGrad = async (grad, token) => {
  console.log("gradAxios", grad);
  return await axios.post(`${process.env.REACT_APP_API}/grad/`, grad, {
    headers: {
    
    },
  });
};

// update grad
export const updateGrad = async (slug, grad, token) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/grad/${slug}`,
    grad,
    {
      headers: {
    
      },
    }
  );
};

// delete grad
export const deleteGrad = async (slug, token) => {
  console.log("deletetoken", token);
  return await axios.delete(`${process.env.REACT_APP_API}/grad/${slug}`, {
    headers: {
    },
  });
};

// export const getgradSubs = async (_id) => {
//   return await axios.get(`${process.env.REACT_APP_API}/grad/sub/${_id}`);
// };
