import { FormField } from "../../pages/FormField"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { PresentRecipe } from "../PresentRecipe"
import { api } from "../../api"
import { AuthContext } from "../../contexts/authContext"
import "./style.css"
const { Configuration, OpenAIApi } = require("openai")



export function GenerateNewRecipe(){
    const [form, setForm] = useState({firstIngredient: "", secondIngredient: "", thirdIngredient: "", fourthIngredient: "", fifthIngredient: ""})
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    const [recipeObject , setRecipeObject] = useState({})
    const { loggedInUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState({isDisabled:false,btn:"Add to favorites"})

    const configuration = new Configuration({ apiKey :process.env.REACT_APP_OPENAIKEI})
    
    const openai = new OpenAIApi(configuration);

    useEffect(() => {
        if(response!==""){
            async function handlePost(){
                const obj = (JSON.parse(response))
                const postedRecipe = await api.post("/recipes/newRecipe", obj)
                console.log(postedRecipe)
                setRecipeObject(postedRecipe.data)
            }
            handlePost()
        }
    },[response])

    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
        setPrompt(`Using this JSON as a template: {"name":,"ingredients":,"instructions":}, populate the JSON with a diet recipe with a custom name, ingredients (ingredients must be separated in strings inside an array) and instructions using at least one of the given ingredients.

        ingredients: chicken bread crumbs parsley
        JSON: {"name":"Chicken Parmesan","ingredients":["chicken breast","bread crumbs","grated cheese","parsley","garlic","salt","pepper","eggs","milk","olive oil"],"instructions":"Preheat the oven to 200 degrees C. Cut the chicken breast into thin slices. In a bowl, mix together the bread crumbs, grated cheese, parsley, garlic, salt, pepper, eggs and milk. Dip each chicken slice into the mixture, then place on a lightly oiled baking sheet. Bake for 20 minutes, or until cooked through."}
        ingredients: pork belly garlic
        JSON:{"name":"Garlic Pork Belly","ingredients":["1 pound pork belly","1 head garlic","1 tablespoon olive oil","1 teaspoon salt","1/2 teaspoon black pepper"],"instructions":" Preheat oven to 375 degrees. Peel garlic cloves and slice in half. In a large oven-proof skillet, heat olive oil over medium-high heat. Add pork belly and garlic cloves. Cook for 3-5 minutes per side, or until pork is browned. Sprinkle with salt and pepper. Transfer skillet to oven and bake for 30-40 minutes, or until pork is cooked through. Serve hot."}
        ingredients: brocoli cheese parsley
        JSON: {"name":"Broccoli Parsley Cheese Soup","ingredients":["1 cup chopped onion","1/4 cup chopped celery","1/4 cup chopped green bell pepper","1/4 cup chopped red bell pepper","1/4 cup chopped yellow bell pepper","1/4 cup chopped parsley","1/4 cup chopped broccoli","1/4 cup shredded cheddar cheese","1/4 cup heavy cream","1/4 teaspoon black pepper","1/4 teaspoon garlic powder","1/4 teaspoon onion powder","1/4 teaspoon celery seed","1/4 teaspoon dried thyme","1/4 teaspoon dried basil","1/4 teaspoon dried oregano","1/4 teaspoon salt","1/4 teaspoon sugar","1/4 cup all-purpose flour","4 cups chicken broth","1 cup water"],"instructions":"In a large saucepan, sauté onion, celery, bell peppers, parsley, broccoli, and cheese in butter until vegetables are tender. Add cream, black pepper, garlic powder, onion powder, celery seed, thyme, basil, oregano, salt, and sugar; stir well. Sprinkle with flour; stir until well blended. Add chicken broth and water; simmer for 20 minutes. Serve in individual bowls."}
        ingredients: ${form.firstIngredient} ${form.secondIngredient} ${form.thirdIngredient} ${form.fourthIngredient} ${form.fifthIngredient}.
        JSON:`) 
    }
   

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)

        openai.createCompletion("text-davinci-001", {  
        prompt: prompt,
        temperature: 0,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        }).then((res) => {
            setLoading(false)
            setDisabled({isDisabled:false,btn:"Add to favorites"})
            setResponse(res.data.choices[0].text)
        })
    }

    function handleClick(){
        PresentRecipe(recipeObject.name, recipeObject.ingredients, recipeObject.instructions)
    }

    async function handleFavorite(){
        try {
            const postedRecipe = await api.patch(`/recipes/makeFavorite/${recipeObject._id}`)
            setDisabled({isDisabled:true,btn:"Added to favorites!"})
            console.log(postedRecipe)
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <section className="hero">
            <div className="container">
                <h1>
                Generate your own diet recipe
                </h1>
                <div className="row">
                    <div className="col-md-7">
                        <p>Insert up to 5 ingredients you want to build your recipe with:</p>
                    </div>
                </div>
            </div>
            <section className="container-fluid forms">
            <section className="row justify-content-center">
            <section className="col-12 col-sm6 col-md-3">
                <form className="form-container" onSubmit={handleSubmit}>
                        <div>
                            <FormField list="food" type="text" label="1" name="firstIngredient" id="FirstIngredient" readOnly={loading} required={false} value={form.firstIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
                            <FormField list="food" type="text" label="2" name="secondIngredient" id="SecondIngredient" readOnly={loading} required={false} value={form.secondIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
                            <FormField list="food" type="text" label="3" name="thirdIngredient" id="ThirdIngredient" readOnly={loading} required={false} value={form.thirdIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
                            <FormField list="food" type="text" label="4" name="fourthIngredient" id="FourthIngredient" readOnly={loading} required={false} value={form.fourthIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
                            <FormField list="food" type="text" label="5" name="fifthIngredient" id="FifthIngredient" readOnly={loading} required={false} value={form.fifthIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
                            <br/>
                            <button type="submit" disabled={loading} className="btn btn-success" > Generate! </button> 
                        </div>
                </form>
            </section>
            </section>
            <section className="row justify-content-center recipe">
                <section className="col-12 col-sm6 col-md-3">
                {recipeObject._id ? <div className="form-container"><h2>{recipeObject.name} <br/><button className="btn btn-success" onClick={handleClick}>Show Recipe</button>{loggedInUser.token ? <button className="btn btn-danger" disabled={disabled.isDisabled} onClick={handleFavorite}> {disabled.btn}</button>:"" }</h2> </div> : ""}
                </section>
                </section>
            </section>
        </section>             
    </>
}