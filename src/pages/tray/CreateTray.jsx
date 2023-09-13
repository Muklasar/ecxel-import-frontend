import { useEffect, useState } from "react";
import {
  createTray,
  deleteTray,
  findTrayId,
  getTrays,
} from "../../functions/tray";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Nav from "../../components/nav";
import TrayForm from "../../components/forms/TrayForm";
import { getGrads } from "../../functions/grad";
import dateFormatter from "../../components/function/dateFormater";

const initialState = {
  id: "",
  name: "",
  display_name: "",
  type: "",
  limit: "",
  grad: "",
};

const CreateTray = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [trays, setTrays] = useState([]);
  const [grads, setGrads] = useState([]);

  useEffect(() => {
    loadTray();
    loadgrad();
  }, []);

  const loadTray = () => {
    getTrays().then((res) => {
      setTrays(res.data);
      console.log("trays", res.data);
    });
  };

  const loadgrad = () => {
    getGrads().then((res) => {
      setGrads(res.data);
      // console.log('categories', res.data)
    });
  };
  const getTrayId = (type) => {
    findTrayId(type).then((res) => {
      setData({ ...data, type, id: res.data.id });
      // console.log('categories', res.data)
    });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name == "type") {
      setData({ ...data, [name]: value });
      getTrayId(value);
    }
    setData({ ...data, [name]: value });
  };
  console.log("data", data);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("name", name);
    setLoading(true);
    createTray(data)
      .then((res) => {
        setLoading(false);
        // console.log('response', res)
        toast.success(`${res.data.name} is created`);
        setData(initialState);
        loadTray();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const deleteHandler = (id) => {
    if (window.confirm("Delete?")) {
      setLoading(true);

      deleteTray(id)
        .then((res) => {
          setLoading(false);
          // console.log('delete-res', res.data)
          toast.success(`${res.data.name} is deleted`);
          loadTray();
        })
        .catch((err) => {
          // console.log(err.response.data)
          setLoading(false);
          toast.error(`Deleted failed`);
        });
    }
  };

  // const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid">
      <div className="row text-align-start">
        <div className="col-md-2 pt-5 border">
          <Nav />
        </div>
        <div className="col p-5">
          <h4 className="text-start">Create tray</h4>

          <TrayForm
            loading={loading}
            data={data}
            grads={grads}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
          />

          {/* filter tray component */}

          <hr />

          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-start">
                  Tray id
                </th>
                <th scope="col">Tray  Name</th>
                <th scope="col"> Tray Display Name</th>
                <th scope="col">Tray Type</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Tray Limit</th>
                <th scope="col">Tray Grad</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trays.map((tray) => {
                return (
                  <tr key={tray._id}>
                    <th scope="row" className="text-start">
                      {tray?.id}
                    </th>
                    <td>{tray?.name}</td>
                    <td>{tray?.display_name}</td>
                    <td>{tray?.type}</td>
                    <td>{dateFormatter(tray?.createdAt)}</td>
                    <td>{tray?.limit}</td>
                    <td>{tray?.grad?.name}</td>
                    <td>
                      <div className="">
                        <span
                          className="btn btn-sm float-end btn-danger d-flex align-item-center"
                          onClick={() => deleteHandler(tray.id)}
                        >
                          <DeleteOutlined />
                        </span>
                        <Link
                          to={`/dashboard/tray-master/${tray.id}`}
                          className="btn btn-sm float-end btn-primary me-2 d-flex align-item-center"
                        >
                          <EditOutlined />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* {trays.map((tray) => (
            <div className="alert alert-primary" key={tray.slug}>
              {tray.name}
              <span
                className="btn btn-sm float-end btn-danger d-flex align-item-center"
                onClick={() => deleteHandler(tray.slug)}
              >
                <DeleteOutlined />
              </span>
              <Link
                to={`/dashboard/tray-master/${tray.slug}`}
                className="btn btn-sm float-end btn-primary me-2 d-flex align-item-center"
              >
                <EditOutlined />
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CreateTray;
