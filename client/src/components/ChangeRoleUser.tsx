import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: () => void;
  role: string | null;
};
type PermissionType = 'read' | 'write' | 'edit';

interface IErrors {
  roleName: string;
  description: string;
  permissions: [];
}

const ChangeRoleUser = ({ open, onClose, role }: Props) => {
  const [errors, setErrors] = useState<IErrors>({
    roleName: "",
    description: "",
    permissions: [],
  });
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [description, setDescription] = useState("");

  const handlePermissionChange = (permission: any) => {
    setPermissions((prev: any) =>
      prev.includes(permission)
        ? prev.filter((p: any) => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-2 pb-2 pt-2 sm:p-2 sm:pb-2">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex items-center">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Change role user
                    </DialogTitle>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-bold outline-none focus:outline-none"
                      onClick={onClose}
                    >
                      <FaTimes className="text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                  {/* Content */}
                  <div className="mt-2">
                    <form>
                      <div className="mb-4">
                        <label
                          htmlFor="roleName"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Role Name
                        </label>
                        <input
                          type="text"
                          id="roleName"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.roleName ? "border-red-500" : ""
                          }`}
                          value={roleName}
                          onChange={(e) => setRoleName(e.target.value)}
                          aria-label="Role Name"
                        />
                        {errors.roleName && (
                          <p className="text-red-500 text-xs italic">
                            {errors.roleName}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Permissions
                        </label>
                        <div className="flex flex-wrap">
                          {["Read", "Write", "Delete", "Admin"].map(
                            (permission: any) => (
                              <label
                                key={permission}
                                className="inline-flex items-center mr-4 mb-2"
                              >
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-5 w-5 text-blue-600"
                                  checked={permissions.includes(permission)}
                                  onChange={() =>
                                    handlePermissionChange(permission)
                                  }
                                  aria-label={`${permission} Permission`}
                                />
                                <span className="ml-2 text-gray-700">
                                  {permission}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                        {errors.permissions && (
                          <p className="text-red-500 text-xs italic">
                            {errors.permissions}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.description ? "border-red-500" : ""
                          }`}
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          aria-label="Role Description"
                        ></textarea>
                        {errors.description && (
                          <p className="text-red-500 text-xs italic">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-white bg-red-600 font-semibold shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto "
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  data-autofocus
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ChangeRoleUser;
