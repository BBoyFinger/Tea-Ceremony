import { useEffect, useState } from "react";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  getAllUser,
  deleteUser,
  updateUser,
} from "../../../features/auth/authSlice";
import { User } from "../../../types/user.types";
import { toast } from "react-toastify";
import { Modal } from "../../../components/Modal";
import { ROLE } from "../../../utils/role";

type Props = {};

const UserManagement = (props: Props) => {
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userDetail, setUserdetail] = useState({
    email: "",
    name: "",
    role: "",
    userId: "",
  });
  const dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.authReducer.users);

  const handleUpdateRole = () => {
    dispatch(updateUser({ userRole }));
    dispatch(getAllUser());
    // setIsEditDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleDeleteUser = (id: any) => {
    setIsDeleteDialogOpen(true);
    const response = dispatch(deleteUser(id));
    toast.success("Delete User successfully!");
    dispatch(getAllUser());
  };

  const handleOnChangeSelect = (e: any) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
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
                            <FaEdit
                              onClick={() => {
                                setUserdetail({
                                  email: user.email,
                                  name: user.name,
                                  role: user.role,
                                  userId: user._id,
                                });

                                setIsEditDialogOpen(true);
                              }}
                            />
                          </button>
                          <button className="bg-red-400 p-3 rounded-full cursor-pointer hover:bg-red-500 hover:text-white flex items-center ">
                            <FaTrash
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
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          title="Change User role"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Name: {userDetail.name}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Email: {userDetail.email}
            </p>
          </div>

          <div className="flex items-center justify-between my-4 space-x-4">
            <p className="text-sm font-medium text-gray-700">
              Role: {userDetail.role}
            </p>
            <select
              name="role"
              value={userRole}
              id="role-select"
              onChange={handleOnChangeSelect}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el} className="text-sm">
                  {el}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={handleUpdateRole}
              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-white bg-red-600 font-semibold shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto "
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setIsEditDialogOpen(false)}
              data-autofocus
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </Modal>
        {/* Delete */}
        <Modal
          open={isDeleteUserDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          title="Are u want to delete User?"
        >
          <div>hello</div>
        </Modal>
      </div>
    </>
  );
};

export default UserManagement;
