import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";

function App() {

  return (
    <>
      <Layout/>
      <Routes>
        {/* Redirect from root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App
