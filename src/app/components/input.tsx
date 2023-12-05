import { Users } from './icons'

export default function Input (): JSX.Element {
  return (
    <div>
      <label htmlFor='website-url' className='block py-2 text-gray-500'>
        Website URL
      </label>

      <div className='relative max-w-xs'>
        <Users />
        <input
          type='text'
          placeholder='Enter your email'
          className='w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
        />
      </div>

    </div>
  )
}
