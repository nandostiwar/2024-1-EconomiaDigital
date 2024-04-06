import React, { InputHTMLAttributes } from 'react'

interface props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: React.HTMLInputTypeAttribute;
}

const TextInput2: React.FC<props> = ({ label, type, ...props }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        {label && <span className="label-text text-lg">{label}</span>}
      </div>
      <input {...props} type={type ?? "text"} placeholder="Escribe aquí" className="input input-bordered w-full" />
    </label>
  )
}

export default TextInput2
