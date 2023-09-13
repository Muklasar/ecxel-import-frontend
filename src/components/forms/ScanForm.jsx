const ScanForm = ({ grads, trays, data, changeHandler, autoGrad, submitHandler }) => {
  const { tray, grad } = data;
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group text-start">
        <label>Select Grade</label>
        <select
          className="form-control mb-3 mt-3"
          name="grad"
          value={grad}
          onChange={changeHandler}
        >
          <option value="">Please Select</option> 
          {grads.length > 0 &&
            grads.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group text-start">
        <label>Select Tray</label>
        <select
          className="form-control mb-3 mt-3"
          name="tray"
          value={tray}
          onChange={changeHandler}
        >
          <option value="">Please Select</option>
          {trays.length > 0 &&
            trays.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      <button type="submit" class="btn btn-success w-100 mt-3">
        Save
      </button>
    </form>
  );
};

export default ScanForm;
