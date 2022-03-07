import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/authContext"
import { api } from "../../api"
import { PresentRecipe } from "../../components/PresentRecipe"




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
    console.log(response.data.favoriteRecipes)

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
            <>
                <h1>
                    Welcome back {loggedInUser.user.name}! Here are you favorite recipes:
                </h1>
                {response.data.favoriteRecipes.map((cur) => {
                    return (
                        <div>
                            <h3>{cur.name}</h3>
                            
                            <button onClick={() => {handleShow(cur)}}> Show more</button>
                            <button onClick={()=>{handleClick(cur._id)}}>Remove from favorites!</button>
                        </div>
                        
                    )
                })}
                
            </>
        )
    } else {
    return <Navigate to="/login" />
    }
}

