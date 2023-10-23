import TaskCard from '@/components/TaskCard';
import { prisma } from '@/libs/prisma'

const loadTasks = async () => {
  return await prisma.task.findMany();
}

const HomePage = async () => {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <ul className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id}/>
        ))}
      </ul>
    </section>
  )
}

export default HomePage