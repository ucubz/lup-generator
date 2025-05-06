// src/components/Checkbox.jsx
import React from "react";

export default function Checkbox({ label, name, checked, onChange }) {
    return (
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      </div>
    );
  }