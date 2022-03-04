import { FormField } from "../../components/FormField"
import { useState } from "react"
const { Configuration, OpenAIApi } = require("openai")




export function Home(){

    const [form, setForm] = useState({firstIngredient: "", secondIngredient: "", thirdIngredient: "", fourthIngredient: "", fifthIngredient: ""})
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    

    const configuration = new Configuration({apiKey: "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"})

    const openai = new OpenAIApi(configuration);

    function handleChange(event){
        setForm({...form, [event.target.name] : event.target.value})
        setPrompt(`Generate a diet recipe with a name, instructions and ingredients, using the following ingredients: ${form.firstIngredient} ${form.secondIngredient} ${form.thirdIngredient} ${form.fourthIngredient} ${form.fifthIngredient}`)
        
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
        }).then((response) => {
            setResponse(response.data.choices[0].text)
        })
        
    }

    return(
        <div>
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
            <p>{response}</p>
        </div>
    )
}