
interface Body {
  nombreCompleto: string
  celular: string
  genero: string
  clinica: string
  otraClinica: string
  cargo: string
}

export class User {
  private static async verifyDuplicate (body: Body): Promise<{ errors: unknown }> {
    try {
      const response = await fetch('/api', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      const json = await response.json()

      return {
        errors: json.isDuplicate != null && json.isDuplicate === true ? true : null
      }
    } catch (error) {
      console.log({ error })
      return {
        errors: {
          error
        }
      }
    }
  }

  static async save ({ body }: { body: Body }): Promise<{ errors: null | { message: string }, data: null | { message: string } }> {
    try {
      await fetch('/api', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body)
      })

      return {
        errors: null,
        data: {
          message: 'Información guardada'
        }
      }
    } catch (error) {
      let message: string = ''
      if (error instanceof Error) message = error.message

      return {
        errors: {
          message
        },
        data: null
      }
    }
  }
}
