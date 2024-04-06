import React from 'react'

interface props {
  label: string | React.ReactNode;
}

const TextInput: React.FC<props> = ({ label }) => {
  return (
    <label className="input w-full py-8 input-bordered flex items-center gap-5">
      {label}
      <input type="text" className="grow" placeholder="daisy@site.com" />
    </label>
  )
}

export default TextInput
