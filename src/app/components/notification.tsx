export default function Notification (): JSX.Element {
  return (
    <div className='fixed z-10 top-0 left-0 text-left w-screen sm:mx-4 px-4 bg-amber-50 md:mx-auto md:px-8 border border-amber-500'>
      <div className='py-3'>
        <div className='flex items-center justify-center'>
          <div>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 rounded-full text-amber-500' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
            </svg>
          </div>
          <div className='flex items-center gap-2 ml-1 text-sm'>
            <span className='text-amber-600 font-semibold'>
              Tener en cuenta:
            </span>
            <p className='text-amber-600 mt-1'>
              El formulario estará disponible hasta el 10 de Diciembre de 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
