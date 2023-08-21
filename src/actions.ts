"use server"
import { PrismaClient } from "@prisma/client"
const client = new PrismaClient()

const error = (s: string): FormActionResponseType<any> => {
  return {
    isSuccess: false,
    error: s
  }
}

export const addCountdown = async (d: FormData): Promise<FormActionResponseType<number>> => {
  'use server'
  const title = d.get("title")
  const date = d.get("date")
  if (!title || !date) return error("Invalid input.")
  const data = {
    title: title.toString(),
    date: date.toString()
  }
  try {
    const { id } = await client.countdown.create({ data })
    return {
      result: id,
      isSuccess: true
    }
  } catch (e: any) {
    return {
      error: e.message ? e.message : "An error has occurred.",
      isSuccess: false
    }
  }
}

