const GradForm = ({
  submitHandler,
  setName,
  name,
  descriptions,
  setDescriptions,
  loading,
}) => (
  <form onSubmit={submitHandler}>
    <div className="form-group text-start">
      <label>Name</label>
      <input
        type="text"
        className="form-control mt-3 mb-3"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={loading}
        autoFocus
        required
      />
    </div>
    <div className="form-group text-start">
      <label>Descriotions</label>
      <input
        type="text"
        className="form-control mt-3 mb-3"
        onChange={(e) => setDescriptions(e.target.value)}
        value={descriptions}
        disabled={loading}
        required
      />
    </div>
    <button className="btn btn-outline-primary d-flex align-items-start" disabled={loading}>
      Save
    </button>
  </form>
);

export default GradForm;
