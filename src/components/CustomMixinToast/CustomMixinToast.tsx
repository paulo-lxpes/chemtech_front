import Swal from "sweetalert2";

const CustomMixinToast = Swal.mixin({
    toast: true,
    position: 'top-right',
    timer: 5000,
    showConfirmButton: false,
    timerProgressBar: true,
    showCancelButton: false,
    customClass: {
        popup: 'colored-toast'
    }
})

export default CustomMixinToast