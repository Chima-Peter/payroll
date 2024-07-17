import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/home"
import ErrorPage from "./components/pages/errorpage"
import Report from "./components/pages/report"
import Update from "./components/pages/update"
import Delete from "./components/pages/delete"

function App() {
   return (
      <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/payroll/'}
      >
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="update" element={<Update />} />
            <Route path="report" element={<Report />} />
            <Route path="delete" element={<Delete />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
