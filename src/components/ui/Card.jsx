export default function Card({
  title,
  value,
  breakdowns = [], // array of { label, value }
  icon = null, // optional React node (e.g. icon component)
  trend = null, // optional string/JSX (e.g. "+2.5% ↑")
}) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h2>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {trend && <span className="text-sm text-green-500">{trend}</span>}
      </div>

      {breakdowns.length > 0 && (
        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
          {breakdowns.map((b, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                {b.label}
              </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {b.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
