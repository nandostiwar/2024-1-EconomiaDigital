import React, { TextareaHTMLAttributes } from 'react'

interface props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea: React.FC<props> = ({ label, ...props }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        {label && <span className="label-text text-lg">{label}</span>}
      </div>
      <textarea {...props} placeholder="Escribe aquí" className="textarea textarea-bordered h-24"></textarea>
    </label>
  )
}

export default TextArea
