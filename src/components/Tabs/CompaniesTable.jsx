import Table from "../ui/Table";

export default function Companies({ users }) {
  // Build companies with employee counts
  const companiesData = users.reduce((acc, user) => {
    const companyName = user.company_name || "Unknown";

    if (!acc[companyName]) {
      acc[companyName] = {
        id: companyName,
        company_name: companyName,
        company_catchPhrase: user.company_catchPhrase || "",
        company_bs: user.company_bs || "",
        employees: 0,
      };
    }

    acc[companyName].employees += 1;
    return acc;
  }, {});

  // Convert object → array for table
  const companiesArray = Object.values(companiesData);

  // Columns (added "Employees")
  const companyColumns = [
    { label: "Company", accessor: "company_name" },
    { label: "Catch Phrase", accessor: "company_catchPhrase" },
    { label: "Business Speak", accessor: "company_bs" },
    { label: "Employees", accessor: "employees" }, // NEW COLUMN
  ];

  return (
    <Table columns={companyColumns} data={companiesArray} itemsPerPage={5} />
  );
}
