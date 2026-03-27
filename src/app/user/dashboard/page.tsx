import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CreateTask from "@/components/CreateTask";
import TaskList from "@/components/TaskList";
import CompanyCalendar from "@/components/CompanyCalendar";

export default async function UserDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;
  if (token) {
    user = jwt.decode(token) as { userId: string; role: string };
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Employee Dashboard</h1>
        
        <p className="text-gray-600">
          Welcome! You are logged in with the role: <span className="font-bold text-blue-600">{user?.role}</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Your System ID: {user?.userId}
        </p>
        
        {/* The Layout: Form on the left, List on the right */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          
          <div>
            <CreateTask />
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-700">Your Assigned Tasks</h2>
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