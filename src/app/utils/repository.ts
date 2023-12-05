
interface Body {
  nombreCompleto: string
  celular: string
  genero: string
  clinica: string
  otraClinica: string
  cargo: string
}

export class User {
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
        throw new Error('No se puede guardar la información.')
      }

      return {
        errors: null,
        data: {
          message: 'Información guardada'
        }
      }
    } catch (error) {
      return {
        errors: error as Error,
        data: null
      }
    }
  }
}
