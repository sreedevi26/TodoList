import React, { useEffect, useRef, useState } from 'react'
// import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

function Todolist() {
   const [input, setInput] = useState("") //todo
  const [todolist, setTodolist] = useState([])//todos
  const [edit, setEdit] = useState(0)

  const addTodo = () => {
    if (input !== '') {
      setTodolist([...todolist, {
        list: input, id: Date.now(),
        // status:false 
      }])
      console.log(todolist);
      // click on submit automatically clear the input box
      setInput('')
    }
    if (edit) {
      const editTodo = todolist.find((input) => input.id === edit);
      const updateTodo = todolist.map((to) => to.id === editTodo.id ?
        { id: to.id, list: input } :
        { id: to.id, list: to.list }
      );
      setTodolist(updateTodo);
      setEdit('');
    }
  }    

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const inputref = useRef('null')

  useEffect(() => {
    inputref.current.focus()
  })

  const onDelete = (id) => {
    setTodolist(todolist.filter((todo) => todo.id !== id))
  }

  const onEdit = (id) => {
    const editTodolist = todolist.find((input) => input.id === id)
    setInput(editTodolist.list)
    setEdit(editTodolist.id)
  }
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl justify-center flex ">Todo List</h2>
              <form onSubmit={handleSubmit}>
                <div className="mt-6 flex max-w-md gap-x-4 justify-center" >
                  <label className="sr-only">
                  </label>
                  <input value={input} onChange={(e) => setInput(e.target.value)} ref={inputref}
                    type="text"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  // placeholder="Enter your email"
                  />
                  {/* {input} */}
                  <button onClick={addTodo}
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {edit ? 'Edit' : 'Add'}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="list mt-6 flex max-w-md gap-x-4 justify-center " style={{ color: 'white' }}>
          <ul>
            {
              todolist.map((todo) => (
                <li className='text-center mt-5 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-dark shadow-sm ring-1 
                ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                  {todo.list}
                  <span>
                    {/* <i style={{ color: 'green' }} className="fa-solid fa-circle-check ms-3 4x" title='Complete'
                    onClick={()=>onDone(todo.id)}
                    ></i> */}
                    <i style={{ color: 'white' }} className="fa-solid fa-pen-to-square ms-3" title='Edit'
                      onClick={() => onEdit(todo.id)}
                    ></i>
                    <i style={{ color: 'red' }} className="fa-solid fa-trash ms-3 text-danger" title='Delete'
                      onClick={() => onDelete(todo.id)}
                    ></i>
                  </span>
                </li>
              ))
            }

          </ul>
        </div>
      </div>
    </>
  )
}

export default Todolist