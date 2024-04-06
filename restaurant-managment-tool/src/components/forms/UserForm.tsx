import React, { useState } from 'react'
import TextInput2 from '@components/ui/TextInput2'
import Button from '@components/ui/Button'
import DropDown from '@components/ui/SelectInput'
import SelectInputOption from '@/models/SelectInputOption'
import { User } from '@/models/User'
import { handleCreateUser } from '@/libs/utils/auth'

interface props {

}

const UserForm: React.FC<props> = () => {
  const defaultData = { name: "", password: "", role: "" }
  const [userData, setUserData] = useState<User>(defaultData)

  const RoleOptions: SelectInputOption[] = [
    { name: "Administrador", value: "admin" },
    { name: "Mesero", value: "waiter" },
    { name: "Cocinero", value: "cook" },
  ]

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Function to handle select changes
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleCreateUser(userData).then(() => {
      setUserData(defaultData)
    })
  }

  return (
    <div className='w-full flex flex-col items-start justify-center'>
      <h3 className='text-2xl font-semibold'>Usuarios</h3>
      <form onSubmit={handleSubmit} className='flex flex-row items-end gap-8 w-full'>
        <TextInput2
          name='name'
          value={userData.name}
          onChange={handleInputChange}
          label={'Nombre'}
        />
        <TextInput2
          name='password'
          value={userData.password}
          label={'Contraseña'}
          onChange={handleInputChange}
        />
        <DropDown
          label={'Rol'}
          value={userData.role}
          name='role'
          onChange={handleSelectChange}
          options={RoleOptions}
          default_option={'Seleccione un rol'}
        />
        <Button className='translate-y-1' full={false}>Guardar</Button>
      </form>
    </div>
  )
}

export default UserForm
