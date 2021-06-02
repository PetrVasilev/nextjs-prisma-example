import { useState } from 'react'

import { prisma } from '../utils/prisma'

const Index = ({ todos: initialTodos = [] }) => {
    const [todos, setTodos] = useState(initialTodos)

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const title = e.target.title.value
            const response = await createTodoRequest(title)
            setTodos((prev) => [...prev, response.todo])
            e.target.title.value = ''
        } catch (err) {
            console.error(err)
        }
    }

    const handleDone = async (id) => {
        try {
            await changeTodoRequest(id)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTodoRequest(id)
            setTodos((prev) => prev.filter((item) => item.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="app">
            <div className="view">
                <form onSubmit={handleCreate}>
                    <input className="input" placeholder="Введите задачу" required name="title" />
                    <button className="form-btn button is-primary" type="submit">
                        Добавить
                    </button>
                </form>
                <div className="todos">
                    {todos.map((item) => (
                        <div className="todo box" key={item.id}>
                            <TodoCheckbox todo={item} handleDone={handleDone} />
                            <button
                                className="button is-danger is-small"
                                onClick={() => handleDelete(item.id)}
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const TodoCheckbox = ({ todo, handleDone }) => {
    const [done, setDone] = useState(todo.done)
    return (
        <label
            style={{ textDecoration: done ? 'line-through' : undefined }}
            className="checkbox done"
        >
            <input
                checked={done}
                onChange={(e) => {
                    setDone(e.target.checked)
                    handleDone(todo.id)
                }}
                type="checkbox"
            />
            {todo.title}
        </label>
    )
}

const createTodoRequest = async (title) => {
    const response = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify({ title })
    })
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error(response.statusText)
    }
}

const changeTodoRequest = async (id) => {
    const response = await fetch('/api/todo', {
        method: 'PUT',
        body: JSON.stringify({ id })
    })
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error(response.statusText)
    }
}

const deleteTodoRequest = async (id) => {
    const response = await fetch('/api/todo', {
        method: 'DELETE',
        body: JSON.stringify({ id })
    })
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error(response.statusText)
    }
}

export const getServerSideProps = async () => {
    const todos = await prisma.todo.findMany()
    return {
        props: {
            todos
        }
    }
}

export default Index
