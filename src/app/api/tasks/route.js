import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export const GET = async () => {
  const tasks = await prisma.task.findMany()
  console.log(tasks)
  return NextResponse.json(tasks)
}

export const POST = async (request) => {
  const data = await request.json()
  console.log(data)
  const newTask = await prisma.task.create({
    data: data
  })
  return NextResponse.json(newTask)
}