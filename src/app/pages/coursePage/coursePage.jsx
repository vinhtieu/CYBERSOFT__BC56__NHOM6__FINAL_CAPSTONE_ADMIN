import React, { useEffect } from "react";
import Table from "./table";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../../lib/redux/constants";
import {
  handleCloseModal,
  handleDeleteCourse,
  handleSearchCourse,
  renderAddFrom,
  renderEditForm,
  handleAddCourse,
  handleGetCourseCategory,
  handleGetCourseFromAPI,
  handleGetCourseFromStorage,
  handleUpdateModal,
  renderTraineeList,
  handleDeleteTrainee,
  handleCloseDeleteTraineeModal,
  renderWaitList,
} from "./helpers";
import { Button, DeleteModal } from "../../components";
import ReactModal from "react-modal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { setIsOnLoad } from "../../../lib/redux/slices/courseManagementSlice";
import { Tabs } from "antd";

export default function CoursePage() {
  // const courseTableStatus = useSelector((state) => state.status.courseTable);
  const dispatch = useDispatch();

  //Table
  const courseList = useSelector((state) => state.courseManagement.table.data);
  const searchedList = useSelector(
    (state) => state.courseManagement.table.searchItems
  );
  const tableStatus = useSelector(
    (state) => state.courseManagement.table.status
  );
  const searchKeyword = useSelector(
    (state) => state.courseManagement.table.searchKey
  );
  const isOnLoad = useSelector(
    (state) => state.courseManagement.table.pageLoaded
  );

  //Pagination
  const currentPage = useSelector(
    (state) => state.courseManagement.pagination.activePage
  );
  const prevPage = useSelector(
    (state) => state.courseManagement.pagination.prevPage
  );
  const isPageTurned = useSelector(
    (state) => state.courseManagement.pagination.pageTurned
  );

  //Add Modal
  const isAddModalOpen = useSelector(
    (state) => state.courseManagement.addModal.isOpen
  );
  const newCourse = useSelector(
    (state) => state.courseManagement.addModal.newCourse
  );

  //Edit Modal
  const isEditModalOpen = useSelector(
    (state) => state.courseManagement.editModal.isOpen
  );
  const editTarget = useSelector(
    (state) => state.courseManagement.editModal.courseToEdit
  );
  const updateTarget = useSelector(
    (state) => state.courseManagement.editModal.courseToUpdate
  );
  const traineeList = useSelector(
    (state) => state.courseManagement.editModal.traineeList
  );
  const waitList = useSelector(
    (state) => state.courseManagement.editModal.waitList
  );

  //Delete Course Modal
  const isDeleteModalOpen = useSelector(
    (state) => state.courseManagement.deleteModal.isOpen
  );
  const deleteTarget = useSelector(
    (state) => state.courseManagement.deleteModal.courseToDelete
  );

  //Delete Trainee Modal
  const isDeleteTraineeModalOpen = useSelector(
    (state) => state.courseManagement.deleteTraineeModal.isOpen
  );
  const traineeToDelete = useSelector(
    (state) => state.courseManagement.deleteTraineeModal.traineeToDelete
  );

  const tableHeader = [
    "Course",
    "Application",
    "View",
    "Subscribe",
    "Created Date",
  ];

  const inputFields = [
    "ID",
    "Title",
    "Description",
    "Image",
    "Application",
    "Group",
  ];

  const tabItems = [
    {
      key: "1",
      label: "Info",
      forceRender: true,
      children: isEditModalOpen ? (
        renderEditForm(editTarget, inputFields)
      ) : (
        <></>
      ),
    },
    {
      key: "2",
      label: "Trainees",
      forceRender: true,
      children: isEditModalOpen ? (
        renderTraineeList(traineeList, editTarget)
      ) : (
        <></>
      ),
    },
    {
      key: "3",
      label: "WaitList",
      forceRender: true,
      children: isEditModalOpen ? renderWaitList(waitList, editTarget) : <></>,
    },
  ];

  useEffect(() => {
    isPageTurned && prevPage !== currentPage
      ? handleGetCourseFromAPI(currentPage)
      : "";
  }, [isPageTurned]);

  useEffect(() => {
    if (isOnLoad) {
      const courseList = JSON.parse(sessionStorage.getItem("courseList"));
      if (courseList) {
        handleGetCourseFromStorage(courseList);
      } else {
        handleGetCourseFromAPI();
        handleGetCourseCategory();
      }

      dispatch(setIsOnLoad(false));
    }
  }, [isOnLoad]);

  useEffect(() => {
    tableStatus === STATUS.SEARCHING
      ? handleSearchCourse(searchKeyword)
      : handleGetCourseFromAPI();
  }, [tableStatus]);

  useEffect(() => {
    const categoryList = sessionStorage.getItem("courseCategory");
    if (categoryList) {
      // handleGetCourseCategory();
    }
  }, []);

  return (
    <>
      <Table
        header={tableHeader}
        body={
          tableStatus === STATUS.SEARCHING ? searchedList : courseList
        }></Table>

      {/* //Edit Form */}
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseModal}
        className="absolute top-1/2 left-1/2 right-auto bottom-auto overflow-auto
        w-[80vw] min-[940px]:w-[50vw] min-[1200px]:w-[40vw] min-[1670px]:w-[30vw]
        h-[80vh] -mr-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-[4px] p-5 border border-[#cccccc]"
        ariaHideApp={false}
        contentLabel="User Edit Modal">
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center justify-between mb-6">
            <h2 className="inline-block text-3xl font-semibold text-gray-900">
              Details
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
          <div className="flex flex-row items-center justify-end gap-4 py-6 m-0">
            <Button onClickEvent={handleCloseModal} className="">
              Cancel
            </Button>
            <Button
              onClickEvent={() => {
                handleUpdateModal(editTarget, updateTarget);
              }}
              classNameProps="!bg-black !text-white">
              Save
            </Button>
          </div>
        </div>
      </ReactModal>

      {/* //Delete Form */}
      <DeleteModal
        title={"Delete this course"}
        alertContent={
          " You will lose all of your data by deleting this course. This action cannot be undone."
        }
        modalOpen={isDeleteModalOpen}
        deleteAction={() => {
          handleDeleteCourse(deleteTarget);
        }}
        closeAction={handleCloseModal}></DeleteModal>

      {/* //Delete Form */}
      <DeleteModal
        title={"Delete this trainee"}
        alertContent={
          " You will lose all of your data by deleting this course. This action cannot be undone."
        }
        modalOpen={isDeleteTraineeModalOpen}
        deleteAction={() => {
          handleDeleteTrainee(traineeToDelete);
        }}
        closeAction={handleCloseDeleteTraineeModal}></DeleteModal>

      {/* //Add Form */}
      <ReactModal
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseModal}
        // style={modalStyle}
        contentLabel="Example Modal"
        className="absolute top-1/2 left-1/2 right-auto bottom-auto overflow-auto
        w-[90vw] min-[940px]:w-[50vw] min-[1200px]:w-[40vw] min-[1670px]:w-[30vw]
        h-[80vh]
        -mr-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-[4px] p-5 border border-[#cccccc]"
        ariaHideApp={false}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between mb-6">
            <h2 className="inline-block text-3xl font-semibold text-gray-900">
              New Course
            </h2>
            <Button
              onClickEvent={handleCloseModal}
              classNameProps="!w-12 !h-12 !p-2 !border-0">
              <XCircleIcon></XCircleIcon>
            </Button>
          </div>
          <form className="">{renderAddFrom(inputFields)}</form>
          <div className="flex flex-row items-center justify-end gap-4 py-6">
            <Button onClickEvent={handleCloseModal} className="">
              Cancel
            </Button>
            <Button
              onClickEvent={() => {
                handleAddCourse(newCourse);
              }}
              classNameProps="!bg-black !text-white">
              Add
            </Button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}
