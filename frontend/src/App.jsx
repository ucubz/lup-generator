// src/App.jsx
import React from "react"; // ✅ WAJIB untuk JSX
import { Routes, Route } from "react-router-dom";
import FormIsian from "./pages/FormIsian";
import PreviewTeks from "./pages/PreviewTeks";
import { FormProvider } from "./context/FormContext";

export default function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<FormIsian />} />
        <Route path="/preview" element={<PreviewTeks />} />
      </Routes>
    </FormProvider>
  );
}
