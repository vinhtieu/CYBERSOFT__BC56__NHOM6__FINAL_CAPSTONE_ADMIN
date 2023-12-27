import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { Toaster } from "react-hot-toast";
import Table from "./table";
import { useDispatch, useSelector } from "react-redux";

import {
  XCircleIcon,
  PencilSquareIcon,
  Cog8ToothIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { Card, Tabs } from "antd";
import { Button, DeleteModal } from "../../components";
import Meta from "antd/es/card/Meta";
import {
  handleCloseModal,
  handleDeleteUser,
  handleGetUsersFromAPI,
  handleUpdateUser,
  handleSearchUser,
  handleGetUsersFromStorage,
  renderAddForm,
  handleAddUser,
  renderEditForm,
} from "./helpers";
import "./style.css";
import { setIsOnLoad } from "../../../../lib/redux/slices/userManagementSlice";
import { STATUS } from "../../../../lib/constants";

export default function User() {
  // Table
  const tableStatus = useSelector((state) => state.userManagement.table.status);
  const searchKey = useSelector(
    (state) => state.userManagement.table.searchKey
  );
  const userList = useSelector((state) => state.userManagement.table.data);

  // Pagination
  const currentPage = useSelector(
    (state) => state.userManagement.pagination.activePage
  );
  const prevPage = useSelector(
    (state) => state.userManagement.pagination.prevPage
  );
  const isPageTurned = useSelector(
    (state) => state.userManagement.pagination.pageTurned
  );
  const isOnLoad = useSelector((state) => state.userManagement.table.pageLoad);

  // Edit modal
  const userCourses = useSelector(
    (state) => state.userManagement.editModal.courses
  );
  const userDetail = useSelector(
    (state) => state.userManagement.editModal.dataToEdit
  );
  const editedUser = useSelector(
    (state) => state.userManagement.editModal.dataToUpdate
  );
  const editModalOpen = useSelector(
    (state) => state.userManagement.editModal.isOpen
  );

  // Delete modal
  const deleteTarget = useSelector(
    (state) => state.userManagement.deleteModal.userToDelete
  );
  const deleteModalOpen = useSelector(
    (state) => state.userManagement.deleteModal.isOpen
  );

  // Add modal
  const addModalOpen = useSelector(
    (state) => state.userManagement.addModal.isOpen
  );

  const addTarget = useSelector(
    (state) => state.userManagement.addModal.userToCreate
  );
  const dispatch = useDispatch();

  const tableHeader = ["Name", "Account", "Email", "Type", "Telephone"];

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "30vw",
      minWidth: "30vw",
      maxWidth: "80vw",
      height: "62vh",
      minHeight: "40vh",
      maxHeight: "80vh",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const inputFields = [
    "Full Name",
    "Username",
    "Password",
    "Email Address",
    "Phone Number",
    "Position",
    "Group",
  ];

  const tabItems = [
    {
      key: "1",
      label: "Info",
      forceRender: true,
      children: !editModalOpen ? (
        <span></span>
      ) : (
        renderEditForm(inputFields, userDetail)
      ),
    },
    {
      key: "2",
      label: "Courses",
      forceRender: true,
      children: !editModalOpen ? (
        <span></span>
      ) : (
        <div className="flex flex-row flex-wrap w-full h-full overflow-auto">
          {userCourses.length > 0 ? (
            userCourses.map((course) => {
              return (
                <section key={course.maKhoaHoc} className="w-1/2 p-2">
                  <Card
                    rootClassName="w-full"
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <PencilSquareIcon
                        className="w-6 h-6 mx-auto"
                        key="setting"
                      />,
                      <Cog8ToothIcon className="w-6 h-6 mx-auto" key="edit" />,
                      <EllipsisHorizontalIcon
                        className="w-6 h-6 mx-auto"
                        key="ellipsis"
                      />,
                    ]}>
                    <Meta
                      // avatar={
                      //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                      // }
                      title={course.tenKhoaHoc}
                      // description={}
                    />
                  </Card>
                </section>
              );
            })
          ) : (
            <figure className="w-full h-full mb-0">
              <img
                // key={course.m5aKhoaHoc}
                className="w-[95%] h-full object-contain mx-auto"
                src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
                alt=""
              />
            </figure>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    // const queryParams = new URLSearchParams(window.location.search);
    // const savedPage = +queryParams.get("page");

    if (isPageTurned && prevPage !== currentPage) {
      handleGetUsersFromAPI(currentPage);
    } else if (isOnLoad) {
      const userList = JSON.parse(sessionStorage.getItem("userList"));
      if (userList) {
        handleGetUsersFromStorage(userList);
      } else {
        handleGetUsersFromAPI();
      }
    }

    dispatch(setIsOnLoad(false));
  }, [isPageTurned, isOnLoad]);

  useEffect(() => {
    if (tableStatus === STATUS.SEARCHING) {
      handleSearchUser(1, searchKey);
    } else {
      handleGetUsersFromAPI();
    }
  }, [tableStatus]);

  return (
    <>
      <Table header={tableHeader} body={userList}></Table>

      {/* //Edit Form */}
      <ReactModal
        isOpen={editModalOpen}
        onRequestClose={handleCloseModal}
        className="absolute top-1/2 left-1/2 right-auto bottom-auto overflow-auto
        w-[80vw] min-[940px]:w-[50vw] min-[1200px]:w-[40vw] min-[1670px]:w-[30vw]
        h-auto -mr-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-[4px] p-5 border border-[#cccccc]"
        ariaHideApp={false}
        contentLabel="User Edit Modal">
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center justify-between mb-6">
            <h2 className="inline-block text-3xl font-semibold text-gray-900">
              Profile
            </h2>
            <Button
              onClickEvent={handleCloseModal}
              classNameProps="!w-12 !h-12 !p-2 !border-0">
              <XCircleIcon></XCircleIcon>
            </Button>
          </div>
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            rootClassName="flex-1 flex-col"
          />
          <div className="flex flex-row items-center justify-end gap-4 py-6">
            <Button onClickEvent={handleCloseModal} className="">
              Cancel
            </Button>

            <Button
              onClickEvent={() => {
                handleUpdateUser(userDetail, editedUser);
              }}
              classNameProps="!bg-black !text-white">
              Save
            </Button>
          </div>
        </div>
      </ReactModal>

      {/* //Delete Form */}

      <DeleteModal
        title={"Delete your account"}
        alertContent={
          "  You will lose all of your data by deleting your account. This action cannot be undone."
        }
        modalOpen={deleteModalOpen}
        deleteAction={() => {
          handleDeleteUser(deleteTarget);
        }}
        closeAction={handleCloseModal}></DeleteModal>

      {/* Add Modal */}
      <ReactModal
        isOpen={addModalOpen}
        onRequestClose={handleCloseModal}
        // style={modalStyle}
        contentLabel="Example Modal"
        className="absolute top-1/2 left-1/2 right-auto bottom-auto overflow-auto
        w-[80vw] min-[940px]:w-[50vw] min-[1200px]:w-[40vw] min-[1670px]:w-[30vw]
        h-auto
        -mr-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-[4px] p-5 border border-[#cccccc]"
        ariaHideApp={false}>
        <div className="flex flex-row items-center justify-between mb-6">
          <h2 className="inline-block text-3xl font-semibold text-gray-900">
            New User
          </h2>
          <Button
            onClickEvent={handleCloseModal}
            classNameProps="!w-12 !h-12 !p-2 !border-0">
            <XCircleIcon></XCircleIcon>
          </Button>
        </div>

        <form className="">{renderAddForm(inputFields)}</form>
        <div className="flex flex-row items-center justify-end gap-4 py-6">
          <Button onClickEvent={handleCloseModal} className="">
            Cancel
          </Button>
          <Button
            onClickEvent={() => {
              handleAddUser(addTarget);
            }}
            classNameProps="!bg-black !text-white">
            Add
          </Button>
        </div>
      </ReactModal>
    </>
  );
}
