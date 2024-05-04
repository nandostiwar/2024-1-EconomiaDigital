import React, { useEffect, useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import { dateToIso } from './libs/date'
import { getAllCountries } from './libs/countries'
import { createReservation, getAllReservations } from './libs/reservations'



const App: React.FC = () => {
  // states
  const [countries, setCountries] = useState<[]>()
  const [reservations, setReservations] = useState<[]>()
  const [date, setDate] = useState<Date>(new Date)
  const [originCountry, setOriginCountry] = useState()
  const [destinationCountry, setDestionationCountry] = useState()
  const [matchedCountriesOrigin, setMatchedCountriesOrigin] = useState<[]>()
  const [matchedCountriesDestination, setMatchedCountriesDestination] = useState<[]>()

  // handler for submit create request
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from reloading page
    event.preventDefault()

    // check if values are valid
    if (originCountry !== null && originCountry !== undefined && destinationCountry !== null && destinationCountry !== undefined && date) {
      // make request to api
      createReservation(originCountry, destinationCountry, date)
    }
  }

  // get countries to show on origin and destiny inputs
  useEffect(() => {
    const getCountriesData = async () => {
      const data = await getAllCountries()
      setCountries(data)
    }
    getCountriesData()
  }, [])

  // get reservations to show in table
  useEffect(() => {
    const getReservationsData = async () => {
      const data = await getAllReservations()
      setReservations(data)
    }
    getReservationsData()
  }, [])

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // input content
    const inputContent = event.target.value.toLowerCase()

    // validate minimum of 3 characters
    if (inputContent.length < 3) {
      return
    }

    const matchedCountrs: [] = []

    // check for countries that has similar names
    countries?.forEach((country) => {
      // get country name and lower case all letters
      const countryName = (country["name"] as string).toLowerCase()

      // check if country name matches
      if (countryName.includes(inputContent)) {
        matchedCountrs.push(country)
      }
    })

    if (event.target.name === "origin") {
      setMatchedCountriesOrigin(matchedCountrs)
    } else {
      setMatchedCountriesDestination(matchedCountrs)
    }
  }

  return (
    <div className='bg-zinc-100 flex flex-col items-center justify-center w-full h-full overflow-y-auto max-h-[80%] lg:max-h-screens min-h-screen overflow-x-hidden'>
      <div className='flex flex-col gap-5 bg-white min-w-[90%] lg:min-h-[40rem] shadow-md rounded-md p-10'>
        {/* header section */}
        <div className='flex flex-col items-start justify-start w-full h-auto'>
          <h3 className='text-2xl font-semibold'>Reservas</h3>
        </div>
        {/* important section */}
        <div className='flex flex-col lg:flex-row justify-between gap-2 lg:gap-10'>
          {/* form section */}
          <div className='min-w-[45%] flex flex-col gap-5 items-start justify-start h-full'>
            <div className='flex flex-col items-start justify-start'>
              <h4 className='font-medium text-xl'>Crear una reserva</h4>
              <p>En la siguiente sección se podrá hacer una reserva</p>
            </div>
            <form
              onSubmit={onSubmitHandler}
              className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4'
            >
              <TextInput
                name='origin'
                hasSearchSection={true}
                onChange={inputOnChange}
                searchSectionHandler={setOriginCountry}
                searchSectionValue={originCountry}
                matchedCountries={matchedCountriesOrigin}
                label={'Origen'}
              />
              <TextInput
                name='destination'
                hasSearchSection={true}
                onChange={inputOnChange}
                searchSectionValue={destinationCountry}
                searchSectionHandler={setDestionationCountry}
                matchedCountries={matchedCountriesDestination}
                label={'Destino'}
              />
              <TextInput
                wrapperClassName='col-span-2 md:col-span-1 lg:col-span-2 pb-3'
                value={date !== undefined ? dateToIso(date) : dateToIso(new Date)}
                onChange={(e) => setDate(new Date(e.target.value))}
                label={'Día'}
                type='date'
              />
              <button className='btn btn-primary col-span-2 md:col-span-3 lg:col-span-2'>Guardar</button>
            </form>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          {/* table section */}
          <div className='flex flex-col items-start justify-start min-w-[100%] lg:min-w-[55%] lg:max-w-[55%] h-full gap-5'>
            <div className='w-full flex flex-col items-start justify-start'>
              <h4 className='font-medium text-xl'>Listado de reservas</h4>
              <p>En la siguiente sección se podrá hacer una reserva</p>
            </div>
            <div className="w-full lg:max-w-[85%] h-[20rem] lg:h-auto max-h-[40%] overflow-y-auto lg:max-h-[100%] overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations !== undefined && reservations?.map((reservation, idx) => {
                    return (
                      <tr>
                        <th>{idx + 1}</th>
                        <td>{`(${reservation["origin_place"]["code"]}) ${reservation["origin_place"]["name"]}`}</td>
                        <td>{`(${reservation["destination_place"]["code"]}) ${reservation["destination_place"]["name"]}`}</td>
                        <td>{dateToIso(new Date(reservation["date"]))}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
