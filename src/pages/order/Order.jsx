import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Nav from "../../components/nav";
import { createOrder, getOrder } from "../../functions/order";

const Order = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = () => {
    getOrder().then((res) => {
      setData(res.data);
    });
  };
console.log('order', data)
  return (
    <div className="container-fluid">
      <div className="row text-align-start">
        <div className="col-md-2 pt-5 border">
          <Nav />
        </div>
        <div className="col p-5">
          <h4 className="text-start">Orders</h4>
          <Link to="/dashboard/import-excel">
            <button className="btn btn-info text-end float-end mb-3 text-bolder">
              Import Excel Data
            </button>
          </Link>

          {/* filter tray component */}

          {/* <hr /> */}

          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">TRACKING ID</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">UIC</th>
                <th scope="col">CURRENT TRAY</th>
                <th scope="col">GRADE</th>
                <th scope="col">ORDER DATE</th>
                <th scope="col">ITEM ID</th>
                <th scope="col">IMEI</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dt) => {
                return (
                  <tr key={dt._id}>
                    <td scope="row" className="text-start">
                      {dt?.tracking_id}
                    </td>
                    <td>{dt?.order_id}</td>
                    <td>{dt?.uic}</td>
                    <td>{dt?.current_tray?.id}</td>
                    <td>{dt?.grade?.name}</td>
                    <td>{dt?.order_date}</td>
                    <td>{dt?.item_id}</td>
                    <td>{dt?.imei}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
