import { NextPage } from 'next'
import cuid from 'cuid'
import { useReducer } from 'react'

interface Todo {
  id: string
  content: string
}

const State = {
  todos: [],
  inputField: '',
}

interface State {
  todos: Todo[]
  inputField: string
}

type Action = { type: 'ADD_TODO' } | { type: 'SET_INPUT'; payload: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        inputField: action.payload,
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: cuid(), content: state.inputField }],
        inputField: '',
      }
    default:
      return state
  }
}

const NikkoPage: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, State)
  return (
    <div className="min-h-screen max-w-md mx-auto p-10">
      <div className="space-y-6">
        <form className="flex gap-4 justify-between">
          <input
            type="text"
            placeholder="Todo.."
            value={state.inputField}
            onChange={(event) =>
              dispatch({ type: 'SET_INPUT', payload: event.target.value })
            }
            className="bg-slate-200 px-4 py-4 rounded-md"
          />
          <button
            onClick={(event) => {
              event.preventDefault()
              dispatch({ type: 'ADD_TODO' })
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Add Todo
          </button>
        </form>
        <div className="space-y-6">
          {state.todos.map((todo) => (
            <div
              key={todo.id}
              className="py-2 px-4 rounded-md bg-blue-500 text-white font-medium">
              {todo.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NikkoPage
