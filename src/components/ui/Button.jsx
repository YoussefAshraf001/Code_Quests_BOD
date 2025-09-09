export default function Button({
  onClick,
  icon,
  label,
  compactBar,
  color = "primary", // "primary" | "danger"
}) {
  const styles = {
    primary: `
      border border-[#6960d0] text-[#6960d0] 
      hover:bg-[#6960d0] hover:text-white
      dark:border-[#8f88e6] dark:text-[#8f88e6]
      dark:hover:bg-[#6960d0] dark:hover:text-white
    `,
    danger: `
      border border-red-400 text-red-600 
      hover:bg-red-500 hover:text-white
      dark:border-red-500 dark:text-red-400
      dark:hover:bg-red-600 dark:hover:text-white
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${styles[color]}`}
    >
      {icon}
      {!compactBar && <span>{label}</span>}
    </button>
  );
}
