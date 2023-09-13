import { useEffect, useState } from "react";
import {
  createTray,
  deleteTray,
  findTrayId,
  getTray,
  getTrays,
  updateTray,
} from "../../functions/tray";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const UpdateTray = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [grads, setGrads] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadTray(id);
      loadgrad();
    }
  }, [id]);

  const loadTray = (id) => {
    getTray(id).then((res) => {
      setData(res.data);
      console.log("Update Category", res);
    });
  };

  const loadgrad = () => {
    getGrads().then((res) => {
      setGrads(res.data);
      // console.log('categories', res.data)
    });
  };
  // const getTrayId = (type) => {
  //   findTrayId(type).then((res) => {
  //     setData({ ...data, type, id: res.data.id });
  //     // console.log('categories', res.data)
  //   });
  // };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    // if (name == "type") {
    //   setData({ ...data, [name]: value });
    //   getTrayId(value);
    // }
    setData({ ...data, [name]: value });
  };
  console.log("data", data);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("name", name);
    setLoading(true);
    updateTray(data)
      .then((res) => {
        setLoading(false);
        // console.log('response', res)
        toast.success(`${res.data.name} is created`);
        navigate("/dashboard/tray-master");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row text-align-start">
        <div className="col-md-2 pt-5 border">
          <Nav />
        </div>
        <div className="col p-5">
          <h4 className="text-start">Update tray</h4>

          <TrayForm
            loading={loading}
            data={data}
            grads={grads}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTray;
