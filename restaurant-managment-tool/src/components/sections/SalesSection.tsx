import React from 'react'
import Table from '../ui/Table'
import { TableColumn } from '@/models/Table'

interface props {

}

const SalesSection: React.FC<props> = () => {
  const columns: TableColumn[] = [
    { name: "Mesero" },
    { name: "Pedido" },
    { name: "Valor total" },
  ]

  return (
    <div className='w-full flex flex-col items-start justify-center'>
      <h3 className='text-2xl font-semibold pb-5'>Ventas</h3>
      <div className='flex flex-row items-end gap-8 w-full'>
        <Table columns={columns} body={[]} />
      </div>
    </div>
  )
}

export default SalesSection
