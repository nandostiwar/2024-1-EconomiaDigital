import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextInput2 from '@components/ui/TextInput2'
import Button from '@components/ui/Button'
import BackgroundImage from '@images/background_1.jpg'
import { AuthData } from '@/models/AuthData'
import { handleAuthenticate } from '@/libs/utils/auth'

const LoginRoute: React.FC = () => {
  const navigate = useNavigate()
  const defaultData = { name: "", password: "" }
  const [authData, setAuthData] = useState<AuthData>(defaultData)

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthData({
      ...authData,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleAuthenticate(authData)
      .then(() => {
        setAuthData(defaultData)
        navigate('/admin')
      })
      .catch(() => {
        console.log("nothing")
      })
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <div
        className="z-20 flex flex-col items-center justify-center gap-4 p-16 bg-white/80 backdrop-blur rounded-xl w-full max-w-[30rem] min-h-[30rem] shadow"
      >
        <div className='w-full flex flex-col items-center justify-center pb-5'>
          <h1 className='font-montserrat font-black text-2xl '>Tremendo Restaurante</h1>
          <h2 className='text-red-600 text-2xl font-semibold italic'>Saborearte</h2>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center gap-8'>
          <TextInput2
            name={'name'}
            value={authData.name}
            onChange={handleInputChange}
            label={"Nombre"}
          />
          <TextInput2
            name={'password'}
            value={authData.password}
            onChange={handleInputChange}
            label={"Contraseña"}
          />
          <Button>Ingresar</Button>
        </form>
      </div>
      <div className='max-w-[100vw] max-h-screen absolute top-0 z-5 overflow-hidden'>
        <div className='top-0 left-0 absolute w-full h-full min-w-[90vw] min-h-screen bg-zinc-800/60'></div>
        <img className='' src={BackgroundImage} alt="imagen_fondo" />
      </div>
    </div >
  )
}

export default LoginRoute
