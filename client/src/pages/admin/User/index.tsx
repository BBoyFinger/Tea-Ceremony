import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ImSpinner3 } from "react-icons/im";

import {
  getAllUser,
  deleteUser,
  updateUser,
  resetState,
} from "../../../features/auth/authSlice";
import { User } from "../../../types/user.types";
import { toast } from "react-toastify";
import { Modal } from "../../../components/ui/Modal";
import { Account, ROLE } from "../../../utils/User";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/ui/Table";

type Props = {};

const UserManagement = (props: Props) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [userRole, setUserRole] = useState("ADMIN");
  const [status, setStatus] = useState("Active");
  const [userDetail, setUserdetail] = useState({
    email: "",
    name: "",
    role: "",
    userId: "",
    status: "",
  });
  const dispatch: AppDispatch = useDispatch();
  // Selector from redux

  const userState = useSelector((state: RootState) => state.authReducer);
  const { users, isLoading } = userState;

  const handleUpdateRole = () => {
    dispatch(
      updateUser({ userId: userDetail.userId, role: userRole, status: status })
    );
    setIsEditDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(resetState());
  }, [dispatch]);

  const handleDeleteUser = async (id: any) => {
    if (window.confirm("Are u sure you want to delete this user?")) {
      await dispatch(deleteUser(id));
      toast.success("Delete User successfully!");
      dispatch(getAllUser());
    }
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Activate", sortable: true },
  ];

  const handleSelectItem = () => {};

  return (
    <>
      <div className="mb-8">
        <h3 className="text-gray-700 text-3xl font-medium">Users</h3>
        <div>
          <Table
            selectedItems={[]}
            onSelectItem={handleSelectItem}
            onDeleteItem={handleDeleteUser}
            onEditItem={handleSelectItem}
            onSort={handleSelectItem}
            onEdit={handleUpdateRole}
            onDelete={handleDeleteUser}
            sortBy=""
            sortOrder="asc"
            columns={columns}
            data={users}
          />
        </div>
        {/* Edit */}
        <Modal
          isOpen={isEditDialogOpen}
          closeModal={() => setIsEditDialogOpen(false)}
          title="Change User role"
          onSubmit={handleUpdateRole}
          submitText="Save"
          cancelText="Cancel"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              value={userDetail.name}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              value={userDetail.email}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>

          <div className="mb-4 flex gap-4 items-center justify-between">
            <label
              htmlFor="Role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              value={userRole}
              id="role-select"
              onChange={(e) => {
                setUserRole(e.target.value);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el} className="text-sm">
                  {el}
                </option>
              ))}
            </select>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              value={status}
              id="role-select"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(Account).map((el) => (
                <option value={el} key={el} className="text-sm">
                  {el}
                </option>
              ))}
            </select>
          </div>
        </Modal>
        {isLoading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center flex-col">
              <ImSpinner3 className="animate-spin w-[40px] h-[40px]" />

              <p className="mt-4 text-gray-700">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagement;
