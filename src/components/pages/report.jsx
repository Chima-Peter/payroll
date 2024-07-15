import Nav from "../utils/nav"
import { useState, useEffect } from "react"

function Report() {
   const [formDetails, setFormDetails] = useState({})
   const [show, setShow] = useState(false)
   const [handle, setHandle] = useState('')
   const [showDate, setShowDate] = useState(true)
   const [success, setSuccess] = useState(true)
   const [formDate, setFormDate] = useState({
      start: '',
      end: ''
   })
   const [tableData, setTableData] = useState({})
   const [showTable, setShowTable] = useState(false)
   const [sum, setSum] = useState('0')

   useEffect(() => {
      let tempData = localStorage.getItem('employeeData')
      if (tempData) {
         tempData = JSON.parse(tempData)
         setFormDetails(tempData)
         setShowDate(true)
         setShow(true)
      }
   }, [])

   useEffect(() => {
      let tempData = localStorage.getItem('employeeData')
      if (tempData) {
         tempData = JSON.parse(tempData)
         setFormDetails(tempData)
         setShowDate(true)
         setShow(true)
      }
   }, [success])

   const handleSelect = () => {
      setHandle(event.target.value)
      setShowDate(false)
   }

   const handleDate =() => {
      setFormDate({ ...formDate, [event.target.name]: event.target.value})
   }

   const handleReset = () => {
      event.preventDefault()
      if ((formDate.start != '') && (formDate.end != '')) {
         setTableData({})
         let tempData = formDetails[handle].entries
         let tempSum = 0
         Object.keys(tempData).map((data) => {
            let thisDate = new Date(tempData[data].entryDate)
            let startDate = new Date(formDate.start)
            let endDate = new Date(formDate.end)
            tempData[data].name = handle
            if (((thisDate.toDateString() === startDate.toDateString()) || (thisDate.toDateString() === endDate.toDateString())) || ((thisDate > startDate) && (thisDate < endDate))) 
               {
                  setTableData({ ...tableData, [data]: tempData[data]})
                  let temp = Number(tempData[data].entryAmount)
                  tempSum = temp + tempSum
                  setShowTable(true)
               }
         })
         setSum(tempSum)
         setFormDate({
            start: '',
            end: ''
         })
         setSuccess(!success)
         setFormDetails({})
         setShowDate(true)
      }
   }

  return (
    <main className='font-main flex flex-col gap-5 overflow-hidden'>
      <Nav />
      <form onReset={handleReset} noValidate className='mt-2'>
         <fieldset className='border-y-2 w-[100%] flex flex-col gap-10 p-6 border-blue-600'>
            <legend className='text-md px-1'>
               GENERATE EMPLOYEE REPORT
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
                           show && Object.keys(formDetails).map((data, index) => (
                              <option value={formDetails[data].name} key={`${data}-${index}`}>
                                 {formDetails[data].name}
                              </option>
                           ))
                        }
                     </select>
                  </label>
               }
               <label htmlFor="start" className="flex w-[300px] gap-1 px-4 flex-col text-sm"> Start Date
                  <input type="date" disabled={showDate} onChange={handleDate} name="start" value={formDate.start}  id="start" className="border border-gray-300 shadow-md rounded-md p-2 focus:border-blue-600 focus:border-2 focus:outline-none" />
               </label>
               <label htmlFor="end" className="flex w-[300px] gap-1 px-4 flex-col text-sm"> End Date
                  <input type="date" disabled={showDate} onChange={handleDate} name="end" id="end" value={formDate.end} min={formDate.start}  className="border border-gray-300 shadow-md rounded-md p-2 focus:border-blue-600 focus:border-2 focus:outline-none" />
               </label>
            </div>
            <button type="reset" className='bg-blue-600 text-white self-start py-2 px-4 text-sm rounded-md mx-4'>Generate Report</button>
         </fieldset>
      </form>
      <table className="table-auto text-center w-[100%] overflow-x-auto">
         <thead className="text-white bg-blue-600 font-thin">
            <tr>
               <th className=" capitalize font-thin py-4">
                  Employee
               </th>
               <th className="font-thin py-4">
                  Date
               </th>
               <th className="font-thin py-4">
                  Pallets
               </th>
               <th className="font-thin py-4">
                  Amount
               </th>
            </tr>
         </thead>
         <tbody>
            {
               showTable && Object.keys(tableData).map((data) => (
                  <tr className="border-b border-b-gray-400" key={data}>
                     <td className="font-thin capitalize w-[200px] py-4">
                        {tableData[data].name}
                     </td>
                     <td className="w-[200px] font-thin py-3 text-sm">
                        {tableData[data].entryDate}
                     </td>
                     <td className="w-[200px] font-thin py-3 text-sm">
                        {tableData[data].entryPallet}
                     </td>
                     <td className="w-[200px] font-thin py-3 text-sm">
                        {tableData[data].entryAmount}
                     </td>
                  </tr>
               ))
            }
         </tbody>
      </table>
      {
         showTable && <h1 className="tracking-wider bg-gray-400 text-black text-md font-semibold py-4 px-16">
            TOTAL: &#8358;{sum}
         </h1>
      }
    </main>
  )
}

export default Report
