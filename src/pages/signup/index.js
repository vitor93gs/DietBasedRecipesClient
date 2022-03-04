import { FormField } from "../../components/FormField"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/index"
import Swal from 'sweetalert2'



export function SignUp(){
    const navigate = useNavigate()

    const [form, setForm] = useState({name: "", email: "" , password: "", passwordConfirm:""})

    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
    }
    async function handleSubmit(event){
        event.preventDefault()
        
        if(!(form.password === form.passwordConfirm)){
            Swal.fire({
                title: "Passwords don't match!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
            return
        }        
        try {
            const response = await api.post("/users/signup",form)
            console.log(response)
            navigate("/login")
        } catch (error) {
            Swal.fire({
                title: "E-mail is already in use!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try another e-mail'
            })
            console.log(error.response.data)
        }
    }

    return(
        <div>
        <h1>
            SIGNUP
        </h1>
            <form onSubmit={handleSubmit}>
                <FormField type="text" label="Name" name="name" id="signupFormName" readOnly={false} required={true} value={form.name} onChange={handleChange}/>
                <FormField type="email" label="E-mail" name="email" id="signupFormEmail" readOnly={false} required={true} value={form.email} onChange={handleChange} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/>
                <p>Passwords must have at least 6 digits, one letter and one number.</p>
                <FormField type="password" label="Password" name="password" id="signupFormPassword" readOnly={false} required={true} value={form.password} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <FormField type="password" label="Confirm Password" name="passwordConfirm" id="signupFormPasswordConfirm" readOnly={false} required={true} value={form.passwordConfirm} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <button type="submit">Register!</button>
            </form>
        </div>
        
    )
}