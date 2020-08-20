class ReactApp extends React.Component {
  
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem("token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      home: true,
      pairs: false,
      contact: false,
    };
  }

  showHome = (e) => {
    e.preventDefault();
    this.setState({
      home: true,
      pairs: false,
      contact: false,
    });
    this.changeTabColour("home-tab", "pairs-tab", "contact-tab");
    var x = document.getElementById("map-canvas");
    x.style.display = "none";
  };

  showPairs = (e) => {
    e.preventDefault();
    this.setState({
      home: false,
      pairs: true,
      contact: false,
    });
    this.changeTabColour("pairs-tab", "home-tab", "contact-tab");
  };

  showContact = (e) => {
    e.preventDefault();
    this.setState({
      home: false,
      pairs: false,
      contact: true,
    });
    this.changeTabColour("contact-tab", "pairs-tab", "home-tab");
    var x = document.getElementById("map-canvas");
    x.style.display = "none";
  };

  changeTabColour = (active, inactive1, inactive2) => {
    document.getElementById(active).setAttribute("class", "col tab-selector active");
    document.getElementById(inactive1).setAttribute("class", "col tab-selector");
    document.getElementById(inactive2).setAttribute("class", "col tab-selector");
  };

  render() {
    console.log(this.state)
    if (!this.state.loggedIn) {
      return (
        <form action="admin/login">
          {window.location.replace("admin/login")}
        </form>
      );
    } else {
      return (
        <div className="container">
          <div className="main-app container margin-top bg-white shadow p-3 mb-5 bg-white rounded">
            <Header />

            <section className="tabs row container">

              <input onClick={this.showHome} id="home-tab" type="radio" name="radio-set" className="tab-selector-1 tab-selector active" />
              <label htmlFor="home-tab" id="tab-label-1" className="tab-label-1">Home</label>

              <input onClick={this.showPairs}  id="pairs-tab" type="radio" name="radio-set" className="tab-selector-2 tab-selector" />
              <label htmlFor="pairs-tab" id="tab-label-2" className="tab-label-2">Pairs</label>

              <input onClick={this.showContact} id="contact-tab"  type="radio" name="radio-set" className="tab-selector-3 tab-selector" />
              <label  htmlFor="contact-tab" id="tab-label-3" className="tab-label-3">Contact</label>

             <div className="clear-shadow"></div>
             </section>
              
              {(() => {
                if (this.state.home) {
                  return (
                  <AvailabilityTables />
                );
              }

              if (this.state.pairs) {
                return <Pairing />;
              }

              if (this.state.contact) {
                  return (
                    <Contact />
                  );
                }
              })()}
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<ReactApp />, document.getElementById("root"));
