import { FaTrash } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  render?: (item: any) => React.ReactNode;
  isAction?: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  selectedItems: number[];
  onSort: (key: string) => void;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onDeleteSelected?: () => void;
  onSelectItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
  onEditItem: (item: any) => void;
}


function Table({
  columns,
  data,
  sortBy,
  sortOrder,
  selectedItems,
  onSort,
  onEdit,
  onDelete,
  onDeleteSelected,
  onSelectItem,
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Select
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable && onSort(column.key)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? "cursor-pointer" : ""
                }`}
              >
                {column.label}{" "}
                {sortBy === column.key && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item: any) => (
            <tr key={item.id}>
               <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onSelectItem(item.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </td>
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {item[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItems.length > 0 && onDeleteSelected && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onDeleteSelected}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
