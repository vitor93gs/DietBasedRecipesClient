import { FormField } from "../../components/FormField"
import { useEffect, useState } from "react"
// import { PresentRecipe } from "../PresentRecipe"
import { api } from "../../api"

const { Configuration, OpenAIApi } = require("openai")



export function GenerateNewRecipe(){
    const [form, setForm] = useState({firstIngredient: "", secondIngredient: "", thirdIngredient: "", fourthIngredient: "", fifthIngredient: ""})
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    
    
    const configuration = new Configuration({ apiKey :process.env.REACT_APP_OPENAIKEI})
    
    const openai = new OpenAIApi(configuration);

    useEffect(() => {
        if(response!==""){
            async function handlePost(){
                console.log(response)
                const postedRecipe = await api.post("/recipes/newRecipe", response)
                console.log(postedRecipe)
                
            }
            handlePost()
        }
    },[response])

    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
        setPrompt(`Generate a JSON containing a diet recipe with a name, ingredients and instructions (instructions must be a single string without line breaks), using the following ingredients: ${form.firstIngredient} ${form.secondIngredient} ${form.thirdIngredient} ${form.fourthIngredient} ${form.fifthIngredient}`)
    }
   

    function handleSubmit(e){
        e.preventDefault()
        openai.createCompletion("text-davinci-001", {  
        prompt: prompt,
        temperature: 0,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        }).then((res) => {
            setResponse(res.data.choices[0].text)
        })
    }
    
    return <>
        <h1>
        CREATE YOUR OWN DIET RECIPE
        </h1>
        <h2>Insert the ingredients you want to build your recipe with:</h2>
        <form onSubmit={handleSubmit}>
            <FormField type="text" label="1" name="firstIngredient" id="FirstIngredient" readOnly={false} required={false} value={form.firstIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
            <FormField type="text" label="2" name="secondIngredient" id="SecondIngredient" readOnly={false} required={false} value={form.secondIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
            <FormField type="text" label="3" name="thirdIngredient" id="ThirdIngredient" readOnly={false} required={false} value={form.thirdIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
            <FormField type="text" label="4" name="fourthIngredient" id="FourthIngredient" readOnly={false} required={false} value={form.fourthIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
            <FormField type="text" label="5" name="fifthIngredient" id="FifthIngredient" readOnly={false} required={false} value={form.fifthIngredient} onChange={handleChange} pattern="^[A-Za-z ]{1,30}$"/>
            <br/>
            <button type="submit" > Generate! </button>
        </form>       
        
    </>
}