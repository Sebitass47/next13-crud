import TaskCard from '@/components/TaskCard';
import { prisma } from '@/libs/prisma'

const loadTasks = async () => {
  return await prisma.task.findMany();
}

export const dynamic = 'force-dynamic'

const HomePage = async () => {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <ul className="grid  gap-3 grid-cols-1  mt-10 md:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id}/>
        ))}
      </ul>
    </section>
  )
}

export default HomePage