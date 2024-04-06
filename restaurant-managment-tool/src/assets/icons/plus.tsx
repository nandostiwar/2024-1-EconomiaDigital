import React from 'react'

interface props {

}

const PlusIcon: React.FC<props> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11 11V3h2v8h8v2h-8v8h-2v-8H3v-2z" />
    </svg>
  )
}

export default PlusIcon 
