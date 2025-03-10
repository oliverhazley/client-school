function NotificationPopup({ message, type, onClose }) {
  if (!message) return null

  // type can be "success" or "error" for color styling
  const bgColor = type === 'error' ? 'bg-red-600' : 'bg-green-600'

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* notification box */}
      <div className={`relative p-4 rounded shadow-lg ${bgColor} text-white w-80`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          ✕
        </button>
        <p className="text-center">{message}</p>
      </div>
    </div>
  )
}

export default NotificationPopup
