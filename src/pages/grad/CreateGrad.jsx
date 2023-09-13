import { useEffect, useState } from "react";
// import AdminNav from "../../../components/nav/AdminNav"
import { createGrad, deleteGrad, getGrads } from "../../functions/grad";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import GradForm from "../../components/forms/GradFrom";
import Nav from "../../components/nav";
import dateFormatter from "../../components/function/dateFormater";

const CreateGrad = () => {
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [grads, setGrads] = useState([]);

  useEffect(() => {
    loadgrad();
  }, []);

  const loadgrad = () => {
    getGrads().then((res) => {
      setGrads(res.data);
      // console.log('categories', res.data)
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("name", name);
    setLoading(true);
    createGrad({ name, descriptions })
      .then((res) => {
        setLoading(false);
        // console.log('response', res)
        toast.success(`${res.data.name} is created`);
        setName("");
        setDescriptions("");
        loadgrad();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const deleteHandler = (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);

      deleteGrad(slug)
        .then((res) => {
          setLoading(false);
          // console.log('delete-res', res.data)
          toast.success(`${res.data.name} is deleted`);
          loadgrad();
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
          <h4 className="text-start">Create Grad</h4>

          <GradForm
            loading={loading}
            name={name}
            setName={setName}
            descriptions={descriptions}
            setDescriptions={setDescriptions}
            submitHandler={submitHandler}
          />

          {/* filter grad component */}

          <hr />

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Descriptions</th>
                <th scope="col">Creation Data</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {grads.map((grad) => (
                <tr key={grad.id}>
                  <td>{grad.name}</td>
                  <td>{grad.descriptions}</td>
                  <td>{dateFormatter(grad?.createdAt)}</td>
                  <td>
                    <div className="">
                      <span
                        className="btn btn-sm float-end btn-danger d-flex align-item-center"
                        onClick={() => deleteHandler(grad.slug)}
                      >
                        <DeleteOutlined />
                      </span>
                      <Link
                        to={`/dashboard/grad-master/${grad.slug}`}
                        className="btn btn-sm float-end btn-primary me-2 d-flex align-item-center"
                      >
                        <EditOutlined />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {grads.map((grad) => (
            <div className="alert alert-primary" key={grad.slug}>
              {grad.name}
              <span
                className="btn btn-sm float-end btn-danger d-flex align-item-center"
                onClick={() => deleteHandler(grad.slug)}
              >
                <DeleteOutlined />
              </span>
              <Link
                to={`/dashboard/grad-master/${grad.slug}`}
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

export default CreateGrad;
