import { useState } from 'react'
import { addTodo } from '../api/todoApi'

export default function ToDoForms({ onTodoAdded }) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await addTodo({
        title: title,
        description: description,
        priority: priority,
        due_date: dueDate,
      });
      
      onTodoAdded(data);

      // Clear form after submitting
      setTitle("");
      setDescription("");
      setPriority("");
      setDueDate("");
      setError("");

    }
    catch (error) {

      console.log(error);

      setError("Unable to add todo. Please try again");

    }

  };

return (
  <form onSubmit={handleSubmit} className="space-y-5">
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
        {error}
      </div>
    )}

    {/* Title */}

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Title
      </label>

      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3
                     outline-none transition
                     focus:ring-2 focus:ring-black
                     focus:border-transparent"
        required
      />
    </div>


    {/* Description */}

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>

      <textarea
        placeholder="Add some details about this task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        className="w-full border border-gray-200 rounded-xl px-4 py-3
                     outline-none resize-none transition
                     focus:ring-2 focus:ring-black
                     focus:border-transparent"
      />
    </div>


    {/* Priority */}

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Priority
      </label>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3
                     outline-none bg-white transition
                     focus:ring-2 focus:ring-black
                     focus:border-transparent"
        required
      >
        <option value="">Select priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </div>

    {/* due Date  */}

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Due Date
      </label>

      <input
        type="date"
        min={today}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3
               outline-none bg-white transition
               focus:ring-2 focus:ring-black
               focus:border-transparent"
      />
    </div>

    {/* Submit */}

    <div className="flex justify-end pt-2">

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-xl
                     font-medium
                     hover:bg-gray-800
                     active:scale-95
                     transition"
      >
        + Add Todo
      </button>

    </div>

  </form>
)
}