export default function ToDoCards({
  filteredTodos,
  editId,
  editTitle,
  editdescription,
  editDueDate,
  setEditId,
  setEditTitle,
  setEditdescription,
  setEditDueDate,
  updateTodos,
  toggleTodo,
  deleteTodo,
}) {


  const getDueDateStatus = (dueDate) => {
    if (!dueDate) {
      return "No due date"
    }

    const today = new Date()
    const due = new Date(dueDate + "T00:00:00")

    today.setHours(0, 0, 0, 0)

    const difference = due - today

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )

    if (days < 0) {
      return `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""}`
    }

    if (days === 0) {
      return "Due today"
    }

    if (days === 1) {
      return "Due tomorrow"
    }

    return `Due in ${days} days`
  }


  return (
    <>

      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-4 transition hover:shadow-md ${todo.iscompleted ? "opacity-70" : ""
            }`}
        >

          {editId === todo.id ? (
            <div className="space-y-4">

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <textarea
                value={editdescription}
                onChange={(e) => setEditdescription(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                rows="3"
              />

              <input
                type="date"
                value={editDueDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3
             outline-none focus:ring-2 focus:ring-black"
              />

              <div className="flex gap-3">

                <button
                  onClick={() => updateTodos(todo.id)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

              </div>

            </div>
          ) : (
            <div className="flex items-start gap-4">

              <input
                type="checkbox"
                checked={todo.iscompleted}
                onChange={() => toggleTodo(todo.id, todo.iscompleted)}
                className="mt-1 w-5 h-5"
              />

              <div className="flex-1">

                <div className="flex items-center justify-between gap-3">

                  <h2
                    className={`font-bold text-xl ${todo.iscompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                      }`}
                  >
                    {todo.title}
                  </h2>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${todo.priority === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : todo.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                      }`}
                  >
                    {todo.priority}
                  </span>

                </div>

                <p className={`text-gray-500 mt-2 ${todo.iscompleted
                  ? "line-through text-gray-400"
                  : "text-gray-500"
                  }`}>
                  {todo.description}
                </p>
                <p className='text-sm text-gray-400 mt-3'>
                  Created : {new Date(todo.created_at).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p className='text-sm text-gray-400 mt-2'>
                  Due : {todo.due_date
                    ? new Date(todo.due_date + 'T00:00:00').toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                    : 'No due date'
                  }
                </p>
                {todo.due_date && !todo.iscompleted && (
                  <p className="text-sm font-semibold mt-1">
                    {getDueDateStatus(todo.due_date)}
                  </p>
                )}

                <div className="flex mt-4 justify-between">

                  <button
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTitle(todo.title);
                      setEditdescription(todo.description);
                      setEditDueDate(todo.due_date || '')
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => {
                      if (window.confirm("Do you sure want to delete this todo")) {
                        deleteTodo(todo.id);
                      }
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          )}
        </div>
      ))}
    </>
  )
}
