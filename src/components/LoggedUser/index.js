import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/authContext"

export function LoggedUser({ component: Component }) {
  const { loggedInUser } = useContext(AuthContext);

  if (loggedInUser.token) {
    return <Navigate to="/profile" />
  } else {
    return <Component />
  }
}