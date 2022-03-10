import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Profile } from "./pages/Profile"
import { SignUp } from "./pages/Signup"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LoggedUser } from "./components/LoggedUser"
import { AuthContextComponent } from "./contexts/authContext"
import { EditProfile } from "./pages/EditProfile"


function App() {
  return (
      <AuthContextComponent>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoggedUser component={Login}/>}/>
          <Route path="/signup" element={<LoggedUser component={SignUp}/>}/>
          <Route path="/profile" element={<ProtectedRoute component={Profile}/>}/>
          <Route path="/editprofile" element={<ProtectedRoute component={EditProfile}/>}/>
        </Routes>
      </AuthContextComponent>
  );
}

export default App;
