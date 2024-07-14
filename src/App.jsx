import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/home"
import ErrorPage from "./components/pages/errorpage"
function App() {
   return (
      <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/payroll/'}
      >
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
