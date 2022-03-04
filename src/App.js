import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Profile } from "./pages/profile"
import { SignUp } from "./pages/signup"
import { UserLib } from "./pages/userlib"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LoggedUser } from "./components/LoggedUser"
import { AuthContextComponent } from "./contexts/authContext"

function App() {
  return (
    <div className="">
      <AuthContextComponent>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoggedUser component={Login}/>}/>
          <Route path="/signup" element={<LoggedUser component={SignUp}/>}/>
          <Route path="/profile" element={<ProtectedRoute component={Profile}/>}/>
          <Route path="/userlib" element={<ProtectedRoute component={UserLib}/>}/>
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
