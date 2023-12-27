import { courseService } from "../../../api/service";
import { STATUS } from "../../../lib/redux/constants";
import {
  openEditModal,
  setCourseToDelete,
  openDeleteModal,
  closeDeleteModal,
  closeEditModal,
  setData,
  setActivePage,
  setTotalItem,
  setCourseToEdit,
  setSearchedList,
  closeAddModal,
  setNewCourse,
  setCourseToUpdate,
  setCategory,
  setPageTurned,
  setPrevPage,
  setTraineeList,
  setTraineeToDelete,
  openDeleteTraineeModal,
  closeDeleteTraineeModal,
  setWaitList,
} from "../../../lib/redux/slices/courseManagementSlice";
// import { setCourseTableDataStatus } from "../../../../lib/redux/slices/statusSlice";
import store from "../../../lib/redux/store";
import { ImageUploader, Menu } from "../../components";
import toast from "react-hot-toast";
import moment from "moment/moment";
import { faker } from "@faker-js/faker";
import { TrashIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

export const notification = (callback) => {};

export const uploadImage = (file, title) => {
  const fileBlob = dataURLtoBlob(file);
  const imgFileData = new FormData();
  imgFileData.append("file", fileBlob);
  imgFileData.append("tenKhoaHoc", title);

  courseService
    .uploadImgFile(imgFileData)
    .then((res) => {
      console.log(res);
      sessionStorage.removeItem("imgFile");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const dataURLtoBlob = (dataURL) => {
  const parts = dataURL.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

export const removeDuplicate = (array) => {
  return [...new Set(array)];
};

export const handleCloseModal = () => {
  store.dispatch(closeDeleteModal());
  store.dispatch(closeEditModal());
  store.dispatch(closeAddModal());
};

export const handleCloseDeleteTraineeModal = () => {
  store.dispatch(closeDeleteTraineeModal());
};

//Table

export const getPlaceholders = (course, field) => {
  if (field === "ID") return course.maKhoaHoc;
  if (field === "Title") return course.tenKhoaHoc;
};

export const renderEditForm = (course, fields) => {
  return fields.map((field, index) => {
    switch (field) {
      case "Title":
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6 ">
            <dt className="my-auto text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <input
              onChange={(e) => {
                const key = field.toLowerCase();
                store.dispatch(
                  setCourseToUpdate({
                    [key]: e.target.value,
                  })
                );
              }}
              type="text"
              name={field.toLowerCase()}
              id={field.toLowerCase()}
              autoComplete=""
              placeholder={getPlaceholders(course, field)}
              className="col-span-2 block w-full p-2 text-gray-900 placeholder:text-black  sm:text-base sm:leading-6 border rounded-md border-[#cccccc]  focus:border-black focus-visible:outline-none"
            />
          </div>
        );
      case "Description":
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <textarea
              onChange={(e) => {
                store.dispatch(
                  setCourseToUpdate({ description: `${e.target.value}` })
                );
              }}
              type="text"
              name={field.toLowerCase()}
              id={field.toLowerCase()}
              placeholder={course.moTa}
              autoComplete=""
              className="h-32 col-span-2 block w-full p-2 text-gray-900 placeholder:text-black  sm:text-base sm:leading-6 border rounded-md border-[#cccccc]  "
            />
          </div>
        );
      case "Image":
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <div className="flex flex-col h-auto col-span-2">
              <ImageUploader
                setName={(fileName) => {
                  store.dispatch(setCourseToUpdate({ image: fileName }));
                }}></ImageUploader>
            </div>
          </div>
        );
      case "Type":
        const types = [];
        for (let i = 0, length = 16; i < length; i++) {
          const y = i + 1;
          types.push({
            key: `${i}`,
            label: `${y < 10 ? "GP0" + y : "GP" + y}`,
          });
        }

        return (
          <div
            key={index}
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <Menu
              title={field}
              menuItems={types}
              selectedItem={course.maNhom}
              action={(item, title) => {
                store.dispatch(
                  setCourseToUpdate({ [title.toLowerCase()]: item.label })
                );
              }}></Menu>
          </div>
        );
      case "Application":
        const categories = JSON.parse(sessionStorage.getItem("courseCategory"));
        const applications = categories.map((category, index) => ({
          key: `${index}`,
          label: category,
        }));
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <Menu
              title={field}
              menuItems={applications}
              selectedItem={course?.danhMucKhoaHoc?.maDanhMucKhoahoc}
              action={(item, title) => {
                store.dispatch(
                  setCourseToUpdate({ [title.toLowerCase()]: item.label })
                );
              }}></Menu>
          </div>
        );
    }
  });
};

export const renderAddFrom = (inputFields) => {
  return inputFields.map((field, index) => {
    switch (field) {
      case "ID":
      case "Title":
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6 ">
            <dt className="my-auto text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <input
              onChange={(e) => {
                const key = field.toLowerCase();
                store.dispatch(
                  setNewCourse({
                    [key]: e.target.value,
                  })
                );
              }}
              type="text"
              name=""
              id=""
              autoComplete=""
              className="col-span-2 block w-full p-2 text-gray-900 rounded-md placeholder:text-black  sm:text-base sm:leading-6 border border-[#cccccc]  focus:border-black focus-visible:outline-none"
            />
          </div>
        );
      case "Description":
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6 ">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <textarea
              onChange={(e) => {
                store.dispatch(
                  setNewCourse({ description: `${e.target.value}` })
                );
              }}
              type="text"
              name=""
              id=""
              autoComplete=""
              className="h-32 col-span-2 block w-full p-2 text-gray-900 placeholder:text-black  sm:text-base sm:leading-6 border-2 rounded-md border-[#cccccc]  "
            />
          </div>
        );
      case "Image":
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6 ">
            <dt className="my-auto text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <div className="flex flex-col h-auto col-span-2">
              <ImageUploader
                setName={(fileName) => {
                  store.dispatch(setNewCourse({ image: fileName }));
                }}></ImageUploader>
            </div>
          </div>
        );
      case "Application":
        const categories = JSON.parse(sessionStorage.getItem("courseCategory"));
        const applications = categories
          ? categories.map((category, index) => ({
              key: `${index}`,
              label: category,
            }))
          : "";
        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6 ">
            <dt className="my-auto text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <Menu
              title={field}
              menuItems={applications}
              action={(item, title) => {
                store.dispatch(
                  setNewCourse({ [title.toLowerCase()]: item.label })
                );
              }}></Menu>
          </div>
        );
      case "Group":
        const types = [];
        for (let i = 0, length = 16; i < length; i++) {
          const y = i + 1;
          types.push({
            key: `${i}`,
            label: `${y < 10 ? "GP0" + y : "GP" + y}`,
          });
        }

        return (
          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-6 ">
            <dt className="my-auto text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <Menu
              title={field}
              menuItems={types}
              action={(item, title) => {
                store.dispatch(
                  setNewCourse({ [title.toLowerCase()]: item.label })
                );
              }}></Menu>
          </div>
        );
    }
  });
};

