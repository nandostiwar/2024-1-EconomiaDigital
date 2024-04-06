import { AuthData } from "@/models/AuthData";
import { AUTH_ENDPOINT } from "@libs/services/http";
import swal from "sweetalert";

export const handleAuthenticate = async (userData: AuthData) => {
  try {
    const response = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      swal({
        icon: 'success',
        title: 'Success!',
        text: 'Se logueo exitosamente!'
      });
    } else {
      throw new Error('Fallo al loguearse');
    }
  } catch (error) {
    swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal, intenta mas tarde!'
    });
  }
};
