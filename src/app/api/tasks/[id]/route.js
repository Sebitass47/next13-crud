import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export const GET = async (request, {params}) => {
  const task = await prisma.task.findUnique({
    where: {id: Number(params.id)}
  });
  return NextResponse.json(task);
}

export const PUT = async (request, {params}) => {
  const body = await request.json()
  const taskUpdated = await prisma.task.update({where: {id: Number(params.id)}, data: body});
  return NextResponse.json(taskUpdated);
}

export const DELETE = async (request, {params}) => {
  try {
    const taskRemoved = await prisma.task.delete({
      where: {id: Number(params.id)}
    })
    return NextResponse.json(taskRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}