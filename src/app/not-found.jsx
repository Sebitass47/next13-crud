import Link from "next/link"

const NotFound = () => {
    return(
        <section className="flex h-[calc(100vh-7rem)] justify-center items-center text-center flex-col">
            <h1 className="text-4xl font-bold">
                No se encontró la página
            </h1>
            <Link href='/' className="text-center text-slate-400 mt-2 text-xl">
                Volver al Inicio
            </Link>
        </section>
    )
}

export default NotFound