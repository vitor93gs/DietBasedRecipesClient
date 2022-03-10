import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/authContext"
import { api } from "../../api"
import { PresentRecipe } from "../../components/PresentRecipe"
import "./style.css"




export  function Profile(){

    const navigate = useNavigate()

    const { loggedInUser } = useContext(AuthContext)
    const [ response , setResponse ] = useState({data:{favoriteRecipes:[]}})

    async function getInfo(){
        setResponse(await api.get("/users/profile"))
    }
    
    useEffect(() => {
        getInfo()
    },[])

    async function handleClick(id){
        try {
            const response = await api.patch(`recipes/deleteFavorite/${id}`)
            console.log(response)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    function handleShow(cur){
        return(PresentRecipe(cur.name, cur.ingredients, cur.instructions))
    }
    if (loggedInUser.token) {
        return(
            <section className="hero_1">
                <div className="container">
                    <h1>
                    Welcome back {loggedInUser.user.name}!
                    </h1>
                    <div className="row">
                        <div className="col-md-7">
                            {response.data.favoriteRecipes[0]? <h2>Here are you favorite recipes:</h2> : <h2>You dont have any favorite recipe!</h2>}
                        </div>
                    </div>
                </div>
                <section className="row justify-content-center">
                <section className="col-12 col-sm6 col-md-3">
                {response.data.favoriteRecipes.map((cur,index) => {
                    return (
                        <div className="recipe form-container" key={index}>
                            <h3>{cur.name}</h3>
                            <div class="btn-group" role="group" aria-label="Basic example">
                            <button className="btn btn-success" onClick={() => {handleShow(cur)}}> Show more</button>
                            <button className="btn btn-danger" onClick={()=>{handleClick(cur._id)}}>Remove from favorites!</button>
                            </div>
                        </div>
                    )
                })}
                </section>
                </section>
            </section>
        )
    } else {
    return <Navigate to="/login" />
    }
}

