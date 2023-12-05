'use client'
import Form from './components/form'
import { Toaster } from 'react-hot-toast'
import Notification from './components/notification'

export default function Home (): JSX.Element {
  return (
    <>
      <Toaster />
      <main className='min-h-screen bg-blue-100 grid place-content-center w-full'>
        <Notification />
        <section className='w-screen max-w-xl bg-white mx-auto border my-20 border-gray-300 shadow-lg rounded-lg px-8 sm:px-12 py-10 space-y-8'>
          <header className='text-center'>
            <img src='/unesi-logo-color.webp' alt='logo unesi color' loading='lazy' className='h-20 sm:h-24 mx-auto' />
            <h4 className='font-medium text-lg'>Personal Hemodinamia IPS</h4>
          </header>
          <Form />
        </section>
      </main>
    </>
  )
}
