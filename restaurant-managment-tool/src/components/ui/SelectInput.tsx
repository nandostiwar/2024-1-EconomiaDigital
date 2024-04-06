import SelectInputOption from '@/models/SelectInputOption';
import React, { SelectHTMLAttributes } from 'react'

interface props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  default_option?: string;
  options: SelectInputOption[];
}

const SelectInput: React.FC<props> = ({ label, default_option, options, ...props }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        {label && <span className="label-text text-lg">{label}</span>}
      </div>
      <select {...props} className="select select-bordered">
        <option
          selected
        >
          {default_option ?? "Seleciona una"}
        </option>
        {options.map(opt => {
          return (
            <option value={opt.value}>{opt.name}</option>
          )
        })}
      </select>
    </label>
  )
}

export default SelectInput
