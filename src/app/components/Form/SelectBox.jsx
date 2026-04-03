import React from 'react'

const SelectBox = ({ options, placeholder }) => {
  return (
    <select className="px-5 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900">
      <option>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  )
}

export default SelectBox