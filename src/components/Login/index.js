import { FormField } from "../../components/FormField"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/index"
import { AuthContext } from "../../contexts/authContext"
import Swal from 'sweetalert2'
import "./style.css"

export function Login(){


    const navigate = useNavigate()
    const {setLoggedInUser} = useContext(AuthContext)

    const [form, setForm] = useState({email: "" , password: ""})
    const [loading, setLoading] = useState(false)
    

    

    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
    }
    
    async function handleSubmit(event){
        event.preventDefault()

        try {
            setLoading(true)

            const response = await api.post("/users/login", form)
            
            setLoggedInUser(response.data)

            localStorage.setItem("loggedInUser", JSON.stringify(response.data))
            
            setLoading(false)

            navigate("/profile")
        } 
        catch (error) {
            console.log(error)

            Swal.fire({
                title: "Wrong E-mail or password!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
            
            setLoading(false)
        }
    }

    return(
        <div className="hero">
        <section className="container-fluid forms">
        <section className="row justify-content-center">
        <section className="col-12 col-sm6 col-md-3">
            <h1>
                LOGIN
            </h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <FormField type="email" label="E-mail" name="email" id="signupFormEmail" readOnly={loading} required={true} value={form.email} onChange={handleChange}/>
                <FormField type="password" label="Password" name="password" id="signupFormPassword" readOnly={loading} required={true} value={form.password} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <button type="submit" className="btn btn-success">Login</button>
            </form>   
        </section>
        </section>
        </section>
        </div>
    )
}