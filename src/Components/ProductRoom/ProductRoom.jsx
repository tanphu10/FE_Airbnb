import React, { useEffect } from "react";
import "./ProductRoom.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomAPI } from "../../redux/slices/roomSLices";
import Carousel from "react-elastic-carousel";
import {
  AiTwotoneStar,
  AiOutlineHeart,
  AiTwotoneHeart,
  AiFillHeart,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import {
  set_loading_end,
  set_loading_started,
} from "../../redux/slices/loadingSlice";
import { layDuLieuLocal } from "../../util/localStorage";
import { getInfoUserApi } from "../../redux/slices/adminUserSlices";
import { findRoomUser } from "../../redux/slices/commentUserSlice";
import { DOMAIN_BE_IMG } from "../../util/constants";
// import { click } from "@testing-library/user-event/dist/click";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

const ProductRoom = () => {
  const maNguoiDung = layDuLieuLocal("user")?.user?.id;
  const dispatch = useDispatch();
  const { arrayRoom } = useSelector((state) => state.room);
  // console.log(arrayRoom);
  // const { inFo } = useSelector((state) => state.user);
  //   console.log("room: ", room);
  // const checkLogin = () => {
  //   if (inFo == null) {
  //     document.getElementById("SignIn").click();
  //   }else {
  //     // to = {`/details/${id}`}
  //   }
  // }

  useEffect(() => {
    dispatch(set_loading_started());
    dispatch(getAllRoomAPI());
    dispatch(set_loading_end());
    dispatch(getInfoUserApi(maNguoiDung));
  }, []);

  return (
    <div className="grid laptop:grid-cols-2 p-5 gap-11 " id="Product">
      {arrayRoom.map(({ name_room, price, photo, id }, index) => {
        return (
          <div className="product_item" key={index}>
            {/* <Carousel breakPoints={breakPoints}>
              <img width={"500px"} height={"350px"} src={hinhAnh} alt="" />
              <img width={"500px"} height={"350px"} src={hinhAnh} alt="" />
            </Carousel> */}
            <div className="image_item ">
              <img
                width={"500px"}
                height={"350px"}
                src={DOMAIN_BE_IMG + photo}
                alt=""
              />
            </div>
            <AiFillHeart className="heart text-xl hover:text-orange-500 " />
            <div className="sub_title">
              <div className="name_price laptop:flex mt-2 ml-2">
                <h3 className="">
                  <span className="font-bold mobile:text-[14px] text-[16px]">
                    Tên phòng :
                  </span>{" "}
                  {name_room}
                </h3>
                <p className="flex items-center mr-3 ">
                  <AiTwotoneStar className="icon mr-1 duration-500 cursor-pointer" />{" "}
                  5.00
                </p>
              </div>
              <div className="ml-2 mt-2 laptop:flex items-center justify-between">
                <p className="desktop:mb-0 laptop:mb-0 mb-5">
                  <span className="font-bold  ">Giá phòng: </span> ${price}
                  /đêm
                </p>

                <NavLink
                  to={`/detail/${id}`}
                  className="btnChiTiet py-2 px-4 border  duration-500 mr-3 "
                >
                  Xem chi tiết
                </NavLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductRoom;
