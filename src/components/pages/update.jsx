import Nav from "../utils/nav"
import { useState, useEffect } from "react"

function Update() {
   const [formDetails, setFormDetails] = useState({})
   const [success, setSuccess] = useState(false)
   const [show, setShow] = useState(false)
   const [handle, setHandle] = useState('')
   const [showPallet, setShowPallets] = useState(true)
   const [amount, setAmount] = useState('0')
   const [tempPallet, setPallet] = useState('0')
   const [prevPallet, setPrevPallet] = useState('')

   useEffect(() => {
      let tempData = localStorage.getItem('employeeData')
      if (tempData) {
         tempData = JSON.parse(tempData)
         setFormDetails(tempData)
         setShow(true)
      }
   }, [success])

   useEffect(() => {
      let tempData = localStorage.getItem('employeeData')
      if (tempData) {
         tempData = JSON.parse(tempData)
         setFormDetails(tempData)
         setShow(true)
      }
   }, [])

   const handleSelect = () => {
      let date = new Date()
      date = date.toDateString()
      let tempData = JSON.parse(localStorage.getItem('employeeData'))
      let newData = tempData[event.target.value].entries
      console.log(newData)
      setShowPallets(true)
      if ((Object.hasOwn(newData, date))) 
         {
            if (window.confirm("You've already saved data for this employee. Do you want to overwrite it?"))
            {
               let tempDate = new Date()
               let yesterday  = tempDate.setDate(tempDate.getDate() - 1)
               yesterday = new Date(yesterday)
               yesterday = yesterday.toDateString()
               if ((Object.hasOwn(newData, yesterday))) {
                     tempData[event.target.value].carryover = newData[yesterday].carryOver
                     setHandle(event.target.value)
                     setShowPallets(false)
                     setPrevPallet(tempData[event.target.value].carryover)
                     localStorage.setItem('employeeData', JSON.stringify(tempData))
               }
               else {
                  setHandle(event.target.value)
                  setShowPallets(false)
                  tempData[event.target.value].carryover = '0'
                  setPrevPallet(tempData[event.target.value].carryover)
                  localStorage.setItem('employeeData', JSON.stringify(tempData))
               }
            }
         else {
            event.target.value = ''
         }
         }
      else {
         setHandle(event.target.value)
         setShowPallets(false)
         setPrevPallet(formDetails[event.target.value].carryover)
      }
   }

   const handlePalletBlur = () => {
      let tempData = JSON.parse(localStorage.getItem('employeeData'))
      const pallets = Number(event.target.value) + Number(tempData[handle].carryover)
      let tempAmount = 0
      let tempCarryover = 0
      if (pallets >= 200)
         {
            tempAmount = '7500'
            tempCarryover = pallets - 200
         }
      else if (pallets >= 160)
         {
            tempAmount = '6000'
            tempCarryover = pallets - 160
         }
      else if (pallets >= 120)
         {
            tempAmount = '4500'
            tempCarryover = pallets - 120
         }
      else if (pallets >= 80)
         {
            tempAmount = '3000'
            tempCarryover = pallets - 80
         }
      else if (pallets >= 50)
         {
            tempAmount = '1500'
            tempCarryover = pallets - 50
         }
         setAmount(tempAmount)
         setPrevPallet(tempCarryover)
         let newData = tempData[handle].entries
         let date = new Date()
         date = date.toDateString()
         const temp = {
            entryAmount: tempAmount,
            entryPallet: pallets,
            entryDate: date,
            carryOver: tempCarryover
         }
         newData[date] = temp
         tempData[handle].entries = newData
         tempData[handle].carryover = tempCarryover
         setFormDetails(tempData)
         if (event.target.value == '')
            return false
         else
            return true
      }

   const handleSubmit = () => {
      event.preventDefault()
      if (window.confirm('Are you sure you want to save this data?')) {
         setAmount('0')
         setFormDetails({})
         setPallet('0')
         setPrevPallet('')
         setShowPallets(true)
         localStorage.setItem('employeeData', JSON.stringify(formDetails))
         setSuccess(!success)
      }
   }


   const successVaraints = {
      initial: {
         x: '-100%',
         opacity: 0
      },
      final: {
         x: 0,
         opacity: 1,
         transition: {type: 'tween'}
      }
   }

  return (
    <main className='font-main flex flex-col gap-3'>
      <Nav />
      <form onReset={handleSubmit} noValidate className='mt-2'>
         <fieldset className='border-y-2 w-[100%] flex flex-col gap-10 p-6 border-blue-600'>
            <legend className='text-md px-1'>
               UPDATE EMPLOYEE DATA
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
               <label htmlFor="pallet" className="flex w-[300px] gap-1 px-4 flex-col text-sm"> Enter Number of Pallets
                  <input type="number" disabled={showPallet} value={tempPallet} onChange={() => {setPallet(event.target.value)}} name="pallet" onBlur={handlePalletBlur} id="pallet" className="border border-gray-300 shadow-md rounded-md p-2 focus:border-blue-600 focus:border-2 focus:outline-none" />
               </label>
               <label htmlFor="carryover" className="flex w-[300px] gap-1 px-4 flex-col text-sm"> Amount Worth
                  <input type="number" disabled value={amount} name="carryover" id="carryover" className="border border-gray-300 shadow-md rounded-md p-2 focus:border-blue-600 focus:border-2 focus:outline-none" />
               </label>
                {
                  !showPallet && <label htmlFor="carry" className="flex w-[300px] gap-1 px-4 flex-col text-sm"> Carryover Pallet
                                    <input type="number" disabled value={prevPallet} name="carry" id="carry" className="border border-gray-300 shadow-md rounded-md p-2 focus:border-blue-600 focus:border-2 focus:outline-none" />
                                 </label>
               }
            </div>
            <button type="reset" className='bg-blue-600 text-white self-start py-2 px-4 text-sm rounded-md mx-4'>Save</button>
         </fieldset>
         
      </form>
    </main>
  )
}

export default Update
