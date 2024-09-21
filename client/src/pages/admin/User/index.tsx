import { useEffect, useState } from "react";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import ChangeRoleUser from "../../../components/ChangeRoleUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllUser, deleteUser } from "../../../features/auth/authSlice";
import { User } from "../../../types/user.types";
import { toast } from "react-toastify";

type Props = {};

const UserManagement = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.authReducer.users);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleEditRole = (role: any) => {
    setSelectedUserRole(role);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (id: any) => {
    const response = dispatch(deleteUser(id))
    toast.success("Delete User successfully!")
    dispatch(getAllUser())
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
                        Status
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
                    {userState.map((user: User) => (
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

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-2">
                          <button className="bg-yellow-100 p-3 rounded-full cursor-pointer hover:bg-yellow-200 flex items-center ">
                            <FaEdit onClick={handleEditRole} />
                          </button>
                          <button className="bg-red-400 p-3 rounded-full cursor-pointer hover:bg-red-500 hover:text-white flex items-center ">
                            <FaTrash onClick={() => handleDeleteUser(user._id)} />
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
        <ChangeRoleUser
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          role={selectedUserRole}
        />
      </div>
    </>
  );
};

export default UserManagement;
