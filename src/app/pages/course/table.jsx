import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Pagination } from "antd";
import Button from "../../components/button";
import SearchBar from "../../components/searchBar";
import { MODE, STATUS } from "../../../../lib/constants";
import {
  openAddModal,
  setPrevPage,
  setActivePage,
  setSearchKey,
  setTableStatus,
  updateURL,
  setPageTurned,
} from "../../../../lib/redux/slices/courseManagementSlice";
import {
  handleGetTrainee,
  handleGetWaitList,
  handleOpenDeleteModal,
  handleOpenEditModal,
} from "./helpers";

export default function Table({ header, body }) {
  // const courseTableData = useSelector((state) => state.status.courseTableData);
  const sidebarMode = useSelector((state) => state.sidebar.mode);
  const currentPage = useSelector(
    (state) => state.courseManagement.pagination.activePage
  );
  const totalItem = useSelector(
    (state) => state.courseManagement.pagination.totalItem
  );
  const tableStatus = useSelector(
    (state) => state.courseManagement.table.status
  );
  const dispatch = useDispatch();

  const renderTableHeader = (data) => {
    return data.map((title, index) => {
      return index === 0 ? (
        <th
          key={index}
          className="p-3 text-left min-w-[250px] text-lg leading-6">
          {title}
        </th>
      ) : (
        <th key={index} className="p-3 pl-0 text-left min-w-[150px] text-lg">
          {title}
        </th>
      );
    });
  };

  const renderTableBody = (data) => {
    if (data.length > 0) {
      return data.map((course) => {
        return (
          <tr
            key={course.maKhoaHoc}
            className="transition-all border-b border-dashed last:border-b-0 group text-left  hover:bg-[#f5f5f5]">
            <td className="p-3 w-[calc(100%/5)]">
              <div className="flex items-center">
                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                  <img
                    src="https://raw.githubcoursecontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-47-new.jpg"
                    className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="mb-1  transition-all  ease-in-out  text-[#8f8f90]  group-hover:text-black text-base">
                    {course?.tenKhoaHoc.length < 15
                      ? course?.tenKhoaHoc
                      : course?.tenKhoaHoc.slice(0, 14) + "..."}
                  </span>
                </div>
              </div>
            </td>
            <td className="p-3 w-[calc(100%/5)]  pl-0 text-left ">
              <span className="inline-flex items-center p-2 py-3 mr-auto text-base leading-none text-center text-green-500 align-baseline border border-green-500 rounded-lg">
                {course?.danhMucKhoaHoc?.maDanhMucKhoahoc}
              </span>
            </td>
            <td className="p-3 w-[calc(100%/5)]  pl-0 ">
              <span className=" text-[#8f8f90] group-hover:text-black transition-all text-base">
                {course?.luotXem}
              </span>
            </td>
            <td className="p-3 w-[calc(100%/5)]  pl-0 ">
              <span className="inline-flex items-center py-1 mr-auto  text-center align-baseline rounded-lg text-base text-[#8f8f90]  group-hover:text-black transition-all">
                {course?.soLuongHocVien}
              </span>
            </td>

            <td className="p-3 w-[calc(100%/5)]  pl-0 text-left ">
              <span className="text-center text-base align-baseline inline-flex  py-3 mr-auto items-center   leading-none text-[#8f8f90] group-hover:text-black transition-all rounded-lg">
                {course?.ngayTao}
              </span>
            </td>
            <td className="p-3 space-x-4 text-left min-w-[150px]">
              <Button
                onClickEvent={() => {
                  handleOpenDeleteModal(course.maKhoaHoc);
                }}
                classNameProps="!h-[40px] !w-[40px] !p-1.5 !mt-0 !border-0 !inline-block">
                <TrashIcon className="text-red-500" />
              </Button>
              <Button
                onClickEvent={() => {
                  handleOpenEditModal(course.maKhoaHoc);
                  handleGetTrainee(course.maKhoaHoc);
                  handleGetWaitList(course.maKhoaHoc);
                }}
                classNameProps="!h-[40px] !w-[40px] !p-1.5 !mt-0 !border-0  !inline-block">
                <PencilSquareIcon className="text-blue-500" />
              </Button>
            </td>
          </tr>
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <div
      className="relative flex flex-col break-words min-w-0 bg-clip-border
                  max-[389.98px]:px-2 max-[389.98px]:py-8
                  max-[767.98px]:px-8 max-[767.98px]:py-6
                  px-8 py-8 rounded-[.95rem] max-w-full bg-white m-5 overflow-hidden ">
      <div
        className={`p-0 max-[767.98px]:mb-6 mb-4 flex items-center flex-col desktop:flex-row`}>
        <h3
          className={`font-medium p-0 tablet:pl-3 text-2xl tablet:text-3xl mx-auto tablet:mr-auto tablet:ml-0 mb-6 desktop:mb-0`}>
          Course Management
        </h3>
        <div className="flex flex-col w-full gap-4 px-3 mr-auto tablet:flex-row desktop:w-auto desktop:m-0 ">
          <SearchBar
            classNameProps={"!mr-1 max-[666.97px]:w-full !desktop:mr-4 !m-0 "}
            onInput={(key) => {
              dispatch(setSearchKey(key));
            }}
            onSearch={() => {
              dispatch(setTableStatus(STATUS.SEARCHING));
            }}
            onReset={() => {
              dispatch(setTableStatus(STATUS.STAND_BY));
            }}></SearchBar>

          <Button
            classNameProps="leading-6 !tablet:leading-8 w-full tablet:w-44 desktop:w-32 "
            onClickEvent={() => {
              dispatch(openAddModal());
            }}>
            Add Course
          </Button>
        </div>
      </div>
      {/* table Container */}
      <div className="mb-4 overflow-x-auto">
        <table className="max-w-[100%] w-full my-0 align-middle  border-neutral-200">
          <thead className="align-bottom">
            <tr className="text-left ">
              {renderTableHeader(header)}
              <th></th>
            </tr>
          </thead>
          <tbody className="text-left">{renderTableBody(body)}</tbody>
        </table>
      </div>
      {/* table Container */}
      <div
        className={`p-3 flex flex-row items-center  max-[939.98px]:justify-center justify-between ${
          tableStatus === STATUS.SEARCHING ? "hidden" : "flex"
        }`}>
        <span className="text-base max-[939.98px]:hidden">{`Total ${totalItem} items`}</span>
        <Pagination
          simple={sidebarMode === MODE.MOBILE ? true : false}
          // disabled={courseTableData === STATUS.PENDING ? true : false}
          total={totalItem}
          current={currentPage}
          pageSize={10}
          showSizeChanger={false}
          defaultPageSize={10}
          defaultCurrent={1}
          rootClassName="text-lg"
          onChange={(page) => {
            dispatch(setPageTurned(true));
            dispatch(setPrevPage(+page - 1 <= 0 ? 0 : +page - 1));
            dispatch(setActivePage(page));
            dispatch(updateURL());
          }}
        />
      </div>
    </div>
  );
}
