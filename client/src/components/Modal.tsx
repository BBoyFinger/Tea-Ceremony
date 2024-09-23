import React, { Children } from "react";
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
  title: string;
  children: React.ReactNode;
};

export const Modal = ({ open, onClose, title, children }: Props) => {
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
                      className="text-base font-semibold leading-6 text-gray-900 text-[24px]"
                    >
                      {title}
                    </DialogTitle>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-bold outline-none focus:outline-none"
                      onClick={onClose}
                    >
                      <FaTimes className="text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                  {/* Content */}
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
