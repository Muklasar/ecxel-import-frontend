const TrayForm = ({ submitHandler, changeHandler, loading, data, grads }) => {
  const { id, name, display_name, type, grad, limit } = data;
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group text-start">
        <label>Tray Id</label>
        <input
          type="text"
          className="form-control mt-3 mb-3"
          value={id}
          disabled
        />
      </div>
      <div className="form-group text-start">
        <label>Tray Name</label>
        <input
          type="text"
          className="form-control mt-3 mb-3"
          onChange={changeHandler}
          value={name}
          name="name"
          autoFocus
          required
        />
      </div>
      <div className="form-group text-start">
        <label>Tray Display Name</label>
        <input
          type="text"
          className="form-control mt-3 mb-3"
          onChange={changeHandler}
          value={display_name}
          name="display_name"
          required
        />
      </div>
      <div className="form-group text-start">
        <label>Tray Limit</label>
        <input
          type="number"
          className="form-control mt-3 mb-3"
          onChange={changeHandler}
          value={limit}
          name="limit"
          required
        />
      </div>
      <div className="form-group text-start">
        <label>Tray Type</label>
        <select
          className="form-control mb-3 mt-3"
          name="type"
          value={type}
          onChange={changeHandler}
        >
          <option>Please Select</option>
          <option value="ST">ST</option>
          <option value="CT">CT</option>
        </select>
      </div>
      {!type=="" && (
        <div className="form-group text-start">
          <label>Tray Grad</label>
          <select
            className="form-control mb-3 mt-3"
            name="grad"
            value={grad}
            onChange={changeHandler}
          >
            {grad==="" &&
            <option value="">Please Select</option>}
            {grads.length > 0 &&
              grads.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
      )}
      <button
        className="btn btn-outline-primary d-flex align-items-start"
        disabled={loading}
      >
        Save
      </button>
    </form>
  );
};

export default TrayForm;
