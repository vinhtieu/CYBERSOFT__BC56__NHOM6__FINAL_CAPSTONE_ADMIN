import HTTPS from "./config";

export const userService = {
  getUsers: (currentPage = 1, key = "") => {
    return HTTPS.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01${
        typeof key === "string" && key.length > 0 ? "&tuKhoa=" + key : ""
      }&page=${currentPage}&pageSize=10`
    );
  },
  addUser: (value) => {
    return HTTPS.post("/api/QuanLyNguoiDung/ThemNguoiDung", value);
  },
  updateUser: (value) => {
    return HTTPS.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", value);
  },
  deleteUser: (account) => {
    return HTTPS.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`
    );
  },
  getUserDetail: (account) => {
    return HTTPS.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${account}`
    );
  },

  getCoursesByUser: (user) => {
    return HTTPS.post(
      `/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
      user
    );
  },

  login: (account) => {
    return HTTPS.post("/api/QuanLyNguoiDung/DangNhap", account);
  },
};

export const courseService = {
  getCourseCategory: () => {
    return HTTPS.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },

  getCourses: (currentPage) => {
    return HTTPS.get(
      `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?MaNhom=GP01&page=${currentPage}&pageSize=10`
    );
  },

  getCourseDetailById: (id) => {
    return HTTPS.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`);
  },

  searchCourse: (key) => {
    return HTTPS.get(
      `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${key}&MaNhom=GP01`
    );
  },

  getTraineeInCourse: (courseId) => {
    return HTTPS.post(
      `/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
      courseId
    );
  },

  uploadImgFile: (value) => {
    return HTTPS.post(`/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`, value);
  },

  addCourse: (value) => {
    return HTTPS.post(`api/QuanLyKhoaHoc/ThemKhoaHoc`, value);
  },

  deleteCourse: (id) => {
    return HTTPS.delete(`api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${id}`);
  },

  updateCourse: (value) => {
    return HTTPS.put(`api/QuanLyKhoaHoc/CapNhatKhoaHoc`, value);
  },

  getWaitList: (value) => {
    return HTTPS.post(
      "/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
      value
    );
  },

  registerCourse: (value) => {
    return HTTPS.post("/api/QuanLyKhoaHoc/GhiDanhKhoaHoc", value);
  },

  removeTraineeFromCourse: (value) => {
    return HTTPS.post("/api/QuanLyKhoaHoc/HuyGhiDanh", value);
  },
};
