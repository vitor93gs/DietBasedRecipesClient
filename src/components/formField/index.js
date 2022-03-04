export function FormField(props){
    return(
        <div>
            <label htmlFor={props.id}>{props.label} :</label>
            <br/>
            <input
                className=""
                type={props.type}
                id={props.id}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                required={props.required}
                pattern={props.pattern}
                readOnly={props.readOnly}
            />
        </div>
    )
}