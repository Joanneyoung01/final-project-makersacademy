function MemberList(props) {
  var string = props.role.substring(1); //guest or river
  var firstLetter = props.role.charAt(0).toUpperCase(); // G or D
  var newString = firstLetter + string + "s"; //  Guest or Driver
  console.log(newString)
  return (
    <div className="List">
      <h2>{newString}</h2>
      <div className={props.role + "-list"}>
        <div className="container">
          <div className="headers row">
            <div className="name col-2">{newString.substring(0, newString.length - 1) + "-no:"}</div>
            <div className="name col">Name</div>
            <div className="name col">Address</div>
            <div className="name col">Telephone</div>
            <div className="name col-1"></div>
          </div>
        </div>

        {props.members.map((member, index) => (
            <Member
            name={member.name}
            address={member.address}
            telephone={member.telephone}
            role={props.role}
            index={index}
            id={member._id}
            key={member._id}
            deleteMember={props.deleteMember}
          />
        ))}
      </div>
    </div>
  );
}
