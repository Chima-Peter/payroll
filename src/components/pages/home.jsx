import { useEffect, useState } from 'react'
import Nav from '../utils/nav'
import validator from 'validator'
import { motion} from 'framer-motion'
import { FaRegSmile } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";

function Home() {
   const [formDetails, setFormDetails] = useState({
      name: '',
      phone: '',
      entries: {},
      carryover: '0'
   })
   const [nameError, setNameError] = useState(' ')
   const [phoneError, setPhoneError] = useState(' ')
   const nameRegex = /^[a-zA-Z ]+$/;
   const [success, setSuccess] = useState(false)


   useEffect(() => {
      const employeeData = localStorage.getItem('employeeData')
      if (!employeeData)
            localStorage.setItem('employeeData', JSON.stringify({}))
   },[])

   const handleChange = () => {
      setFormDetails({ ...formDetails, [event.target.name]: event.target.value})
      setNameError(' ')
      setPhoneError(' ')
   }

   const handleNameBlur = () => {
      if (!validator.isEmpty(formDetails.name)) {
         if (validator.matches(formDetails.name, nameRegex)) {
            setNameError('')
            return true
         }
         else {
            setNameError('This field shouldn`t contain special characters.')
            return false
         }
      }
      else
         {
            setNameError('This field is required.')
            return false
         }
   }

   
   const handlePhoneBlur = () => {
      if (!validator.isEmpty(formDetails.phone)) {
         if (validator.isMobilePhone(formDetails.phone)) {
            setPhoneError('')
            return true
         }
         else {
            setPhoneError('This field should contain only valid numbers.')
            return false 
         }
      }
      else
         {
            setPhoneError('This field is required.')
            return false 
         }}

   const handleSubmit = () => {
      event.preventDefault()
      if (window.confirm('Are you sure you want to add this employee?'))
         {
            if (handleNameBlur()&& handlePhoneBlur()) {
            let employeeData = localStorage.getItem('employeeData')
            employeeData = JSON.parse(employeeData)
            employeeData[formDetails.name] = formDetails
            localStorage.setItem('employeeData', JSON.stringify(employeeData))
            setFormDetails({
               name: '',
               phone: '',
               entries: {},
               carryover: '0'
            })
            setSuccess(true)
            setTimeout(() => { setSuccess(false) }, 5000)
         }
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
      <form noValidate onReset={handleSubmit} className='mt-2'>
         <fieldset className='border-y-2 w-[100%] flex flex-col gap-4 p-6 border-blue-600'>
            <legend className='text-md px-1'>
               ADD EMPLOYEE
            </legend>
            <label htmlFor="name" className='text-md flex-col flex'>
               Name
               <input 
                  id='name' 
                  name="name" 
                  onChange={handleChange} 
                  onBlur={handleNameBlur} 
                  value={formDetails.name} 
                  type="text" 
                  autoFocus
                  className="capitalize bg-blue-100 bg-clip-padding min-md:w-[100%] lg:w-[50%] py-2 px-3 rounded-md focus:outline-none focus:border-2 text-gray-600 text-sm font-light focus:border-blue-600 border border-blue-600"/>
               {
                  nameError && <span className='text-[10px] text-red-600 '>{nameError}</span>
               }
            </label>
            <label htmlFor="phone" className='text-md flex-col flex'>
               Phone
               <input 
                  id='phone'
                  name="phone" 
                  type="tel" 
                  onChange={handleChange} 
                  onBlur={handlePhoneBlur} 
                  value={formDetails.phone} 
                   className="bg-blue-100 bg-clip-padding min-md:w-[100%] lg:w-[50%] py-2 px-3 rounded-md focus:outline-none focus:border-2 text-gray-600 text-sm font-light focus:border-blue-600 border border-blue-600"/>
               {
                  phoneError && <span className='text-[10px] text-red-600 '>{phoneError}</span>
               }
            </label>
            <button type="reset" className='bg-blue-600 text-white self-start py-2 px-4 text-sm rounded-md'>Add Employee</button>
         </fieldset>
      </form>
      {
         success && <motion.div 
            className="bg-blue-600 items-center flex justify-between py-4 px-8 w-[100%] rounded-sm self-center text-white text-xs"
            variants={successVaraints}
            initial='initial'
            animate='final'>
            <FaRegSmile className='w-7 h-7' />
            <p className='uppercase'>
               You&rsquo;ve succesfully added {formDetails.name}
            </p>
            <MdOutlineCancelPresentation className='w-5 h-5' />
         </motion.div>
         }
   </main>
  )
}

export default Home
