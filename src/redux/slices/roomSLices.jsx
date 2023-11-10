import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { roomServ } from "../../services/roomServices";
import { userService } from "../../services/userService";
import { set_loading_end, set_loading_started } from "./loadingSlice";
import { adminUser } from "../../services/adminUser";

export const getAllRoomAPI = createAsyncThunk(
  "room/getAllRoomAPI",
  async () => {
    const res = await roomServ.getAllRoom();
    console.log(res);
    return res.data.content;
  }
);
export const getDetailRoomAPI = createAsyncThunk(
  "room/getDetailRoomAPI",
  async (id) => {
    const res = await roomServ.getDetailRoom(id);
    return res.data.content;
  }
);
export const getRoomUserBookedApi = createAsyncThunk(
  "room/getRoomUserBookedApi",
  async (maNguoiDung) => {
    const res = await userService.roomUserBooked(maNguoiDung);
    // console.log(res);
    return res.data.content;
  }
);
export const putBookedRoomApi = createAsyncThunk(
  "room/putBookedRoomApi",
  async (data) => {
    // console.log(data);
    const res = await adminUser.adminPutRentId(data.id, data);
    // console.log(res);
    alert("bạn đã update thành công");
    return res.data.content;
  }
);
const initialState = {
  arrayRoom: [],
  room: {},
  controlRoom: [],
  arrRenderItem: [],
  editRoom: [],
  pickCashRenderEdit: [],
};
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    findRoomBooker: (state, action) => {
      state.editRoom = [];
      // console.log(action.payload);
      state.controlRoom.find((item) => {
        if (item.id == action.payload) {
          state.editRoom.push(item);
        }
      });
      // console.log(state.editRoom);
    },
    findCashRoom: (state, action) => {
      state.pickCashRenderEdit = [];
      // console.log(action.payload);
      state.arrayRoom.find((item) => {
        // console.log(item);
        if (item.id == action.payload) {
          state.pickCashRenderEdit.push(item);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRoomAPI.fulfilled, (state, action) => {
      // console.log("action: ", action.payload);
      state.arrayRoom = action.payload;
      // dispatch(set_loading_end());
      // console.log(state.arrayRoom);
    });
    // builder.addCase(getAllRoomAPI.pending, (state, action) => {
    //   dispatch(set_loading_started());
    // });
    builder.addCase(getDetailRoomAPI.fulfilled, (state, action) => {
      state.room = action.payload;
    });
    builder.addCase(getRoomUserBookedApi.fulfilled, (state, action) => {
      state.arrRenderItem = [];
      state.controlRoom = action.payload;
      console.log(action.payload);
      // console.log("controlRoom", controlRoom);
      state.controlRoom?.map((control) => {
        state.arrayRoom?.map((room) => {
          if ((control.room_id = room.id)) {
            state.arrRenderItem.push(room);
          }
        });
      });
      console.log(state.arrRenderItem);
    });
    builder.addCase(putBookedRoomApi.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      let index = state.controlRoom.findIndex(
        (item) => item.id == action.payload.id
      );
      state.controlRoom[index] = action.payload;
    });
  },
});

export const { findRoomBooker, findCashRoom } = roomSlice.actions;
// để sử dụng trong component

export default roomSlice.reducer;
// import trong store của redux
