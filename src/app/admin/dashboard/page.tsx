export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg border-t-4 border-blue-600 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Admin Control Panel</h1>
        <p className="text-gray-600">Welcome! You have successfully logged in as an ADMIN.</p>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-700">Manage Users</h2>
            <p className="text-sm text-gray-500">View and edit all system users.</p>
          </div>
          <div className="rounded border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-700">All Tasks</h2>
            <p className="text-sm text-gray-500">Monitor all ongoing tasks across the team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}