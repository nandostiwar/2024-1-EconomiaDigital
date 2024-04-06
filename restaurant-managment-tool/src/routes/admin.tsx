import React from 'react'
import ProductForm from '@components/forms/ProductForm'
import Navbar from "@components/ui/Navbar"
import UserForm from '@components/forms/UserForm'
import SalesSection from '@/components/sections/SalesSection'

interface props {

}

const AdminRoute: React.FC<props> = () => {
  return (
    <div className='min-h-screen w-full bg-zinc-100'>
      <Navbar />
      <div className='flex flex-col gap-8 w-full h-full p-10'>
        <h3 className='font-bold text-3xl'>Panel de administrador</h3>
        <ProductForm />
        <UserForm />
        <SalesSection />
      </div>
    </div>
  )
}

export default AdminRoute
