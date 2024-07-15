import Nav from "../utils/nav"

function Report() {
  return (
    <main className='font-main flex flex-col gap-3'>
      <Nav />
      <form noValidate className='mt-2'>
         <fieldset className='border-y-2 w-[100%] flex flex-col gap-4 p-6 border-blue-600'>
            <legend className='text-md px-1'>
               GENERATE EMPLOYEE REPORT
            </legend>
            <label htmlFor="name">
               
            </label>
         </fieldset>
      </form>
    </main>
  )
}

export default Report
