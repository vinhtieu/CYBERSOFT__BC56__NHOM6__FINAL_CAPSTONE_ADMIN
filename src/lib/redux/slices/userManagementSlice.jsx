import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../constants";

const initialState = {
  table: {
    data: [],
    searchKey: "",
    searchItems: [],
    isSearch: false,
    status: STATUS.STAND_BY,
    pageLoad: true,
  },
  pagination: {
    prevPage: 0,
    activePage: 1,
    pageSize: 10,
    pageTurned: false,
    totalItem: 0,
  },
  editModal: {
    isOpen: false,
    courses: {},
    dataToEdit: {},
    dataToUpdate: [],
  },
  deleteModal: {
    isOpen: false,
    userToDelete: {},
  },
  addModal: {
    isOpen: false,
    userToCreate: [],
  },
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    //Table
    setSearchKey: (state, action) => {
      state.table.searchKey = action.payload;
    },

    setTableStatus: (state, action) => {
      state.table.status = action.payload;
    },

    setSearchedList: (state, action) => {
      state.table.searchItems = action.payload;
    },

    setData: (state, action) => {
      state.table.data = action.payload;
    },

    setIsOnLoad: (state, action) => {
      state.table.pageLoad = action.payload;
    },

    // Pagination
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
    setPageTurned: (state, action) => {
      state.pagination.pageTurned = action.payload;
    },

    //Edit Modal

    openEditModal: (state) => {
      state.editModal.isOpen = true;
    },
    closeEditModal: (state) => {
      state.editModal.isOpen = false;
    },
    setCourses: (state, action) => {
      state.editModal.courses = action.payload;
    },
    setDataToEdit: (state, action) => {
      state.editModal.dataToEdit = action.payload;
    },
    setDataToUpdate: (state, action) => {
      state.editModal.dataToUpdate.push(action.payload);
    },

    //Delete Modal
    openDeleteModal: (state) => {
      state.deleteModal.isOpen = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModal.isOpen = false;
    },
    setUserToDelete: (state, action) => {
      state.deleteModal.userToDelete = action.payload;
    },

    //Add Modal
    openAddModal: (state) => {
      state.addModal.isOpen = true;
    },
    closeAddModal: (state) => {
      state.addModal.isOpen = false;
    },
    setUserToCreate: (state, action) => {
      state.addModal.userToCreate.push(action.payload);
    },

    updateURL: (state) => {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("section", "course");
      queryParams.set("page", state.pagination.page);
      queryParams.set("pageSize", state.pagination.pageSize);

      const newURL = `${window.location.pathname}?${queryParams.toString()}`;

      window.history.replaceState({}, "", newURL);
    },
  },
});

export const {
  //Table
  setData,

  //Pagination

  //Edit Modal

  //Delete modal

  //Add Modal
  openAddModal,
  closeAddModal,
  setUserToCreate,
  searchOn,
  searchOff,
  setSearchedList,
  setTableStatus,
  setSearchKey,
  setPageSize,
  setTotalItem,
  updateURL,
  openDeleteModal,
  closeDeleteModal,
  setUserToDelete,
  //Edit Modal
  openEditModal,
  closeEditModal,
  setCourses,
  setDataToEdit,
  setDataToUpdate,
  turnPageOn,
  turnPageOff,
  setPrevPage,
  setActivePage,
  setPageTurned,
  setIsOnLoad,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
