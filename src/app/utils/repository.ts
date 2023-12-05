
interface Body {
  nombreCompleto: string
  celular: string
  genero: string
  clinica: string
  otraClinica: string
  cargo: string
}

const CODE_REQUEST_ERROR = new Map(
  [
    ['P2002', 'El usuario ya se encuentra registrado'],
    ['default', 'No se puede guardar la información.']
  ]
)

export class User {
  /** Permite guardar la información en la base de datos */
  static async save (
    { body }: { body: Body }
  ): Promise<
    { errors: null | { message: string }, data: null | { message: string } }
    > {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body)
      })

      const json = await response.json()

      if (json.isSaved === false) {
        const message = CODE_REQUEST_ERROR.get(json?.error?.code ?? 'default')
        throw new Error(message)
      }

      return {
        errors: null,
        data: {
          message: 'Información guardada'
        }
      }
    } catch (error) {
      console.log({ error })
      return {
        errors: error as Error,
        data: null
      }
    }
  }
}
