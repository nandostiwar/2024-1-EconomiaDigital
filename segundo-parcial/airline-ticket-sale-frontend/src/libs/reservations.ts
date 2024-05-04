import Swal from "sweetalert2";

const RESERVATIONS_URL = "http://localhost:8080/reservations";

export const getAllReservations = async () => {
  // make request
  const response = await fetch(RESERVATIONS_URL);

  // get data from response
  const data = response.json();

  // return values
  return data;
};

export const createReservation = async (
  originPlace: never,
  destinationPlace: never,
  date: Date
) => {
  // build requets body
  const body = {
    origin_place: originPlace,
    destination_place: destinationPlace,
    date: date,
  };

  // make request
  const response = await fetch(RESERVATIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (response.status === 409) {
    Swal.fire({
      title: 'Error!',
      text: 'Ya existe un vuelo igual! Intenta con otro',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  // get data from response
  const data = response.json();

  // return values
  return data;
};
