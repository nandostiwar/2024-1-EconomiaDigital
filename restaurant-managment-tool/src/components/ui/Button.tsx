import React, { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'

interface props extends InputHTMLAttributes<ButtonHTMLAttributes> {
  full?: boolean;
}

const Button: React.FC<props> = ({ children, full, className, ...props }) => {
  return (
    <button {...props} className={`${className ?? ""} ${full ? "w-full" : "btn-wide"} btn btn-info btn-xs sm:btn-sm md:btn-md lg:btn-lg`}>
      {children}
    </button>
  )
}

export default Button
