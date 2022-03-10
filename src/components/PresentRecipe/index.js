import Swal from 'sweetalert2'
import "./style.css"

export function PresentRecipe(name, ingredients, instructions){
    return (
        Swal.fire({
            title: `${name}`,
            html:`<strong>INGREDIENTS : <br/></strong><p>${ingredients.join(", ")}</p><br/> <strong>INSTRUCTIONS : <br/></strong><p>${instructions.replace(/[.]{1}/g,".<br/>")}</p>`,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            background: "rgba(73, 60, 43, 1)",
            confirmButtonColor: "#198754",
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down">Not great</i>',
            cancelButtonAriaLabel: 'Thumbs down'
        })

    );
}