export const handleGetCourseCategory = () => {
  courseService
    .getCourseCategory()
    .then((res) => {
      const catagories = res.data.map(
        (course) => course.danhMucKhoaHoc.maDanhMucKhoahoc
      );
      const uniqueData = removeDuplicate(catagories);
      store.dispatch(setCategory(uniqueData));
      sessionStorage.setItem("courseCategory", JSON.stringify(uniqueData));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleGetCourseFromAPI = (page = 1) => {
  // store.dispatch(setCourseTableDataStatus(STATUS.PENDING));
  courseService
    .getCourses(page)
    .then((res) => {
      store.dispatch(setActivePage(res.data.currentPage));
      store.dispatch(setTotalItem(res.data.totalCount));
      sessionStorage.setItem("courseList", JSON.stringify(res.data));
      store.dispatch(setData(res.data.items));
      // store.dispatch(setCourseTableDataStatus(STATUS.SUCCESS));
    })
    .catch((err) => {
      // store.dispatch(setCourseTableDataStatus(STATUS.ERROR));
    })
    .finally(() => {
      store.dispatch(setPageTurned(false));
    });
};

export const handleGetCourseFromStorage = (data) => {
  store.dispatch(setPrevPage(+data.currentPage - 1));
  store.dispatch(setActivePage(data.currentPage));
  store.dispatch(setTotalItem(data.totalCount));
  store.dispatch(setData(data.items));
};

export const handleSearchCourse = (key) => {
  courseService
    .searchCourse(key)
    .then((res) => {
      store.dispatch(setSearchedList(res.data));
    })
    .catch((err) => {});
};

//Add Modal
export const handleAddCourse = (data) => {
  const toastId = toast.loading("Loading...");
  const now = moment().format("DD/MM/YYYY");
  const reducedData = data.reduce((prevValue, currValue) => {
    for (const key in currValue) {
      if (currValue.hasOwnProperty(key)) {
        prevValue[key] = currValue[key];
      }
    }

    return prevValue;
  }, {});

  const payload = {
    maKhoaHoc: `${faker.finance.accountNumber(5)}`,
    tenKhoaHoc: reducedData?.title || "N/A",
    moTa: reducedData?.description || "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: reducedData?.image || "N/A.png",
    maNhom: reducedData?.group || "GP01",
    ngayTao: `${now}`,
    maDanhMucKhoaHoc: reducedData?.application || "N/A",
    taiKhoanNguoiTao: "string",
  };

  if (payload.maDanhMucKhoaHoc === "N/A") {
    toast.error("Category is required", {
      id: toastId,
    });
  } else {
    courseService
      .addCourse(payload)
      .then((res) => {
        const file = sessionStorage.getItem("imgFile");
        if (file) {
          uploadImage(file, payload.tenKhoaHoc);
        }
        handleGetCourseFromAPI();
        toast.success("Add successfully!", {
          id: toastId,
        });
        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed", {
          id: toastId,
        });
      });
  }
};

// Edit Modal
export const handleOpenEditModal = (courseId) => {
  store.dispatch(openEditModal());
  courseService
    .getCourseDetailById(courseId)
    .then((res) => {
      store.dispatch(setCourseToEdit(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleUpdateModal = (prevData, newData) => {
  console.log(newData);
  console.log(newData.length);
  if (newData.length > 0) {
    const toastId = toast.loading("Loading...");

    const reducedData = newData.reduce((prevValue, currValue) => {
      for (const key in currValue) {
        if (currValue.hasOwnProperty(key)) {
          prevValue[key] = currValue[key];
        }
      }

      return prevValue;
    }, {});

    console.log(newData);

    const payload = {
      maKhoaHoc: prevData.maKhoaHoc,
      tenKhoaHoc: reducedData.title || prevData.tenKhoaHoc,
      moTa: reducedData.description || prevData.moTa,
      luotXem: 0 || prevData.luotXem,
      danhGia: 0 || prevData.danhGia,
      hinhAnh: reducedData?.image || "N/A.png",
      maNhom: reducedData.type || prevData.maNhom,
      ngayTao: prevData.ngayTao,
      maDanhMucKhoaHoc:
        reducedData.application || prevData.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTao: "string" || prevData.taiKhoanNguoiTao,
    };

    console.log(payload);

    courseService
      .updateCourse(payload)
      .then((res) => {
        const file = sessionStorage.getItem("imgFile");
        if (file) {
          uploadImage(file, payload.tenKhoaHoc);
        }
        handleGetCourseFromAPI();
        toast.success("Update successfully!", {
          id: toastId,
        });
      })
      .catch((err) => {
        toast.error(`Update Failed`, {
          id: toastId,
        });
      });
  }
};

export const handleGetTrainee = (courseId) => {
  const data = {
    maKhoaHoc: courseId,
  };

  courseService
    .getTraineeInCourse(data)
    .then((res) => {
      console.log(res);
      store.dispatch(setTraineeList(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleRegisterTrainee = (acc, id) => {
  const toastId = toast.loading("Loading...");

  const value = {
    maKhoaHoc: id,
    taiKhoan: acc,
  };

  courseService
    .registerCourse(value)
    .then((res) => {
      console.log(res);
      handleGetWaitList(id);
      toast.success("Register successfully!", {
        id: toastId,
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Register Failed!", {
        id: toastId,
      });
    });
};

export const handleDeleteTrainee = (value) => {
  const toastId = toast.loading("Loading...");
  courseService
    .removeTraineeFromCourse(value)
    .then((res) => {
      console.log(res);
      handleGetTrainee(value.maKhoaHoc);
      handleGetWaitList(value.maKhoaHoc);
      toast.success("Delete Successfully!", {
        id: toastId,
      });
      setTimeout(() => {
        store.dispatch(closeDeleteTraineeModal());
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Delete Failed!", {
        id: toastId,
      });
    });
};

export const renderTraineeList = (data, courseDetail) => {
  return (
    <div className="w-full h-full">
      {data.map((trainee, index) => {
        return (
          <div key={index} className="flex flex-row items-center py-4">
            <figure className="w-10 h-10 rounded-ful overflow-hiddenl">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="object-cover w-full h-full"
              />
            </figure>
            <span>{trainee.taiKhoan}</span>
            <TrashIcon
              onClick={() => {
                const value = {
                  maKhoaHoc: courseDetail.maKhoaHoc,
                  taiKhoan: trainee.taiKhoan,
                };
                store.dispatch(setTraineeToDelete(value));
                store.dispatch(openDeleteTraineeModal());
              }}
              className="text-red-500 ml-auto !h-8 !w-8 cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};

export const handleGetWaitList = (courseId) => {
  const data = {
    maKhoaHoc: courseId,
  };

  courseService
    .getWaitList(data)
    .then((res) => {
      console.log(res);
      store.dispatch(setWaitList(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const renderWaitList = (data, courseDetail) => {
  return (
    <div className="w-full h-full">
      {data.map((trainee, index) => {
        return (
          <div key={index} className="flex flex-row items-center py-4">
            <figure className="w-10 h-10 mr-2 overflow-hidden rounded-full">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="object-cover w-full h-full"
              />
            </figure>
            <span>{trainee.taiKhoan}</span>
            <div className="flex gap-2 ml-auto">
              <CheckIcon
                onClick={() => {
                  handleRegisterTrainee(
                    trainee.taiKhoan,
                    courseDetail.maKhoaHoc
                  );
                }}
                className="w-8 h-8 cursor-pointer"></CheckIcon>
              <XMarkIcon
                onClick={() => {
                  const value = {
                    maKhoaHoc: courseDetail.maKhoaHoc,
                    taiKhoan: trainee.taiKhoan,
                  };
                  store.dispatch(setTraineeToDelete(value));
                  store.dispatch(openDeleteTraineeModal());
                }}
                className="w-8 h-8 cursor-pointer"></XMarkIcon>
            </div>
            {/* <TrashIcon
              onClick={() => {
                const value = {
                  maKhoaHoc: courseDetail.maKhoaHoc,
                  taiKhoan: trainee.taiKhoan,
                };
                store.dispatch(setTraineeToDelete(value));
                store.dispatch(openDeleteTraineeModal());
              }}
              className="text-red-500 ml-auto !h-8 !w-8 cursor-pointer"
            /> */}
          </div>
        );
      })}
    </div>
  );
};

// Delete Modal
export const handleOpenDeleteModal = (courseId) => {
  store.dispatch(openDeleteModal());
  store.dispatch(setCourseToDelete(courseId));
};

export const handleDeleteCourse = (id) => {
  const toastId = toast.loading("Loading...");
  courseService
    .deleteCourse(id)
    .then((res) => {
      toast.success("Delete successfully!", {
        id: toastId,
      });
      handleGetCourseFromAPI();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Delete Failed!", {
        id: toastId,
      });
    })
    .finally(() => {
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    });
};
