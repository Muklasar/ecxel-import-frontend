import { useEffect, useState } from "react";
// import AdminNav from "../../../components/nav/AdminNav"
import { createGrad, deleteGrad, getGrads } from "../../functions/grad";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import GradForm from "../../components/forms/GradFrom";
import Nav from "../../components/nav";

import { getTrays } from "../../functions/tray";
import ScanForm from "../../components/forms/ScanForm";
import { findOrder, updateOrder } from "../../functions/order";
import { readProduct, updateProduct } from "../../functions/product";

const ScanUic = () => {
  const [data, setData] = useState({
    tray: "",
    grad: "",
  });
  const [loading, setLoading] = useState(false);
  const [grads, setGrads] = useState([]);
  const [trays, setTrays] = useState([]);
  const [autoGrad, setAutoGrad] = useState("");
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadgrad();
    loadTray();
  }, []);

  useEffect(() => {
    if (data.tray) {
      const grad = trays.filter((dt) => dt._id == data.tray);
      console.log(grad);
      // console.log(data.t)
      setAutoGrad(grad[0]);
    }
  }, [data.tray]);
  console.log("autoGrad", autoGrad);
  const loadgrad = () => {
    getGrads().then((res) => {
      setGrads(res.data);
      // console.log('categories', res.data)
    });
  };

  const loadTray = () => {
    getTrays().then((res) => {
      setTrays(res.data);
      console.log("trays", res.data);
    });
  };

  const searchProduct = (search) => {
    readProduct(search)
      .then((res) => {
        console.log([res.data]);
        if (res.data) {
          setValue([res.data]);
          setMessage("");
        } else {
          setValue([]);
          setMessage("UIC dose not match");
        }
      })
      .then((err) => console.log(err));
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    searchProduct(search);
    // findOrder(search)
    //   .then((res) => {
    //     console.log(res.data)
    //     if(res.data.order.length > 0){
    //       // searchProduct(search);
    //       setMessage('')
    //       setValue([])
    //     }else{
    //       setMessage('UIC dose not match')
    //     }
    //   })
    //   .then((err) => console.log(err));
  };
  console.log("value", data);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("data", data);

    const matchTray = trays.filter((tr) => tr._id == data.tray)[0];
    const matchGrad = grads.filter((gd) => gd._id == data.grad)[0];

    console.log(matchTray);
    console.log(matchGrad);

    const newVal = value[0];
    const newValue = {
      uic: newVal.uic,
      grade: matchGrad.name,
      tray_id: matchTray.id,
    };
    console.log(newValue);
    
    updateProduct(newValue)
      .then((res) => {
        setLoading(false);
        console.log(res.data)
        searchProduct(search);
        setData({ tray: "", grad: "" });
        toast.success(`Updated`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.data);
      });

    const order = {uic: newValue.uic, grade: data.grad, current_tray: data.tray}
    updateOrder(order)
      .then((res) => {
        setLoading(false);
        console.log(res.data)
        toast.success(`Order Updated`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log("data", data);
  console.log("autoGrad", autoGrad);
  return (
    <div className="container-fluid">
      <div className="row text-align-start">
        <div className="col-md-2 pt-5 border">
          <Nav />
        </div>
        <div className="col p-5">
          <h4 className="text-start">Scan UIC</h4>
          <div className="text-start">
            <form onSubmit={searchHandler}>
              <input type="text" onChange={(e) => setSearch(e.target.value)} />
              <button type="submit">Search</button>
            </form>
            <div>{message}</div>
          </div>
          <div className="row border p-3 mt-4">
            <div className="col-8">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" className="text-start">
                            SR NO
                          </th>
                          <th scope="col">UIC</th>
                          <th scope="col">GRADE</th>
                          <th scope="col">TRAY ID</th>
                          <th scope="col">DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.length > 0 &&
                          value?.map((dt) => {
                            return (
                              <tr key={dt?.sr_no}>
                                <td scope="row" className="text-start">
                                  {dt?.sr_no}
                                </td>
                                <td>{dt?.uic}</td>
                                <td>{dt?.grade}</td>
                                <td>{dt?.tray_id}</td>
                                <td>{dt?.date}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div class="card">
                <div class="card-body">
                  <ScanForm
                    trays={trays}
                    grads={grads}
                    data={data}
                    changeHandler={changeHandler}
                    autoGrad={autoGrad}
                    submitHandler={submitHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanUic;
