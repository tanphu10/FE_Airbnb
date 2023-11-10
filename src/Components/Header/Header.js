import React, { useEffect, useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import AfterRegister from "./AfterRegister";
import "./Header.scss";
import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import { AlignCenterOutlined, AlignRightOutlined } from "@ant-design/icons";
const Header = () => {
  // const [open, setOpen] = useState(false);
  const [active, setactive] = useState(false);
  const handleActive = () => {
    setactive(!active);
  };
  return (
    <div className="header">
      <div className="container-lg ">
        <div className="bg-white drop-shadow-md fixed w-full z-999">
          <nav className="drop-shadow border-gray-200 ">
            <div className="header_content max-w-screen-xl flex items-center justify-between  p-4 sm:flex tablet:justify-end ">
              <NavLink to="/" className="logo flex items-center sm:text-sm ">
                <i
                  className="fa-brands fa-airbnb sm:text-sm"
                  style={{ color: "#ff5a1f", fontSize: "40px" }}
                />

                <span className="hidden tablet:flex self-center font-bold text-orange-500 text-3xl whitespace-nowrap ml-3 sm:text-sm">
                  airbnb
                </span>
              </NavLink>
              <div
                className="flex laptop:justify-between tablet:justify-end items-center max-w-[1240px] mx-auto px-3 rounded-2xl "
                id="navbar-user"
              >
                <ul className="hidden mobile:flex tablet:flex  ">
                  <li className="btn_header">
                    <a
                      href="#"
                      className="btn_header_navbar block py-2 pl-3 pr-4 text-black rounded md:p-0 hover:text-white duration-200"
                      aria-current="page"
                    >
                      Địa chỉ bất kỳ
                    </a>
                  </li>
                  <li className="btn_header ml-5">
                    <a
                      href="#"
                      className="btn_header_navbar block py-2 pl-3 pr-4 text-black rounded md:p-0 hover:text-white duration-200"
                    >
                      Tuần bất kỳ
                    </a>
                  </li>
                  <li className="flex items-center ml-5">
                    <a
                      href="#"
                      className="block py-2 pl-3 pr-4 text-black rounded  md:p-0 hover:text-white duration-200"
                    >
                      Thêm khách hàng
                      <i className="fa-solid fa-magnifying-glass text-white ml-4"></i>
                    </a>
                  </li>
                </ul>
                <div onClick={handleActive} className="block tablet:hidden">
                  {!active ? <AlignCenterOutlined /> : <AlignRightOutlined />}
                </div>
                <div
                  className={
                    !active
                      ? "fixed left-0 top-[200px] w-[50%] border-r-gray-900  bg-[orange] ease-in-out duration-500 "
                      : "fixed left-[-100%]"
                  }
                >
                  <ul className="tablet:hidden mobile:hidden uppercase">
                    <li className="p-4 border-b text-white border-gray-600">
                      Địa chỉ bất kỳ
                    </li>
                    <li className="p-4 border-b text-white border-gray-600">
                      Thêm khách hàng
                    </li>
                    <li className="p-4 text-white ">Tuần bất kỳ</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <AfterRegister />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
