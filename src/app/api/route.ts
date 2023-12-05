import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST (request: Request): Promise<Response> {
  const body = await request.json()

  try {
    await prisma.personal.create({
      data: body
    })

    return NextResponse.json({ isSaved: true, error: null })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ isSaved: false, error })
  } finally {
    await prisma.$disconnect()
  }
}

/** Buscamos si el user ya se encuentra registrado con atenrioridad */
export async function PUT (request: Request): Promise<Response> {
  const body = await request.json()
  const { celular, ...data } = body

  try {
    const response = await prisma.personal.findMany({
      where: {
        ...data
      }
    })

    return NextResponse.json({ isDuplicate: response.length > 0 })
  } catch (error) {

  } finally {
    await prisma.$disconnect()
  }
  return NextResponse.json({ name: 'hola' })
}
