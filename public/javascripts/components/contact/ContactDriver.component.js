function Driver(props) {
  var buttonId = "delete-btn-" + props.index + 1
  return (
    <form
      className="col"
      className="delete-button"
      data-id={props.id}
      onSubmit={props.deleteMember}
    >
      <div className="driver-component row driver">
        <div className="driver-index col-2">{props.index + 1}</div>
        <div className="driverName col">{props.name}</div>
        <div className="driverAddress col">{props.address}</div>
        <div className="driverTel col">{props.telephone}</div>
        <input
          id={buttonId}
          type="submit"
          value="Delete"
        ></input>
      </div>
    </form>
  );
}