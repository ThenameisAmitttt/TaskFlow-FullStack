export default function ToDoEmptyState({setShowForm}) {
  return (
    <div>
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
        
                      <div className="text-4xl mb-3">
                        📝
                      </div>
        
                      <h2 className="text-xl font-bold text-gray-800">
                        No todos yet
                      </h2>
        
                      <p className="text-gray-500 mt-2">
                        Create your first task and start getting things done.
                      </p>
        
                      <button
                        onClick={() => setShowForm(true)}
                        className="mt-5 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
                      >
                        + Create Todo
                      </button>
        
                    </div>
    </div>
  )
}
