import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import {useEffect,useState} from "react";
import { createContext } from "react";

interface MyFunctionContextType {
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setloadingSecond: (loading: boolean) => void;
  loadingSecond: boolean;
}

export const MyFunctionContext = createContext<MyFunctionContextType>({
  setLoading: (loading: boolean) => {
    console.log(loading);
  },
  loading: false,
  setloadingSecond: (loading: boolean) => {
    console.log(loading);
  },
  loadingSecond: false,
});

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingMain, setloadingMain] = useState(true);
  const [loadingSecond, setloadingSecond] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setloadingMain(false);
    }, 1000);
  }, []);

  return (
    <MyFunctionContext.Provider value={{setLoading,loading,setloadingSecond,loadingSecond}}>
    <div className="w-full relative">
      {loading && (
        <span className="loading loading-infinity  loading-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] text-sky-500"></span>
      )}
      {loadingSecond && (
        <span className="loading loading-infinity  loading-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] text-sky-500"></span>
      )}
      {!loadingMain &&(
        <>
        <Layout/>
        <Routes>
          {/* Redirect from root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
        </>
      )}
    </div>
    </MyFunctionContext.Provider>
  )
}

export default App
