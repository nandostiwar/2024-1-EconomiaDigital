import PlusIcon from '@/assets/icons/plus'
import Button from '@/components/ui/Button'
import ProductComponent from '@/components/ui/Product'
/* import Table from '@/components/ui/Table' */
import TextInput2 from '@/components/ui/TextInput2'
import { getAllProducts } from '@/libs/utils/product'
import OrderProduct from '@/models/OrderProduct'
import { Product } from '@/models/Product'
/* import { TableColumn, TableRow } from '@/models/Table' */
import Navbar from '@components/ui/Navbar'
import React, { useEffect, useState } from 'react'

interface props {

}

// Create a new context
export const ProductContext = React.createContext();

const WaiterRoute: React.FC<props> = () => {
  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState<OrderProduct[]>([])
  const [tableBody, setTableBody] = useState<TableRow[]>([])
  const [productList, setProductList] = useState<Product[]>([])
  const [change, setChange] = useState<boolean>(false)

  // Function to add the pre-defined component
  const addComponent = (productsList: Product[]) => {
    const newComponents = [
      ...products,
      <ProductComponent
        productsData={productsData}
        setProductsData={setProductsData}
        products={productsList}
        index={products.length}
        key={products.length}
      />
    ];
    setProducts(newComponents);
  };

  useEffect(() => {
    const getProducts = async () => {
      const values = await getAllProducts()
      setProductList(values)
    }

    getProducts()
  }, [])

  useEffect(() => {
    productsData.map((product_) => {
      const row: TableRow = {
        values: [
          product_.name, product_.quantity, product_.price * product_.quantity
        ]
      }
      console.log(row)
      setTableBody(
        ...tableBody,
        row
      )
    })
  }, [productsData, change])


  /* const tableColumns: TableColumn[] = [ */
  /*   { name: "Producto" }, { name: "Cantidad" }, { name: "Precio" } */
  /* ] */

  return (
    <div className='min-h-screen w-full bg-zinc-100'>
      <Navbar />
      <div className='flex flex-col gap-8 w-full h-full p-10'>
        <h3 className='font-bold text-3xl'>Panel de mesero - Crear pedido</h3>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='flex flex-col items-start'>
            <TextInput2 type='number' label='Pedido para la mesa' />
          </div>
          <Button className='btn-success' onClick={() => setChange(!change)}>Confirmar</Button>
        </div>
        <ProductContext.Provider value={{ productsData: productsData, setProductsData: setProductsData }}>
          <div className='bg-zinc-200 shadow-inner rounded-lg grid grid-cols-4 gap-10 overflow-auto min-h-[32rem] max-h-[32rem] p-10'>
            {...products}
            <button
              onClick={() => addComponent(productList)}
              className='w-full h-full min-h-[10rem] bg-white shadow-md rounded-lg flex items-center justify-center'
            >
              <PlusIcon />
            </button>
          </div>
        </ProductContext.Provider>
        <div>
          {/* <Table */}
          {/*   columns={tableColumns} */}
          {/*   body={tableBody.length > 0 ? tableBody : []} */}
          {/* /> */}
        </div>
      </div>
    </div >
  )
}

export default WaiterRoute
