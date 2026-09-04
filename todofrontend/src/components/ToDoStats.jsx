export default function ToDoStats({total,pending,completed}) {
  return (
    <div>
        <div className="flex gap-5 mb-6">

            <div className="flex-1 bg-blue-50 rounded-xl p-5 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">
                {total}
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-1">
                TOTAL
              </div>
            </div>

            <div className="flex-1 bg-orange-50 rounded-xl p-5 text-center border border-orange-100">
              <div className="text-3xl font-bold text-orange-500">
                {pending}
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-1">
                PENDING
              </div>
            </div>

            <div className="flex-1 bg-green-50 rounded-xl p-5 text-center border border-green-100">
              <div className="text-3xl font-bold text-green-600">
                {completed}
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-1">
                COMPLETED
              </div>
            </div>

          </div>
    </div>
  )
}
