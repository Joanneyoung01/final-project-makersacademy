class MemberAvailabilityTable extends React.Component {
  constructor() {
    super();
    this.state = {
      months: [],
      members: [],
    };
  }

  componentDidMount() {
    fetch(`/availability/availability?role=${this.props.role}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({
          months: result.months,
          members: result.members,
        });
      });
  }

  render() {
    var string = this.props.role.substring(1); //guest or river
    var firstLetter = this.props.role.charAt(0).toUpperCase(); // G or D
    var newString = firstLetter + string + "s"; //  Guest or Driver
    return (
      <div className="members-table shadow-sm p-3 mb-5 bg-white rounded">
        <div className={`member-availability-${this.props.role}`}>
          <div className="row">
            <h3 className="drivers-availability"> {newString} </h3>
          </div>
          <div className="members-table-header row table table-hover">
            <div className="member-name col font-weight-bold">Name</div>
            <div className="col cell font-weight-bold">
              {this.state.months[0]}
            </div>
            <div className="col cell font-weight-bold">
              {this.state.months[1]}
            </div>
            <div className="col cell font-weight-bold">
              {this.state.months[2]}
            </div>
            <div className="col cell font-weight-bold">
              {this.state.months[3]}
            </div>
          </div>

          <div>
            {this.state.members.map((member) => (
              <div className="row">
                <AvailabilityRow
                  driver={member}
                  months={this.state.months}
                  key={member._id}
                  id={member._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
