class AvailabilityCell extends React.Component {
  constructor() {
    super();
    this.state = {
      driver_id: "",
      month: "",
      optionTrue: "",
      optionFalse: "",
      optionTBD: "",
    };
  }

  updateAvailability = (event) => {
    console.log(event.target);
    this.changeColor()

    let updateMember = {
      driver_id: this.props.driver_id,
      month_name: this.props.monthName,
      month_status: event.target.value,
    };

    fetch("/availability/update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateMember),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        
      });
  };

  changeColor = () => {
    if (event.target.value === "false") {
      event.target.style.backgroundColor = "#db2a38";
    } else if (event.target.value === "true") {
      event.target.style.backgroundColor = "#2cdb9b";
    } else {
      event.target.style.backgroundColor = "#f09b41";
    }
  };
  

  render() {
    return (

      <div className="avail-cell">


        <select
          id="coloured-cell"
          className="select-availability col custom-select"
          onChange={this.updateAvailability}
        >
          <option
            value="true"
            selected={this.props.month == "true"}
          >
            True
          </option>
          <option
            value="false"
            selected={this.props.month == "false"}
          >
            False
          </option>
          <option
            value="tbd"
            selected={this.props.month == "undecided"}
          >
            TBD
          </option>
        </select>  
      </div>
    );
  }
}
