import React, { useContext, useEffect, useState } from 'react'
import DropDown from '@components/ui/SelectInput'
import { Product } from '@/models/Product'
import SelectInputOption from '@/models/SelectInputOption'
import TextInput2 from './TextInput2';
import TextArea from './TextArea';
import OrderProduct from '@/models/OrderProduct';
import { ProductContext } from '@/routes/waiter';

interface props {
  index?: number;
  products: Product[];
}

const ProductComponent: React.FC<props> = ({ products, index }) => {
  const productsData = useContext(ProductContext);
  const defaultData: OrderProduct = { name: '', price: 0, note: '', quantity: 0 }
  const [orderProduct, setOrderProduct] = useState<OrderProduct>(defaultData)
  const options: SelectInputOption[] = products.map((product, idx) => {
    return { name: product.name, value: idx }
  })

  useEffect(() => {
    if (productsData.productsData[index] === undefined) {
      productsData.setProductsData([
        ...productsData.productsData,
        orderProduct
      ])
    } else {
      const newArray = productsData.productsData
      newArray[index] = orderProduct
      productsData.setProductsData(newArray)
    }
  }, [orderProduct, index])

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrderProduct({
      ...orderProduct,
      [name]: value
    });
  };

  // Function to handle select changes
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const product = products[value]
    setOrderProduct({
      ...orderProduct,
      name: product.name,
      price: product.price
    });
  };

  // Function to handle select changes
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setOrderProduct({
      ...orderProduct,
      [name]: value
    });
  };

  return (
    <div className='flex flex-col items-start justify-center bg-white w-full min-h-[10rem] rounded-lg px-10 py-8 shadow-md'>
      <h4 className='font-semibold text-2xl'>Producto #{index + 1}</h4>
      <div className='flex flex-col justify-center w-full'>
        <DropDown
          name='name'
          onChange={handleSelectChange}
          label='Producto'
          options={options}
        />
        <TextInput2
          name='quantity'
          onChange={handleInputChange}
          type='number'
          label='Cantidad'
        />
        <TextArea
          name='note'
          onChange={handleTextAreaChange}
          style={{ resize: "none" }}
          label='Nota'
        />
      </div>
    </div>
  )
}

export default ProductComponent
