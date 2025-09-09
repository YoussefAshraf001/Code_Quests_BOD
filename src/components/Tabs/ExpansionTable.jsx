import Table from "../ui/Table";

export default function Expansions({ todos, users }) {
  // Transform todos into table-friendly data
  const expansionsData = todos.map((todo) => {
    const user = users.find((u) => u.id === todo.userId);
    return {
      id: todo.id,
      expansion_title: todo.title,
      expansion_status: todo.completed ? "Completed" : "Pending",
      expansion_userId: todo.userId,
      assigned_to: user ? user.name : "Unassigned",
    };
  });

  // Define columns
  const expansionColumns = [
    { label: "Title", accessor: "expansion_title" },
    { label: "Status", accessor: "expansion_status" },
    { label: "User ID", accessor: "expansion_userId" },
    { label: "Assigned To", accessor: "assigned_to" },
  ];

  return (
    <Table columns={expansionColumns} data={expansionsData} itemsPerPage={10} />
  );
}
