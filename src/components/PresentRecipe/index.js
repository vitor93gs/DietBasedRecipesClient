import Swal from 'sweetalert2'

export function PresentRecipe(name, ingredients, instructions){
    const xpd = "/./g"
    return (
        Swal.fire({
            title: `<strong>${name}</strong>`,
            html:"<strong>INGREDIENTS :</strong>" + ingredients.join(", ") + "<br/> <strong>INSTRUCTIONS :</strong>" + instructions.replace(/[.]{1}/g,".<br/>"),
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down">Not great</i>',
            cancelButtonAriaLabel: 'Thumbs down'
        })

    );
}