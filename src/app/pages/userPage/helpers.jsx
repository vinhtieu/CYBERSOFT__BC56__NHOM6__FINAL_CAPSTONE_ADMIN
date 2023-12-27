import { userService } from "../../../api/service";

import toast from "react-hot-toast";
import store from "../../../lib/redux/store";
import {
  openDeleteModal,
  openEditModal,
  setData,
  setUserToDelete,
  setCourses,
  setTotalItem,
  closeEditModal,
  closeDeleteModal,
  setDataToEdit,
  setActivePage,
  setPageTurned,
  closeAddModal,
  setUserToCreate,
  setDataToUpdate,
} from "../../../lib/redux/slices/userManagementSlice";
import { Menu } from "../../components";

export const normalize = (value) => {
  return value.toLowerCase().replace(" ", "-");
};

export const handleCloseModal = (e) => {
  store.dispatch(closeEditModal());
  store.dispatch(closeDeleteModal());
  store.dispatch(closeAddModal());
  store.dispatch(setDataToEdit());
};

export const handleGetUsersFromAPI = (page = 1, searchKey = "") => {
  // store.dispatch(setTableStatus(STATUS.PENDING));
  userService
    .getUsers(page, searchKey)
    .then((res) => {
      store.dispatch(setActivePage(page));
      store.dispatch(setTotalItem(res.data.totalCount));
      sessionStorage.setItem("userList", JSON.stringify(res.data));
      store.dispatch(setData(res.data.items));
      // store.dispatch(setTableStatus(STATUS.SUCCESS));
    })
    .catch((err) => {
      console.log(err);
      // store.dispatch(setTableStatus(STATUS.ERROR));
    })
    .finally(() => {
      store.dispatch(setPageTurned(false));
    });
};

export const handleGetUsersFromStorage = (data) => {
  store.dispatch(setActivePage(data.currentPage));
  store.dispatch(setTotalItem(data.totalCount));
  store.dispatch(setData(data.items));
};

export const handleSearchUser = (page, searchKey) => {
  // store.dispatch(setTableStatus(STATUS.PENDING));

  userService
    .getUsers(page, searchKey)
    .then((res) => {
      store.dispatch(setActivePage(page));
      store.dispatch(setTotalItem(res.data.totalCount));
      sessionStorage.setItem("userList", JSON.stringify(res.data));
      store.dispatch(setData(res.data.items));
      // store.dispatch(setTableStatus(STATUS.SUCCESS));
    })
    .catch((err) => {
      console.log(err);
      // store.dispatch(setTableStatus(STATUS.ERROR));
    });
};

export const handleUserInputs = (data) => {
  store.dispatch(setUserToCreate(data));
};

export const handleEditModalInputs = (data) => {
  store.dispatch(setDataToUpdate(data));
};

