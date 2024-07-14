import { NavLink } from "react-router-dom"

function Nav() {
  return (
    <nav 
      className="bg-blue-600 text-white flex w-100 px-8 items-center py-4 shadow-md justify-between font-main">
      <h1 className="text-3xl">PAYROLL</h1>
      <ul className="flex gap-5 text-sm font-extralight mr-16">
         <li>
            <NavLink to={'/'} className="pb-1 hover:border-b-2">
               Home
            </NavLink>
         </li>
         <li>
            <NavLink to={'/update'} className="pb-1 hover:border-b-2">
               Update Employee
            </NavLink>
         </li>
         <li>
            <NavLink to={'/report'} className="pb-1 hover:border-b-2">
               Generate Report
            </NavLink>
         </li>
      </ul>
    </nav>
  )
}

export default Nav
