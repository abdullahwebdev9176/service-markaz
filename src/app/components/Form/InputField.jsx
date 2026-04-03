import React from 'react'

const InputField = ({ placeholder, type }) => {
  return (
    <>
        <input type={type} placeholder={placeholder} className="px-5 py-3 w-full md:w-96 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900" />
    </>
  )
}

export default InputField