const handleGetUserDetailByPhoneNumber = (phoneNumber) => {
  userService
    .getUserDetail(`${phoneNumber}`)
    .then((res) => {
      store.dispatch(setDataToEdit(res.data[0]));
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleGetCourseByUser = (acc) => {
  userService
    .getCoursesByUser({
      taiKhoan: acc,
    })
    .then((res) => {
      store.dispatch(setCourses(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
//Table

const getPlaceholders = (field, data) => {
  if (field === "Full Name") return data?.hoTen;
  if (field === "Username") return data?.taiKhoan;
  if (field === "Password") return data?.matKhau;
  if (field === "Email Address") return data?.email;
  if (field === "Phone Number") return data?.soDt;
};

export const renderAddForm = (inputFields) => {
  return inputFields.map((field, index) => {
    switch (field) {
      case "Full Name":
      case "Username":
      case "Password":
      case "Email Address":
      case "Phone Number":
        return (
          <div
            key={index}
            name={field.toLowerCase().replace(" ", "-")}
            className="grid grid-cols-3 gap-4 px-4 py-6">
            <dt className="my-auto text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <input
              type="text"
              name={field.toLowerCase().replace(" ", "-")}
              id={field.toLowerCase().replace(" ", "-")}
              onChange={(e) => {
                handleUserInputs({
                  [e.target.name]: e.target.value,
                });
              }}
              className="col-span-2 block w-full p-2 text-gray-900 placeholder:text-black  sm:text-base sm:leading-6 border rounded-md border-[#cccccc]  focus:border-black focus-visible:outline-none"
            />
          </div>
        );
      case "Position":
        const types = [
          {
            key: `1`,
            label: `GV`,
          },
          {
            key: `2`,
            label: `HV`,
          },
        ];

        return (
          <div
            key={index}
            name="position"
            className="grid grid-cols-3 gap-4 px-4 py-6">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <Menu
              title={field}
              selectedItem={"----Select----"}
              menuItems={types}
              action={(item, title) => {
                handleUserInputs({ [title.toLowerCase()]: item.label });
              }}></Menu>
          </div>
        );
      case "Group":
        const group = [];
        for (let i = 0, length = 16; i < length; i++) {
          const y = i + 1;
          group.push({
            key: `${i}`,
            label: `${y < 10 ? "GP0" + y : "GP" + y}`,
          });
        }

        return (
          <div
            key={index}
            name="group"
            className="grid grid-cols-3 gap-4 px-4 py-6">
            <dt className="text-base font-medium leading-6 text-gray-900">
              {field + ":"}
            </dt>
            <Menu
              title={field}
              menuItems={group}
              selectedItem={"----Select----"}
              action={(item, title) => {
                handleUserInputs({ [title.toLowerCase()]: item.label });
              }}></Menu>
          </div>
        );
      default:
    }
  });
};

export const renderEditForm = (inputFields, userInfo) => {
  return (
    <form>
      {inputFields.map((field, index) => {
        switch (field) {
          case "Full Name":
          case "Username":
          case "Password":
          case "Email Address":
          case "Phone Number":
            const formattedValue = normalize(field);
            return (
              <div key={index} className="grid grid-cols-3 gap-4 py-6">
                <dt className="my-auto text-base font-medium leading-6 text-gray-900">
                  {field + ":"}
                </dt>
                <input
                  type="text"
                  name={formattedValue}
                  id={formattedValue}
                  // autoComplete="given-name"
                  placeholder={getPlaceholders(field, userInfo)}
                  onChange={(e) => {
                    handleEditModalInputs({ formattedValue: e.target.value });
                  }}
                  className="col-span-2 block w-full p-2 text-gray-900 placeholder:text-black  sm:text-base sm:leading-6 border rounded-md border-[#cccccc]  focus:border-black focus-visible:outline-none"
                />
              </div>
            );
          case "Position":
            const types = [
              {
                key: `1`,
                label: `HV`,
              },
              {
                key: `2`,
                label: `GV`,
              },
            ];

            return (
              <div key={index} className="grid grid-cols-3 gap-4 py-6 ">
                <dt className="my-auto text-base font-medium leading-6 text-gray-900">
                  {field + ":"}
                </dt>
                <Menu
                  title={field}
                  selectedItem={userInfo?.maLoaiNguoiDung || "----Select----"}
                  menuItems={types}
                  action={(item, title) => {
                    handleEditModalInputs({
                      [title.toLowerCase()]: item.label,
                    });
                  }}></Menu>
              </div>
            );
        }
      })}
    </form>
  );
};

// Edit Modal

export const handleEditUser = (phoneNumber, acc) => {
  store.dispatch(openEditModal());
  handleGetUserDetailByPhoneNumber(phoneNumber);
  handleGetCourseByUser(acc);
};

export const handleUpdateUser = (prevData, newData) => {
  if (newData) {
    const toastId = toast.loading("Loading...");
    const reducedData = newData.reduce((prevValue, currValue) => {
      for (const key in currValue) {
        if (currValue.hasOwnProperty(key)) {
          prevValue[key] = currValue[key];
        }
      }
      return prevValue;
    }, {});

    const user = {
      taiKhoan: reducedData?.taiKhoan || prevData?.taiKhoan,
      matKhau: reducedData?.matKhau || prevData?.matKhau,
      hoTen: reducedData?.hoTen || prevData?.hoTen,
      soDT: reducedData?.soDT || prevData?.soDt,
      maLoaiNguoiDung:
        reducedData?.maLoaiNguoiDung || prevData?.maLoaiNguoiDung,
      maNhom: "GP01",
      email: reducedData?.email || prevData?.email,
    };

    userService
      .updateUser(user)
      .then((res) => {
        toast.success("Save Successfully!", {
          id: toastId,
        });
        handleGetUsersFromAPI();
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Save Failed!", {
          id: toastId,
        });
      });
  }
};
// Delete Modal

export const handleOpenDeleteModal = (target) => {
  store.dispatch(openDeleteModal());
  store.dispatch(setUserToDelete(target));
};

export const handleDeleteUser = (user) => {
  const toastId = toast.loading("Loading...");
  userService
    .deleteUser(user?.taiKhoan)
    .then(() => {
      handleGetUsersFromAPI();
      toast.success("Delete successfully!", {
        id: toastId,
      });
    })
    .catch((err) => {
      toast.error(`${err.response.data}`, {
        id: toastId,
      });
    })
    .finally(() => {
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    });
};

// Add modal
export const handleAddUser = (userInfo) => {
  const data = userInfo.reduce((prevValue, currValue) => {
    for (const key in currValue) {
      if (currValue.hasOwnProperty(key)) {
        prevValue[key] = currValue[key];
      }
    }
    return prevValue;
  }, {});

  const formattedData = {
    taiKhoan: data.username || "",
    matKhau: data.password || "",
    hoTen: data["full-name"] || "",
    soDT: data["phone-number"] || "",
    maLoaiNguoiDung: data.position || "",
    maNhom: data.group || "",
    email: data["email-address"] || "",
  };

  const toastId = toast.loading("Loading...");
  userService
    .addUser(formattedData)
    .then((res) => {
      handleGetUsersFromAPI();
      toast.success("Add successfully!", {
        id: toastId,
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Add Failed!", {
        id: toastId,
      });
    })
    .finally(() => {
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    });
};
