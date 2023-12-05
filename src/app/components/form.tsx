'use client'
import { useState } from 'react'
import z from 'zod'
import toast from 'react-hot-toast'

import { Users, Hospital, CellPhone, Job, Gender } from './icons'
import { capitalizeWords } from '../utils/formaters'
import { User } from '../utils/repository'

const schemaForm = z.object({
  cedula: z
    .string({ required_error: 'Campo requerido' })
    .regex(/[0-9]$/g, { message: 'Debe incluir solo números' })
    .min(4, { message: 'Debe contener mínimo 4 caracteres' })
    .trim(),
  nombreCompleto: z
    .string({ required_error: 'Campo requerido' })
    .min(3, { message: 'Debe contener mínimo 5 caracteres' })
    .trim()
    .transform(value => capitalizeWords(value)),
  celular: z
    .string({ required_error: 'Campo requerido' })
    .min(5, { message: 'Mínimo 5 caracteres' })
    .regex(/[0-9]/gi, 'Debe incluir solo números')
    .trim()
    .transform(value => value.trim().replace(/ /g, '')),
  genero: z
    .string({ required_error: 'Campo requerido' })
    .min(3, { message: 'Debe contener mínimo 5 caracteres' })
    .transform(value => capitalizeWords(value)),
  clinica: z
    .string({ required_error: 'Campo requerido' })
    .min(3, { message: 'Debe contener mínimo 5 caracteres' })
    .transform(value => capitalizeWords(value)),
  otraClinica: z
    .string()
    .optional()
    .transform(value => capitalizeWords(value ?? '')),
  otroCargo: z
    .string()
    .optional()
    .transform(value => capitalizeWords(value ?? '')),
  cargo: z
    .string({ required_error: 'Campo requerido' })
    .min(3, { message: 'Debe contener mínimo 5 caracteres' })
    .trim()
    .transform(value => capitalizeWords(value))
})

const INITIAL_FIELDS_ERRORS = {
  cedula: null,
  nombreCompleto: null,
  celular: null,
  genero: null,
  clinica: null,
  otraClinica: null,
  cargo: null,
  otroCargo: null
}

