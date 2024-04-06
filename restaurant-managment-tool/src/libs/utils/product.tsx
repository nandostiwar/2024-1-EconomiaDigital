import { ProductData } from "@/models/ProductData";
import { PRODUCTS_ENDPOINT } from "@libs/services/http";
import swal from "sweetalert";

export const handleCreateProduct = async (productData: ProductData) => {
  try {
    const response = await fetch(PRODUCTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      swal({
        icon: 'success',
        title: 'Success!',
        text: 'Se creó el producto exitosamente!'
      });
    } else {
      throw new Error('Failed to create products');
    }
  } catch (error) {
    swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal, intenta mas tarde!'
    });
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:8080/products');

    let data

    if (response.ok) {
      data = response.json()
    } else {
      throw new Error('Failed to retrieve products');
    }

    return data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
