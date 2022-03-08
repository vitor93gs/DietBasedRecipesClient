import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";


export function NavBar(){
    const { loggedInUser } = useContext(AuthContext)
    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(loggedInUser.token)
        if(!(loggedInUser.token==="")){
            setLoginState(true);
        }
    }, [loggedInUser]);

    function handleLogOut() {
        localStorage.removeItem("loggedInUser")
        loggedInUser.token = ""
        setLoginState(false)
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarTogglerDemo01"
            >
              <Link className="navbar-brand" to={loginState ? "/" : "/"}>
                DietBasedRecipes
              </Link>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={loginState ? "/profile" : "/login"}
                  >
                    {loginState ? "Profile" : "Login"}
                  </Link>
                </li>
                <li className="nav-item">
                  {loginState ? (
                    <button
                      type="button"
                      className="btn btn-light btn-outline-info"
                      onClick={handleLogOut}
                    >
                      Sair
                    </button>
                  ) : (
                    <Link className="nav-link" to="/signup">
                      Cadastro
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
}