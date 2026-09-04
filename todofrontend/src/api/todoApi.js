import { apiFetch } from "./apiFetch"; 
const API_URL = import.meta.env.VITE_API_URL;
const TODO_URL = `${API_URL}/work/todolist/`;


export const getTodos = async () => {
    const response = await apiFetch(TODO_URL);

    if (!response.ok) {
        throw new Error("Unable to load Todos. Please try again");
    }

    return await response.json();
};


export const addTodo = async (todoData) => {
    const response = await apiFetch(TODO_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
    });

    if (!response.ok) {
        throw new Error("Unable to add Todo. Please try again");
    }

    return await response.json();
};


export const deleteTodo = async (id) => {
    const response = await apiFetch(`${TODO_URL}${id}/`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Unable to delete Todo. Please try again");
    }

    return true;
};


export const toggleTodo = async (id, iscompleted) => {
    const response = await apiFetch(`${TODO_URL}${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            iscompleted: iscompleted,
        }),
    });

    if (!response.ok) {
        throw new Error("Unable to update Todo. Please try again");
    }

    return await response.json();
};


export const updateTodo = async (id, todoData) => {
    const response = await apiFetch(`${TODO_URL}${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
    });

    if (!response.ok) {
        throw new Error("Unable to update Todo. Please try again");
    }

    return await response.json();
};