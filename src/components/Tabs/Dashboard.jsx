import Card from "../ui/Card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ users, todos }) {
  const totalUsers = users.length;
  const totalCompanies = new Set(users.map((u) => u.company_name)).size;
  const totalTodos = todos.length;

  // User with most todos
  const todosCountByUser = todos.reduce((acc, todo) => {
    acc[todo.userId] = (acc[todo.userId] || 0) + 1;
    return acc;
  }, {});

  // Company with most employees
  const companyEmployees = users.reduce((acc, user) => {
    acc[user.company_name] = (acc[user.company_name] || 0) + 1;
    return acc;
  }, {});
  const largestCompany = Object.keys(companyEmployees).reduce(
    (a, b) => (companyEmployees[a] > companyEmployees[b] ? a : b),
    null
  );

  // Todos per user chart
  const todosChartData = users.map((u) => ({
    name: u.username
      ? u.username.length > 10
        ? u.username.slice(0, 10) + "…"
        : u.username
      : `User ${u.id}`,
    todos: todosCountByUser[u.id] || 0,
  }));

  // Active users = users with more than 5 todos
  const activeUsers = users.filter(
    (u) => (todosCountByUser[u.id] || 0) > 5
  ).length;

  // Completed vs pending todos
  const completedTodos = todos.filter((t) => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  // Fake revenue chart
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 8000 },
    { month: "Mar", revenue: 16585 },
    { month: "Apr", revenue: 11000 },
    { month: "May", revenue: 5000 },
    { month: "Jun", revenue: 25000 },
    { month: "Jul", revenue: 30000 },
  ];

  // Fake table data
  const topItems = [
    {
      title: "NCLEX Masterclass",
      status: "Premium",
      players: 12500,
      owner: "Nursing Excellence",
      stake_holder: "STKH-98231",
    },
    {
      title: "Pathophysiology",
      status: "Free",
      players: 9200,
      owner: "NursePrep",
      stake_holder: "STKH-10452",
    },
    {
      title: "Pharmacology",
      status: "Premium",
      players: 8700,
      owner: "UWorld NCLEX Prep",
      stake_holder: "STKH-77419",
    },
    {
      title: "Anatomy & Physiology",
      status: "Free",
      players: 7600,
      owner: "MedLearn Academy",
      stake_holder: "STKH-55387",
    },
    {
      title: "Critical Care Scenarios",
      status: "Premium",
      players: 6400,
      owner: "NurseCritical",
      stake_holder: "STKH-66420",
    },
    {
      title: "Pediatric Nursing Essentials",
      status: "Free",
      players: 5800,
      owner: "Care4Kids Institute",
      stake_holder: "STKH-82311",
    },
  ];

  return (
    <div className="p-3 space-y-6 bg-gray-50 dark:bg-gray-900 max-h-full transition-colors">
      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            title="Total Users"
            value={totalUsers}
            trend="+2.5% ↑"
            breakdowns={[
              { label: "Active", value: activeUsers },
              { label: "Companies", value: totalCompanies },
            ]}
          />

          <Card
            title="Total Todos"
            value={totalTodos}
            breakdowns={[
              { label: "Completed", value: completedTodos },
              { label: "Pending", value: pendingTodos },
            ]}
          />

          <Card
            title="Companies"
            value={totalCompanies}
            breakdowns={[
              { label: "Largest", value: largestCompany },
              { label: "Employees", value: companyEmployees[largestCompany] },
            ]}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Todos per User */}
        <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow p-4 transition-colors">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Todos per User
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={todosChartData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#f9fafb",
                }}
              />
              <Bar
                dataKey="todos"
                fill="#818cf8"
                barSize={30}
                activeBar={{ fill: "#6366f1" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow p-4 transition-colors">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Revenue Summary
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#f9fafb",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f87171"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow p-4 transition-colors">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Most Popular Items
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
              <th className="py-2">Title</th>
              <th>Status</th>
              <th>Total Players</th>
              <th>Owner</th>
              <th>Stakes</th>
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-2 text-gray-800 dark:text-gray-100">
                  {item.title}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === "Premium"
                        ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                        : "bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-gray-800 dark:text-gray-100">
                  {item.players.toLocaleString()}
                </td>
                <td className="text-gray-800 dark:text-gray-100">
                  {item.owner}
                </td>
                <td className="text-blue-600 dark:text-blue-400">
                  {item.stake_holder}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