export default function Form (): JSX.Element {
  const [fieldErrors, setFieldErrors] = useState(INITIAL_FIELDS_ERRORS)
  const [isLoading, setIsLoading] = useState(false)
  const [other, setOther] = useState({ clinic: '', job: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setFieldErrors(INITIAL_FIELDS_ERRORS)
    setIsLoading(true)
    const target = e.target as HTMLFormElement

    const body = {
      otraClinica: '',
      ...Object.fromEntries(new FormData(target))
    }

    const parsed = schemaForm.safeParse(body)

    if (!parsed.success) {
      const issues = parsed.error.issues
      for (const issue of issues) {
        const { message, path } = issue
        setFieldErrors(prevValue => {
          return {
            ...prevValue, [path[0]]: message
          }
        })
      }

      setIsLoading(false)
      return
    }

    toast.loading('Enviando...', { duration: 2000 })
    const { errors, data } = await User.save({ body: parsed.data })

    if (errors != null) toast.error(errors.message)
    if (data != null) {
      toast.success(data.message)
      target.reset()
    }

    setIsLoading(false)
  }

  return (
    <fieldset disabled={isLoading}>
      <form className='grid gap-x-6 gap-y-4' onSubmit={handleSubmit}>

        <div>
          <label className='block space-y-2 text-gray-800 w-full'>
            <span>Cedula</span>
            <div className='relative'>
              <Users />
              <input
                name='cedula'
                id='cedula'
                type='text'
                placeholder='12345678'
                className='w-full pl-12 pr-3 py-2 text-gray-500 bg-slate-50/50 outline-none border border-gray-300 focus:border-blue-600 shadow-sm rounded-lg disabled:cursor-not-allowed disabled:bg-slate-100 '
                autoFocus
              />
            </div>
          </label>
          {fieldErrors.cedula != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.cedula}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800 w-full'>
            <span>Nombre Completo</span>
            <div className='relative'>
              <Users />
              <input
                name='nombreCompleto'
                id='nombreCompleto'
                type='text'
                placeholder='Juan Perez'
                className='w-full pl-12 pr-3 py-2 text-gray-500 bg-slate-50/50 outline-none border border-gray-300 focus:border-blue-600 shadow-sm rounded-lg disabled:cursor-not-allowed disabled:bg-slate-100 '
              />
            </div>
          </label>
          {fieldErrors.nombreCompleto != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.nombreCompleto}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800'>
            <span>Celular</span>
            <div className='relative'>
              <CellPhone />
              <input
                name='celular'
                id='celular'
                type='text'
                placeholder='3001234567'
                className='w-full pl-12 pr-3 py-2 text-gray-500 bg-slate-50/50 outline-none border border-gray-300 focus:border-blue-600 shadow-sm rounded-lg bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100'
              />
            </div>
          </label>
          {fieldErrors.celular != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.celular}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800'>
            <span>Género</span>
            <div className='relative'>
              <Gender />
              <select name='genero' id='genero' className='w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'>
                <option value=''>Seleccione uno</option>
                <option value='Masculino'>Masculino</option>
                <option value='Femenino'>Femenino</option>
                <option value='Indeterminado'>Indeterminado</option>
              </select>
            </div>
          </label>
          {fieldErrors.genero != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.genero}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800'>
            <span>Clínica donde laboras</span>
            <div className='relative'>
              <Hospital />
              <select name='clinica' id='clinica' className='w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg' onChange={(e) => setOther({ ...other, clinic: e.target.value })}>
                <option value=''>Seleccione uno</option>
                <option value='Cardiosalud - Santa Martha'> Cardiosalud - Santa Martha </option>
                <option value='Clínica Abaton'> Clínica Abaton </option>
                <option value='Clínica Centro - Fundación Cardiotoracica'> Clínica Centro - Fundación Cardiotoracica</option>
                <option value='Clínica Del Caribe'> Clínica Del Caribe </option>
                <option value='Clínica Iberoamérica'> Clínica Iberoamérica </option>
                <option value='Clínica La Asunción'> Clínica La Asunción </option>
                <option value='Clínica La Misericordia'> Clínica La Misericordia </option>
                <option value='Clínica Portó Azul'> Clínica Portó Azul </option>
                <option value='Clínica Reina Catalina'> Clínica Reina Catalina </option>
                <option value='Clínica San Vicente'> Clínica San Vicente</option>
                <option value='HUN'> HUN </option>
                <option value='Mired - Adelita de Char'> Mired - Adelita de Char </option>
                <option value='Otro...'> Otro... </option>
              </select>

            </div>
          </label>
          {fieldErrors.clinica != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.clinica}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800'>
            <span>¿Otro?</span>
            <div className='relative'>
              <Hospital />
              <input
                name='otraClinica'
                id='otraClinica'
                type='text'
                className='w-full pl-12 pr-3 py-2 text-gray-500 bg-slate-50/50 outline-none border border-gray-300 focus:border-blue-600 shadow-sm rounded-lg disabled:cursor-not-allowed disabled:bg-slate-100'
                disabled={other.clinic !== 'Otro...'}
              />
            </div>
          </label>
          {fieldErrors.otraClinica != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.otraClinica}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800'>
            <span>Cargo</span>
            <div className='relative'>
              <Job />
              <select name='cargo' id='cargo' className='w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg' onChange={(e) => setOther({ ...other, job: e.target.value })}>
                <option value=''>Seleccione uno</option>
                <option value='Auxiliar de enfermería servicio hemodinamia'>Auxiliar de enfermería servicio hemodinamia </option>
                <option value='Jefe de Enfermería servicio HEMODINAMIA'>Jefe de Enfermería servicio HEMODINAMIA </option>
                <option value='Administrativo'>Administrativo </option>
                <option value='Técnico'>Técnico </option>
                <option value='Otro'>Otro</option>
              </select>
            </div>
          </label>
          {fieldErrors.cargo != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.cargo}</p>}
        </div>

        <div>
          <label className='block space-y-2 text-gray-800'>
            <span>Otro Cargo</span>
            <div className='relative'>
              <Hospital />
              <input
                name='otroCargo'
                id='otroCargo'
                type='text'
                className='w-full pl-12 pr-3 py-2 text-gray-500 bg-slate-50/50 outline-none border border-gray-300 focus:border-blue-600 shadow-sm rounded-lg disabled:cursor-not-allowed disabled:bg-slate-100'
                disabled={!other.job.includes('Otro')}
              />
            </div>
          </label>
          {fieldErrors.otroCargo != null && <p className='text-xs italic mt-1 text-rose-500'>{fieldErrors.otroCargo}</p>}
        </div>

        <button
          className='px-6 py-3 text-white duration-100 bg-blue-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-blue-600 focus:ring-2 mt-6 disabled:bg-blue-400 disabled:cursor-not-allowed'
          type='submit'
        >
          Enviar Formulario
        </button>
      </form>
    </fieldset>
  )
}
