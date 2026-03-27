import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function UserDashboard() {
  // 1. Grab the cookie store and get our token
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 2. Decode the payload to get the user data
  // We can safely use jwt.decode here (instead of verify) because our middleware 
  // has already guaranteed this token is 100% valid and secure before letting them on this page!
  let user = null;
  if (token) {
    user = jwt.decode(token) as { userId: string; role: string };
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Employee Dashboard</h1>
        
        {/* Dynamically displaying the data from the token! */}
        <p className="text-gray-600">
          Welcome! You are logged in with the role: <span className="font-bold text-blue-600">{user?.role}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Your unique System ID is: {user?.userId}
        </p>
        
        <div className="mt-8 rounded border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-lg font-semibold text-gray-700">Your Tasks</h2>
          <p className="mt-2 text-sm text-gray-500">
            No tasks assigned yet.
          </p>
        </div>
      </div>
    </div>
  );
}