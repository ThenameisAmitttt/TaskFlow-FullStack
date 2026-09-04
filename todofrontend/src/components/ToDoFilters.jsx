export default function ToDoFilters({
    search,
    setSearch,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption,
    clearFilters,
}) {
    return (
        <>

            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">

                <div className="flex flex-wrap gap-3">

                    <input
                        type="text"
                        placeholder="Search your todos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="">All Priorities</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="priority-high">Priority : High → Low</option>
                        <option value="priority-low">Priority : Low → High</option>
                    </select>

                    <button
                        onClick={clearFilters}
                        className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Clear Filters
                    </button>

                </div>

            </div>
        </>
    )
}
