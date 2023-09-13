import { useEffect, useState } from "react";
import ExcelImporter from "../../components/excel/ExcelImporter";
import Nav from "../../components/nav";
import { createOrder, getOrder, gradChecker } from "../../functions/order";
import GradTd from "../../components/grad/GradTd";
import { getGrads } from "../../functions/grad";
import { getTrays } from "../../functions/tray";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ImportExcel = () => {
  const [data, setData] = useState([]);
  const [grads, setGrads] = useState([]);
  const [trays, setTrays] = useState([]);
  const [orders, setOrders] = useState([]);
  const [uic, setUic] = useState([]);
  const [orderID, setOrderID] = useState([]);
  const [trackID, setTrackID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dublicate, setDublicate] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGrad();
    loadTray();
    loadOrder();
  }, []);

  // useEffect(() => {
  //   // if (objectsHaveMatchingData(data, orders)) {
  //   //   console.log("The JSON data matches.");
  //   // } else {
  //   //   console.log("The JSON data does not match.");
  //   // }
  //   console.log(objectsHaveMatchingData(data, orders));
  //   const dt = objectsHaveMatchingData(data, orders)
  //   setDublicate(dt);
  // }, [update, data, orders]);

  const objectsHaveMatchingData = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    let message = []
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
        break;
      }
    }
  
    return true;
  }
  

   
  
  
  
  
  // console.log(objectsHaveMatchingData(data, orders))
  // Check if the JSON data matches
  // if (objectsHaveMatchingData(data, orders)) {
  //   console.log("The JSON data matches.");
  //   // setDublicate(true)
  // } else {
  //   console.log("The JSON data does not match.");
  //   // setDublicate(false)
  // }

  const loadTray = () => {
    getTrays().then((res) => {
      const data = res.data;
      const trayIds = data.map((dt) => dt.id);
      setTrays(trayIds);
      console.log("trays", trayIds);
    });
  };

  const loadGrad = () => {
    getGrads().then((res) => {
      const data = res.data;
      const gradvalues = data.map((dt) => dt.name);
      setGrads(gradvalues);
    });
  };

  const loadOrder = () => {
    getOrder().then((res) => {
      const data = res.data;
      const uicArr = data.map((dt) => dt.uic);
      const orderIdArr = data.map((dt) => dt.order_id);
      const trackIdArr = data.map((dt) => dt.tracking_id);
      setUic(uicArr);
      setOrderID(orderIdArr);
      setTrackID(trackIdArr);
      console.log(orderIdArr);
      // const gradvalues = data.map((dt) => dt.name);
      setOrders(data);
    });
  };

  const submitHandler = () => {
    setLoading(true);
    createOrder(data)
      .then((res) => {
        setLoading(false);
        if(res.data.ok==false){
          toast.error(res.data.message);
        }
        toast.success(res.data.message);
        navigate("/dashboard/order");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  };

  const removeHandler = (uic) => {
    const filterData = data.filter((dt) => dt.uic != uic);
    setData(filterData);
    setUpdate(!update);
    toast.success("Data removed");
  };

  console.log("grads", data);
  console.log("orders", orders);
  console.log("dublicate", dublicate);

  return (
    <div className="container-fluid">
      <div className="row text-align-start">
        <div className="col-md-2 pt-5 border">
          <Nav />
        </div>
        <div className="col p-5">
          <h4 className="text-start">Import Excel Data</h4>

          <ExcelImporter data={data} setData={setData} orders={orders} />

          <hr />
          {data.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((dt) => (
                    <th scope="col" key={dt}>
                      {dt.toUpperCase().replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{data.tracking_id}</td> */}
                      {/* <td>{data.order_id}</td> */}
                      <td>
                        {trackID.includes(data.tracking_id) ? (
                          <>
                            {data.tracking_id}{" "}
                            <span className="badge bg-danger ms-2 d-block">
                              Dublicate
                            </span>
                            <span
                              className="badge bg-success ms-2 "
                              style={{ cursor: "pointer" }}
                              onClick={(e) => removeHandler(data.uic)}
                            >
                              Remove
                            </span>
                          </>
                        ) : (
                          <>
                            <span>{data.tracking_id}</span>
                          </>
                        )}
                      </td>
                      <td>
                        {orderID.includes(data.order_id) ? (
                          <>
                            {data.order_id}{" "}
                            <span className="badge bg-danger ms-2 d-block">
                              Dublicate
                            </span>
                            <span
                              className="badge bg-success ms-2 "
                              style={{ cursor: "pointer" }}
                              onClick={(e) => removeHandler(data.uic)}
                            >
                              Remove
                            </span>
                          </>
                        ) : (
                          <>
                            <span>{data.order_id}</span>
                          </>
                        )}
                      </td>
                      {/* <td>{data.uic}</td> */}
                      <td>
                        {uic.includes(data.uic) ? (
                          <>
                            {data.uic}{" "}
                            <span className="badge bg-danger ms-2 d-block">
                              Dublicate
                            </span>
                            <span
                              className="badge bg-success ms-2 "
                              style={{ cursor: "pointer" }}
                              onClick={(e) => removeHandler(data.uic)}
                            >
                              Remove
                            </span>
                          </>
                        ) : (
                          <>
                            <span>{data.uic}</span>
                          </>
                        )}
                      </td>
                      <td>
                        {trays.includes(data.current_tray) ? (
                          <span>{data.current_tray}</span>
                        ) : (
                          <>
                            {data.current_tray}{" "}
                            <span className="badge bg-danger ms-2">
                              Not Exit
                            </span>
                          </>
                        )}
                      </td>
                      <td>
                        {grads.includes(data.grade) ? (
                          <span>{data.grade}</span>
                        ) : (
                          <>
                            {data.grade}{" "}
                            <span className="badge bg-danger ms-2 mt-2">
                              Not Exits
                            </span>
                          </>
                        )}
                      </td>
                      <td>{data.order_date}</td>
                      <td>{data.item_id}</td>
                      <td>{data.imei}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {loading ? (
            <button
              onClick={submitHandler}
              className="btn btn-success w-100 mt-4"
              disabled
            >
              Saving...
            </button>
          ) : 
          dublicate ? (
            <>
              <button className="btn btn-success w-100 mt-4" disabled>
                Please remove dublicate value to save
              </button>
            </>
          ) : (
            <button
              onClick={submitHandler}
              className="btn btn-success w-100 mt-4"
            >
              Save
            </button>
          )}
          {/* {(trackID.includes(data.tracking_id) &&
            orderID.includes(data.order_id) &&
            uic.includes(data.uic)) ? (
              <button
                onClick={submitHandler}
                className="btn btn-success w-100 mt-4"
              >
                Save
              </button>)
              :
              <div>please remove the dublicate key</div>
            } */}
        </div>
      </div>
    </div>
  );
};

export default ImportExcel;
