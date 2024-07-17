import Nav from "../utils/nav"
import { useState, useEffect } from "react"

function Delete() {
   const [formDetails, setFormDetails] = useState({})
   const [show, setShow] = useState('disabled')
   const [showInput, setShowInput] = useState(false)
   const [handle, setHandle] = useState('')
   const [success, setSuccess] = useState(true)

   useEffect(() => {
      setSuccess(!success)
   }, [])

   useEffect(() => {
      let tempData = localStorage.getItem('employeeData')
      if (tempData) {
         tempData = JSON.parse(tempData)
         setFormDetails(tempData)
         setShowInput(true)
         setShow('disabled')
      }
   }, [success])

   const handleSelect = () => {
      setHandle(event.target.value)
      setShow('')
      setFormDetails({ ...formDetails, [event.target.name]: event.target.value})
   }


   const handleReset = () => {
      event.preventDefault()
      if (show == '') {
         if (window.confirm('Are you sure you want to delete? This action is permanent.')) {
            let tempData = localStorage.getItem('employeeData')
            tempData = JSON.parse(tempData)
            delete tempData[handle]
            localStorage.setItem('employeeData', JSON.stringify(tempData))
            setShowInput(true)
            setShow('')
            setFormDetails({})
            setSuccess(!success)
         } else {
            setShowInput(true)
            setShow('')
            setFormDetails({})
            setSuccess(!success)
         }
      }
   }

  return (
    <main className='font-main flex flex-col gap-5 overflow-hidden'>
      <Nav />
      <form onReset={handleReset} noValidate className='mt-2'>
         <fieldset className='border-y-2 w-[100%] flex flex-col gap-10 p-6 border-blue-600'>
            <legend className='text-md px-1'>
               DELETE EMPLOYEE
            </legend>
            <div className="flex justify-between items-center flex-wrap gap-4">
               {
                  <label 
                     htmlFor="employee" 
                     className="flex w-[300px] gap-1 px-4 flex-col text-sm"> Select Employee
                     <select 
                        className='text-sm capitalize font-thin border border-gray-300 shadow-md p-2 rounded-md focus:outline-none px-1  focus:border-blue-600 focus:border-2' 
                        name="employee" 
                        id="employee" 
                        onChange={handleSelect}
                        autoFocus
                        >
                        <option value=''>     
                        </option>
                        {
                           showInput && Object.keys(formDetails).map((data, index) => (
                              <option value={formDetails[data].name} key={`${data}-${index}`}>
                                 {formDetails[data].name}
                              </option>
                           ))
                        }
                     </select>
                  </label>
               }
            </div>
            <button disabled={show} type="reset" className='bg-blue-600 text-white self-start py-2 px-4 text-sm rounded-md mx-4'>Delete Employee</button>
         </fieldset>
      </form>
    </main>
  )
}

export default Delete
