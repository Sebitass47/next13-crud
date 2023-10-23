'use client'
import { useRouter } from "next/navigation";

const TaskCard = ({ task }) => {
  const router = useRouter()
  return (
    <li 
      className="bg-slate-800 p-3 rounded-md hover:bg-slate-700 hover:cursor-pointer"
      onClick={() => {
        router.push(`/task/edit/${task.id}`)
      }}
    >
      <h1
        className='font-bold text-xl mb-2'
      >
        {task.title}
      </h1>
      <p>
        {task.description}
      </p>
      <p className='text-sm'>
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </li>
  )
}

export default TaskCard