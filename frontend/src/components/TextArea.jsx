// src/components/TextArea.jsx
import React from "react";

export default function TextArea({ label, name, value, onChange, rows = 3 }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }