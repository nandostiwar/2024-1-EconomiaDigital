import React, { useState } from 'react'
import TextInput2 from '@components/ui/TextInput2'
import Button from '@components/ui/Button'
import { handleCreateProduct } from '@/libs/utils/product'
import { Product } from '@/models/Product'

interface props {

}

const ProductForm: React.FC<props> = () => {
  const defaultData = { name: "", price: 0 }
  const [productData, setProductData] = useState<Product>(defaultData)

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleCreateProduct(productData).then(() => {
      setProductData(defaultData)
    })
  }
  return (
    <div className='w-full flex flex-col items-start justify-center'>
      <h3 className='text-2xl font-semibold'>Producto</h3>
      <form onSubmit={handleSubmit} className='flex flex-row items-end gap-8 w-full'>
        <TextInput2
          name='name'
          value={productData.name}
          onChange={handleInputChange}
          label={'Nombre'}
        />
        <TextInput2
          name='price'
          value={productData.price}
          onChange={handleInputChange}
          label={'Precio'}
        />
        <Button className='translate-y-1' full={false}>Guardar</Button>
      </form>
    </div>
  )
}

export default ProductForm
