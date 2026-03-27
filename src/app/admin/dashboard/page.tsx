import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import TaskList from "@/components/TaskList"; // 1. Import your new component!

import CompanyCalendar from "@/components/CompanyCalendar";

export default async function AdminDashboard() {
  // 1. Grab the secure HTTP-only cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 2. Decode the payload to get the admin's details
  let user = null;
  if (token) {
    user = jwt.decode(token) as { userId: string; role: string };
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg border-t-4 border-blue-600 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Admin Control Panel</h1>
        
        {/* Dynamically displaying the Admin data! */}
        <p className="text-gray-600">
          Welcome! You have successfully logged in as an <span className="font-bold text-blue-600">{user?.role}</span>.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Admin System ID: {user?.userId}
        </p>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <h2 className="font-semibold text-gray-700">Manage Users</h2>
            <p className="mt-1 text-sm text-gray-500">View and edit all system users.</p>
          </div>
          <div className="rounded border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <h2 className="font-semibold text-gray-700">All Tasks</h2>

 


            <TaskList />
          </div>

  
        </div>

                              <div className="mt-8 rounded border border-gray-200 p-6 shadow-sm bg-white">
  <h2 className="mb-4 text-xl font-bold text-gray-800">Company Calendar</h2>
  <CompanyCalendar role={user?.role || "USER"} />
</div>
      </div>
    </div>
  );
}