import { useState, useEffect } from 'react'
import ToDoForms from '../components/ToDoForms'
import ToDoStats from '../components/ToDoStats'
import ToDoFilters from '../components/ToDoFilters'
import ToDoCards from '../components/ToDoCards'
import ToDoEmptyState from '../components/ToDoEmptyState'
import Toast from '../components/Toast'
import { useNavigate } from 'react-router-dom'
import {
  getTodos,
  deleteTodo,
  toggleTodo,
  updateTodo
} from "../api/todoApi";

export default function TodoPage() {

  const navigate = useNavigate();
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editdescription, setEditdescription] = useState('')
  const [editDueDate, setEditDueDate] = useState('')
  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [sortOption, setSortOption] = useState('newest')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState({ message: '', type: '', })

  // priorityOrder
  const priorityOrder = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3
  }

  // task statistics section

  const total_todos = todos.length;
  const completed_todos = todos.filter(todo => todo.iscompleted).length;
  const pending_todos = todos.filter(todo => !todo.iscompleted).length;

  // toast message for errors and success
  const showToast = (message, type) => {
    setToast({
      message: message,
      type: type
    })
    setTimeout(() => {
      setToast({
        message: '',
        type: ''
      })
    }, 3000);
  }

  // Get the Todos in the Screen
  useEffect(() => {

    const loadTodos = async () => {

      try {

        const data = await getTodos();

        setTodos(data);

      }
      catch (error) {

        setError('Unable to load Todos. Please try again');

      }
      finally {

        setLoading(false);

      }

    };

    loadTodos();

  }, []);


  // add more Todos with POST
  const handleTodoAdded = (newTodo) => {

    setTodos(previousTodos => [
      newTodo,
      ...previousTodos
    ]);

    setShowForm(false);
  };


  // Deleting the Todos
  const handleDeleteTodo = async (id) => {

    try {

      await deleteTodo(id);

      setTodos(prevTodos =>
        prevTodos.filter(todo => todo.id !== id)
      );

      showToast(
        'Todo deleted Successfully',
        'success'
      );

    }
    catch (error) {

      console.log(error);

      showToast(
        "Unable to delete todo. Please try again",
        'error'
      );

    }

  };


  // Updating the State of todos
  const handleToggleTodo = async (id, currentstatus) => {

    try {

      await toggleTodo(
        id,
        !currentstatus
      );

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id
            ? {
              ...todo,
              iscompleted: !currentstatus
            }
            : todo
        )
      );

      showToast(
        'Todo status updated',
        'success'
      );

    }
    catch (error) {

      console.log(error);

      showToast(
        'Unable to Update the todo. Please try again!',
        'error'
      );

    }

  };


  // Updating the title and description of Todos
  const updateTodos = async (id) => {

    try {

      await updateTodo(id, {
        title: editTitle,
        description: editdescription,
        due_date: editDueDate,
      });

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id
            ? {
              ...todo,
              title: editTitle,
              description: editdescription,
              due_date: editDueDate,
            }
            : todo
        )
      );

      setEditId(null);

      showToast(
        'Todo updated successfully',
        'success'
      );

    }
    catch (error) {

      console.log(error);

      showToast(
        'Unable to Update the Title, Description or Due Date. Please try again!',
        'error'
      );

    }

  };


  // Filtering Todo
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()) &&
    (priorityFilter === '' || todo.priority === priorityFilter) &&
    (
      statusFilter === '' ||
      (statusFilter === 'completed' && todo.iscompleted) ||
      (statusFilter === 'pending' && !todo.iscompleted)
    )
  );

  // sorting the todos  
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'priority-high':
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'priority-low':
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      default:
        return 0
    }
  }

  )

  // resetting filters
  const clearFilters = () => {
    setSearch('')
    setPriorityFilter('')
    setStatusFilter('')
    setSortOption('newest')
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    navigate('/login')
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <Toast message={toast.message} type={toast.type} />
        <div className='max-w-3xl mx-auto'>

          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h1 className="text-4xl text-center font-bold text-gray-800">
                Todo App
              </h1>

              <p className="text-center text-gray-500 mt-2">
                Manage your Tasks and Stay organized
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg
                   hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
          {/* Add Todo */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-5 py-3 rounded-xl
                   font-medium hover:bg-gray-800
                   active:scale-95 transition"
            >
              + Add Todo
            </button>
          </div>

          {/* POST form */}

          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  Create New Todo
                </h2>

                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <ToDoForms onTodoAdded={handleTodoAdded} />
            </div>
          )}

          {/* Statistical data */}
          <ToDoStats
            total={total_todos}
            pending={pending_todos}
            completed={completed_todos}
          />

          {/* search and filter  */}

          <ToDoFilters
            search={search}
            setSearch={setSearch}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            clearFilters={clearFilters}
          />

          {/* search and filter end */}

          {loading ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <p className="text-gray-500">
                Loading todos...
              </p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <p className="text-red-500 font-semibold">
                {error}
              </p>
            </div>
          ) : todos.length === 0 ? (
            <ToDoEmptyState
              setShowForm={setShowForm}
            />
          ) : filteredTodos.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <h2 className="text-xl font-bold">
                No matching todos
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or priority filter.
              </p>
            </div>
          ) : (

            <ToDoCards
              filteredTodos={sortedTodos}
              editId={editId}
              editTitle={editTitle}
              editdescription={editdescription}
              editDueDate={editDueDate}
              setEditId={setEditId}
              setEditTitle={setEditTitle}
              setEditdescription={setEditdescription}
              setEditDueDate={setEditDueDate}
              updateTodos={updateTodos}
              toggleTodo={handleToggleTodo}
              deleteTodo={handleDeleteTodo}
            />
          )}
        </div>
      </div>
    </>
  )
}
