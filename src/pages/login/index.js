import { FormField } from "../../components/formField"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/index"
import Swal from 'sweetalert2'

export function Login(){
    const [form, setForm] = useState({email: "" , password: ""})
    const navigate = useNavigate()
    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        try {
            const response = await api.post("/users/login",form)
            console.log(response)
            navigate("/profile")
        } catch (error) {
            Swal.fire({
                title: "Wrong E-mail or password!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
        }
    }

    return(
        <div>
            <h1>
                LOGIN AREA
            </h1>
            <form onSubmit={handleSubmit}>
                <FormField type="email" label="E-mail" name="email" id="signupFormEmail" readOnly={false} required={true} value={form.email} onChange={handleChange}/>
                <FormField type="password" label="Password" name="password" id="signupFormPassword" readOnly={false} required={true} value={form.password} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}