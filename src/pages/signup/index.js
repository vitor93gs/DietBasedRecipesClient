import { FormField } from "../FormField"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/index"
import Swal from 'sweetalert2'
import "./style.css"



export function SignUp(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({name: "", email: "" , password: "", passwordConfirm:""})

    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
    }
    async function handleSubmit(event){
        event.preventDefault()
        setLoading(true)
        
        if(!(form.password === form.passwordConfirm)){
            Swal.fire({
                title: "Passwords don't match!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
            setLoading(false)
            return
        }        
        try {
            const response = await api.post("/users/signup",form)
            console.log(response)
            setLoading(false)
            navigate("/login")
        } catch (error) {
            Swal.fire({
                title: "E-mail is already in use!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try another e-mail'
            })
            setLoading(false)
            console.log(error.response.data)
        }
    }

    return(
        <div className="hero">
        <section className="container-fluid forms">
        <section className="row justify-content-center">
        <section className="col-12 col-sm6 col-md-3">
            <h1>
                SIGNUP
            </h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <FormField type="text" label="Name" name="name" id="signupFormName" readOnly={loading} required={true} value={form.name} onChange={handleChange}/>
                <FormField type="email" label="E-mail" name="email" id="signupFormEmail" readOnly={loading} required={true} value={form.email} onChange={handleChange} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/>
                <p className="info">Passwords must have at least 6 digits, one letter and one number.</p>
                <FormField type="password" label="Password" name="password" id="signupFormPassword" readOnly={loading} required={true} value={form.password} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <FormField type="password" label="Confirm Password" name="passwordConfirm" id="signupFormPasswordConfirm" readOnly={loading} required={true} value={form.passwordConfirm} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <button type="submit" className="btn btn-success">Register!</button>
            </form>
        </section>
        </section>
        </section>
        </div>
        
    )
}