import React from "react";
import ReactModal from "react-modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Button from "./button";

export default function DeleteModal({
  modalOpen,
  closeAction,
  deleteAction,
  title,
  alertContent,
}) {
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={closeAction}
      className=""
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          padding: "0",
          maxWidth: "90vw",
          maxHeight: "60vh",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: "70",
        },
      }}
      contentLabel="Example Modal"
      ariaHideApp={false}>
      <div className="inset-x-0 p-4 bg-white rounded-lg tablet:max-w-md">
        <div className="items-center tablet:flex">
          <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto border border-gray-300 rounded-full">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
          </div>
          <div className="mt-4 text-center tablet:mt-0 tablet:ml-6 tablet:text-left">
            <p className="text-lg font-bold">{title}</p>
            <p className="mt-1 text-base text-gray-700">{alertContent}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end mt-4 space-x-0 space-y-2 text-center tablet:flex-row tablet:space-y-0 tablet:space-x-2 tablet:text-right">
          <Button
            onClickEvent={deleteAction}
            classNameProps="text-black bg-white">
            Delete Account
          </Button>
          <Button
            onClickEvent={closeAction}
            classNameProps="text-white bg-black ">
            Cancel
          </Button>
        </div>
      </div>
    </ReactModal>
  );
}
