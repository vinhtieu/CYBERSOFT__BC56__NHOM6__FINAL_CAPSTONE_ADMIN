import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../constants/constants";

const initialState = {
  table: {
    data: [],
    courseCategory: [],
    searchKey: "",
    searchItems: [],
    status: STATUS.STAND_BY,
    pageLoaded: true,
  },
  pagination: {
    pageTurned: false,
    prevPage: 0,
    activePage: 1,
    pageSize: 10,
    totalItem: 0,
  },
  addModal: {
    isOpen: false,
    newCourse: [],
    imgFile: "",
  },
  editModal: {
    isOpen: false,
    courseToEdit: {},
    courseToUpdate: [],
    traineeList: [],
    waitList: [],
  },
  deleteModal: {
    isOpen: false,
    courseToDelete: {},
  },
  deleteTraineeModal: {
    isOpen: false,
    traineeToDelete: {},
  },
};

const courseManagementSlice = createSlice({
  name: "courseManagement",
  initialState,
  reducers: {
    setIsOnLoad: (state, action) => {
      state.table.pageLoaded = action.payload;
    },
    setPrevPage: (state, action) => {
      state.pagination.prevPage = +action.payload <= 0 ? 0 : +action.payload;
    },
    setActivePage: (state, action) => {
      state.pagination.activePage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
    },
    setTotalItem: (state, action) => {
      state.pagination.totalItem = action.payload;
    },
    setData: (state, action) => {
      state.table.data = action.payload;
    },
    setNewCourse: (state, action) => {
      state.addModal.newCourse.push(action.payload);
    },
    setCategory: (state, action) => {
      state.table.courseCategory = action.payload;
    },
    setPageTurned: (state, action) => {
      state.pagination.pageTurned = action.payload;
    },
    setImgFile: (state, action) => {
      state.addModal.imgFile = action.payload;
    },
    setCourseToEdit: (state, action) => {
      state.editModal.courseToEdit = action.payload;
    },
    setCourseToUpdate: (state, action) => {
      state.editModal.courseToUpdate.push(action.payload);
    },
    setTraineeList: (state, action) => {
      state.editModal.traineeList = action.payload;
    },
    setSearchKey: (state, action) => {
      state.table.searchKey = action.payload;
    },
    setTableStatus: (state, action) => {
      state.table.status = action.payload;
    },
    setSearchedList: (state, action) => {
      state.table.searchItems = action.payload;
    },
    setCourseToDelete: (state, action) => {
      state.deleteModal.courseToDelete = action.payload;
    },

    updateURL: (state) => {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("section", "course");
      queryParams.set("page", state.pagination.activePage);
      queryParams.set("pageSize", state.pagination.pageSize);

      const newURL = `${window.location.pathname}?${queryParams.toString()}`;

      window.history.replaceState({}, "", newURL);
    },
    openDeleteModal: (state) => {
      state.deleteModal.isOpen = true;
    },
    openAddModal: (state) => {
      state.addModal.isOpen = true;
    },
    openEditModal: (state) => {
      state.editModal.isOpen = true;
    },
    closeEditModal: (state) => {
      state.editModal.isOpen = false;
    },
    closeDeleteModal: (state) => {
      state.deleteModal.isOpen = false;
    },
    closeAddModal: (state) => {
      state.addModal.isOpen = false;
    },

    setWaitList: (state, action) => {
      state.editModal.waitList = action.payload;
    },

    //Delete Trainee Modal

    openDeleteTraineeModal: (state) => {
      state.deleteTraineeModal.isOpen = true;
    },
    closeDeleteTraineeModal: (state) => {
      state.deleteTraineeModal.isOpen = false;
    },
    setTraineeToDelete: (state, action) => {
      state.deleteTraineeModal.traineeToDelete = action.payload;
    },
  },
});

export const {
  setSearchedList,
  setTraineeList,
  setTableStatus,
  setSearchKey,
  setData,
  setActivePage,
  setPrevPage,
  setPageSize,
  setTotalItem,
  setNewCourse,
  setCourseToDelete,
  setCourseToEdit,
  setCourseToUpdate,
  setCategory,
  setImgFile,
  setPageTurned,
  setIsOnLoad,
  updateURL,
  openDeleteModal,
  openAddModal,
  openEditModal,
  closeEditModal,
  closeDeleteModal,
  closeAddModal,
  //Edit Modal
  setWaitList,
  //Delete Trainee Modal
  openDeleteTraineeModal,
  closeDeleteTraineeModal,
  setTraineeToDelete,
} = courseManagementSlice.actions;

export default courseManagementSlice.reducer;
