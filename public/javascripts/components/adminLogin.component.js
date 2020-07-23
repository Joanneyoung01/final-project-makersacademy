class AdminLogin extends React.Component {
  constructor() {
    const token = sessionStorage.getItem("token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    super();
    this.state = {
      adminName: "",
      password: "",
      loggedIn,
    };
  }

  handleChangeName = (e) => {
    this.setState({
      adminName: e.target.value,
    });
  };
  
  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();
    const admin = {
      adminName: this.state.adminName,
      password: this.state.password,
    };


    fetch("/admin/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          sessionStorage.setItem("token", data.admin._id);
          console.log(sessionStorage);
          window.location.replace("/");
        } else {
          alert(`${data.message}`);
        }
      });
  };

  homeButton = (e) => {
    e.preventDefault();
    window.location.replace("/");
  };

  render() {
    if (this.state.loggedIn === false) {
      return (
        <div className="container col">
          {/* <form id="admin-login-form row" className="login" onSubmit={this.login}>
              <div className="logo">
              <p className="text-center"><img className="container-fluid col-4" src="../../images/logo.svg"></img></p>
              </div>
              <div className="row">
                <label>AdminName:</label>
                <input
                  id="admin"
                  type="text"
                  placeholder="Admin"
                  required
                  onChange={this.handleChangeName}
                  value={this.state.adminName}>
                </input>
              </div>
              <div className="row">
                <label>Password:</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={this.handleChangePassword}
                  value={this.state.password}
                ></input>
                <input type="submit" value="login" id="login"></input>
              </div>
            </form> */}

              <div className="wrap-login100">
                <div className="login100-form-title login-background">
                  <span className="login100-form-title-1">
                  <div className="logo">
                    <p className="text-center"><img className="container-fluid" src="../../images/logo.svg"></img></p>
                    
                  </div>
                  </span>
                </div>

               

                <form id="admin-login-form" className="login100-form validate-form" onSubmit={this.login}>
                  <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                    <span className="label-input100">Username</span>
                    <input
                      id="admin" 
                      className="input100" 
                      type="text" 
                      name="username" 
                      placeholder="Enter username" 
                      onChange={this.handleChangeName}
                    value={this.state.adminName}></input>
                    <span className="focus-input100"></span>
                  </div>

                  <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                    <span className="label-input100">Password</span>
                      <input
                      id="password" 
                      className="input100" 
                      type="password" name="pass" 
                      placeholder="Enter password" 
                      onChange={this.handleChangePassword}
                      value={this.state.password}
                      />
                    <span className="focus-input100"></span>
                  </div>

                  <div className="container-login100-form-btn">
                    <button id="login" className="login100-form-btn">
                      Login
                </button>
                  </div>
                </form>
              </div>
          </div>

      );
    } else {
      return (
        <form onSubmit={this.homeButton}>
          <p>log out first</p>
          <input id="home" className="button" type="submit" value="home"></input>
        </form>
      );
    }
  }
}
