// components/ui/Table.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function Table({ columns, data = [], itemsPerPage = 5 }) {
  const [tableData, setTableData] = useState(data);
  useEffect(() => setTableData(data), [data]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingSave, setPendingSave] = useState(null);

  // sorting config
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = (() => {
    let sortable = [...tableData];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const valA = String(a[sortConfig.key] ?? "").toLowerCase();
        const valB = String(b[sortConfig.key] ?? "").toLowerCase();
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  })();

  // search filter
  const filteredData = sortedData.filter((item) =>
    columns.some((col) =>
      String(item[col.accessor] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(
    () => setCurrentPage((p) => Math.min(p, totalPages)),
    [rowsPerPage, totalPages]
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      key = null; // remove sort if clicked 3rd time
    }
    setSortConfig({ key, direction });
  };

  // edit/save/delete logic (unchanged)
  const startEdit = (row) => {
    setEditRowId(row.id);
    setEditValues({ ...row });
  };

  // I WANTED TO TURN OF VALIDATION BECAUSE JSONPLACEHOLDER HAS ALOT OF RANDOM SYMBOLS AND CHARACTERS IN PLACES THAT SHOULDN'T HAVE THEM
  const isValid = (key, value) => {
    const columnKeys = columns.map((c) => c.accessor);
    if (!columnKeys.includes(key)) return true;

    key = key.toLowerCase();

    if (key === "name" || key === "username") {
      // Allow letters, spaces, hyphens, apostrophes
      return /^[a-zA-Z\s\-']+$/.test(value);
    }

    if (key.includes("phone")) {
      // Allow digits, spaces, +, -, (, )
      return /^[0-9+\-\s()]+$/.test(value);
    }

    if (key.includes("email")) {
      // Simple email pattern: allow @ and dots
      return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value);
    }

    if (key.includes("company")) {
      // Allow letters, numbers, spaces, &,-,().
      return /^[\w\s\-().]+$/.test(value);
    }

    // Default: allow most common characters
    return /^[\w\s\-!,()@']*$/.test(value);
  };

  const handleSave = (id) => {
    const originalRow = tableData.find((r) => r.id === id) || {};
    const hasChanges = columns.some(
      (col) =>
        String(originalRow[col.accessor] ?? "") !==
        String(editValues[col.accessor] ?? "")
    );
    if (!hasChanges) {
      toast("No changes made!", { icon: "ℹ️" });
      setEditRowId(null);
      setEditValues({});
      return;
    }
    for (const col of columns) {
      const val = String(editValues[col.accessor] ?? "");
      if (val === "") {
        setPendingSave(id);
        setModalOpen(true);
        return;
      }
      if (!isValid(col.accessor, val)) {
        toast.error(`Invalid value for ${col.label || col.accessor}`);
        return;
      }
    }
    saveRow(id);
  };

  const saveRow = (id) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...editValues } : row))
    );
    setEditRowId(null);
    setEditValues({});
    setModalOpen(false);
    setPendingSave(null);
    toast.success("Row updated!");
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setEditValues({});
    setPendingSave(null);
    setModalOpen(false);
  };

  const deleteRow = (id) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
    setCurrentPage((p) =>
      Math.max(
        1,
        Math.min(p, Math.ceil((filteredData.length - 1) / rowsPerPage) || 1)
      )
    );
    toast.success("Row deleted!");
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden relative border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-gray-200 dark:border-gray-700 gap-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Table
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-40 sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => requestSort(col.accessor)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortConfig.key === col.accessor ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort className="opacity-40" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className={
                  idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : ""
                }
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {editRowId === row.id ? (
                      <input
                        type="text"
                        value={editValues[col.accessor] ?? ""}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            [col.accessor]: e.target.value,
                          }))
                        }
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded w-full focus:outline-none"
                      />
                    ) : (
                      String(row[col.accessor] ?? "")
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {editRowId === row.id ? (
                    <>
                      <button
                        onClick={() => handleSave(row.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded-full hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-2 py-1 bg-gray-400 text-white rounded-full hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(row)}
                        className="px-2 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="px-2 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        title="Delete"
                      >
                        <TiDelete size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-6 text-gray-400 dark:text-gray-500 font-medium"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:dark:bg-gray-700"
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:dark:bg-gray-700"
        >
          Next
        </button>
      </div>

      {/* Confirm modal */}
      <Modal
        isOpen={modalOpen}
        title="Field is empty!"
        message="One or more fields are empty. Do you really want to save it empty?"
        onConfirm={() => saveRow(pendingSave)}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
