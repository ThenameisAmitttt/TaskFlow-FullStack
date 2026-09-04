export default function Toast({message,type}) {
  return (
    <>
    {message && (
          <div className="fixed top-5 right-5 z-50">
            <div className={`px-5 py-3 rounded-xl shadow-lg text-white ${type === 'success'
                ? 'bg-green-600'
                : 'bg-red-600'
              }`}
            >
              {message}
            </div>
          </div>
        )}   
    </>
  )
}
