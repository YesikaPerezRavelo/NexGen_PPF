import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


export function toastAdded() {
  Swal.fire({
    title: "Nice! Your new item is in the cart.",
    imageUrl: "./images/sweetAlert.webp",
    draggable: true,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}
