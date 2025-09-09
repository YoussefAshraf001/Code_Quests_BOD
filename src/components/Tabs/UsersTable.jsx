import Table from "../ui/Table";

const userColumns = [
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Username", accessor: "username" },
  { label: "City", accessor: "address_city" },
  { label: "Company", accessor: "company_name" },
  { label: "Phone", accessor: "phone" },
  { label: "Website", accessor: "website" },
];

export default function UsersTable({ users }) {
  return <Table columns={userColumns} data={users} itemsPerPage={5} />;
}
