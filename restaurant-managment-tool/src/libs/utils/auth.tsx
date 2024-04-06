import { AuthData } from "@/models/AuthData";
import { USERS_ENDPOINT } from "@libs/services/http";
import swal from "sweetalert";

export const handleCreateUser = async (userData: AuthData) => {
  try {
    const response = await fetch(USERS_ENDPOINT, {
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
        text: 'Se creó el usuario exitosamente!'
      });
    } else {
      throw new Error('Fallo al crear el usuario');
    }
  } catch (error) {
    swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal, intenta mas tarde!'
    });
  }
};
