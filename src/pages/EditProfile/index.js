import { FormField } from "../../components/FormField"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/index"
import { AuthContext } from "../../contexts/authContext"
import Swal from 'sweetalert2'
import "./style.css"

export function EditProfile(){

    const {loggedInUser , setLoggedInUser} = useContext(AuthContext)
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
            delete form.passwordConfirm
            const response = await api.patch("/users/profile/update",form)
            const updatedUser = loggedInUser
            updatedUser.user.name = await response.data.name
            updatedUser.user.email = await response.data.email
            await setLoggedInUser(updatedUser)
            localStorage.setItem("loggedInUser", JSON.stringify(updatedUser))
            setLoading(false)
            navigate("/profile")
        } catch (error) {
            Swal.fire({
                title: "Something went wrong!",
                text: '',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
            setLoading(false)
            console.log(error)
        }
    }

    return(
        <div className="hero">
        <section className="container-fluid forms">
        <section className="row justify-content-center">
        <section className="col-12 col-sm6 col-md-3">
            <h1>
                EDIT YOUR PROFILE
            </h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <FormField key="1" type="text" label="Name" name="name" id="signupFormName" readOnly={loading} required={true} value={form.name} onChange={handleChange}/>
                <FormField key="2" type="email" label="E-mail" name="email" id="signupFormEmail" readOnly={loading} required={true} value={form.email} onChange={handleChange} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/>
                <p className="info" key="5" ><br/>Passwords must have at least 6 digits, one letter and one number.</p>
                <FormField key="3" type="password" label="Password" name="password" id="signupFormPassword" readOnly={loading} required={true} value={form.password} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <FormField key="4" type="password" label="Confirm Password" name="passwordConfirm" id="signupFormPasswordConfirm" readOnly={loading} required={true} value={form.passwordConfirm} onChange={handleChange} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
                <p key="6"><br/><button className="btn btn-success" type="submit">Confirm!</button> </p>                
            </form>
        </section>
        </section>
        </section>
        </div>
        
    )
}