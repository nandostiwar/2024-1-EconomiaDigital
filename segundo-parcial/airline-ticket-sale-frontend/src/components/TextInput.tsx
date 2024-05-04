import React from 'react'

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  label?: string;
  matchedCountries?: []
  hasSearchSection?: boolean;
  searchSectionValue?: never;
  searchSectionHandler?: React.Dispatch<React.SetStateAction<undefined>>;
}

const TextInput: React.FC<props> = ({
  label, type, className, wrapperClassName, searchSectionHandler,
  hasSearchSection, matchedCountries, searchSectionValue, ...props
}) => {
  return (
    <label className={`form-control w-full group relative ${wrapperClassName}`}>
      <div className="label">
        {label && <span className="label-text">{label}</span>}
      </div>
      <input
        type={type}
        value={searchSectionValue ? searchSectionValue["name"] : undefined}
        onClick={searchSectionHandler ? () => searchSectionHandler(undefined) : undefined}
        className={`input peer input-bordered w-full ${className}`}
        {...props}
      />
      {hasSearchSection && searchSectionHandler && (
        <div
          className={`
            flex flex-col gap-2
            z-10 absolute top-[6rem] -left-[0.5rem] bg-white transition-all duration-200
            shadow-lg rounded-md min-w-[20rem] min-h-[5rem] max-h-[18rem] border-gray-200 border
            peer-focus:scale-100 peer-focus:opacity-100 -translate-y-[10rem] delay-100
            scale-0 opacity-0 peer-focus:translate-y-0 
          `}
        >
          {matchedCountries?.map((country) => {
            return (
              <button
                type='button'
                className={`
                  z-20 flex flex-col justify-between border-b p-4 rounded-t-md 
                  hover:bg-zinc-100
                  duration-200 transition-all 
                `}
                onClick={() => searchSectionHandler(country)}
              >

                {country["name"]}
              </button>
            )
          })}
        </div>
      )}
    </label>
  )
}

export default TextInput