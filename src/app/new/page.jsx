"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


const NewPage =  ({ params }) => {
  const savedInfo = localStorage.getItem('inputsInfo');
  const initialInfo = savedInfo ? JSON.parse(savedInfo) : {};
  const router = useRouter();
  const [inputsInfo, setInfo] = useState(initialInfo);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  
  useEffect(() => {
   if (params.id){
    fetch(`/api/tasks/${params.id}`)
    .then(res => res.json())
    .then(data => {
      setInfo({title: data.title, description: data.description})
    })
   }
  }, []);

  const handleFormInfo = (e, input) => {
    e.preventDefault();
    const newTree = { ...inputsInfo }; // Crear una copia del estado actual
    newTree[input] = e.target.value; // Actualizar el valor correspondiente
    setInfo(newTree); // Actualizar el estado con la nueva copia
    localStorage.setItem('inputsInfo', JSON.stringify(newTree)); // Guardar en localStorage// Mostrar el nuevo estado

  }


  const handleSubmit = async (e, action) => {
    e.preventDefault();
    // Verifica si inputsInfo no está vacío y si contiene la clave "title"
    if (inputsInfo && inputsInfo.title && inputsInfo.title !== '') {
      if (params.id) {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: 'PUT',
          body: JSON.stringify(inputsInfo), // Envía el estado completo
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          setShowAlertError(true);
        } else {
          setInfo({ 'title': '', 'description': '' })
          localStorage.setItem('inputsInfo', JSON.stringify({}));
          if (action == 'redirect') {
            router.refresh();
            router.push('/');
          } else {
            setShowAlertSuccess(true);
          }
        }
      } else {
        const res = await fetch('api/tasks', {
          method: 'POST',
          body: JSON.stringify(inputsInfo), // Envía el estado completo
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          setShowAlertError(true);
        } else {
          setInfo({ 'title': '', 'description': '' })
          localStorage.setItem('inputsInfo', JSON.stringify({}));
          if (action == 'redirect') {
            router.refresh();
            router.push('/');
          } else {
            setShowAlertSuccess(true);
          }
        }
      }
      
    } else {
      setShowAlertWarning(true);
      // Puedes mostrar un mensaje de error o realizar otra acción apropiada aquí
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    // Verifica si inputsInfo no está vacío y si contiene la clave "title"
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      setShowAlertError(true);
    } else {
      setInfo({ 'title': '', 'description': '' })
      localStorage.setItem('inputsInfo', JSON.stringify({}));
      router.refresh();
      router.push('/');
    }
  }


  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form
        className="bg-slate-800 p-10 lg:w-1/3 md:w-1/2 rounded-md"
        onSubmit={handleSubmit}
        onFocus={() => { setShowAlertWarning(false); setShowAlertSuccess(false); setShowAlertError(false); }}
      >
        {showAlertWarning && (
          <div className="bg-yellow-200 text-yellow-800 py-2 mb-2 text-md text-center rounded-md border border-yellow-300">
            Debe proporcionar al menos el título de la tarea.
          </div>
        )}
        {showAlertSuccess && (
          <div className="bg-green-400 text-green-800 py-2 mb-2 text-md text-center rounded-md border border-green-500">
            Tarea creada con éxito.
          </div>
        )}
        {showAlertError && (
          <div className="bg-red-400 text-red-800 py-2 mb-2 text-md text-center rounded-md border border-red-500">
            Ocurrio un error. Favor de intentarlo de nuevo.
          </div>
        )}
        <label htmlFor="title" className="font-bold text-md">Título de la tarea</label>
        <input
          id="title"
          type="text"
          placeholder="Título"
          value={inputsInfo['title']}
          className="p-2 mb-4 w-full rounded-md border-none bg-slate-100 text-black focus:outline-none"
          onChange={(e) => handleFormInfo(e, 'title')}
        />
        <label htmlFor="description" className="font-bold text-md">Descripcion de la tarea</label>
        <textarea
          rows="3"
          id="description"
          value={inputsInfo['description']}
          placeholder="Describe tu tarea"
          className="p-2 mb-4 w-full rounded-md border-none bg-slate-100 resize-none text-black focus:outline-none"
          onChange={(e) => handleFormInfo(e, 'description')}
        >
        </textarea>
        <div className="flex justify-end">
         { 
          !params.id ? 
         <button
            onClick={(e) => handleSubmit(e, 'stay')}
            className="bg-blue-500 ml-auto hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
           Crear y añadir otra
          </button>
        : 
        null  
        }
        { 
          params.id ? 
         <button
            onClick={(e) => handleDelete(e)}
            className="bg-red-700 ml-auto hover:bg-red-800 font-bold py-2 px-4 rounded"
          >
           Eliminar
          </button>
        : 
        null  
        }
          <button
            onClick={(e) => handleSubmit(e, 'redirect')}
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 ml-2 rounded"
          >
            { params.id ? 'Actualizar': 'Crear'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPage