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

  return (
    <>
      <div className="mb-8">
        <h3 className="text-gray-700 text-3xl font-medium">Users</h3>
        <div className="mt-8">
          <div className="flex flex-col mt-6">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Activate
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users.map((user: User) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.pictureImg}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm leading-5 font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {user.role}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {moment(user.createdAt).format("LL")}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <FiEdit
                              onClick={() => {
                                setUserdetail({
                                  email: user.email,
                                  name: user.name,
                                  role: user.role,
                                  userId: user._id,
                                  status: user.status,
                                });

                                setIsEditDialogOpen(true);
                              }}
                            />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FiTrash2
                              onClick={() => handleDeleteUser(user._id)}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
