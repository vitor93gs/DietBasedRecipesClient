import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/navBar"
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Profile } from "./pages/profile"
import { SignUp } from "./pages/signup"
import { UserLib } from "./pages/userlib"

function App() {
  return (
    <div className="">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/userlib" element={<UserLib/>}/>
      </Routes>
    </div>
  );
}

export default App;
