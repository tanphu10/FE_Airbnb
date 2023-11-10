import { message } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { adminUser } from "../../../services/adminUser";
import { layDuLieuLocal } from "../../../util/localStorage";
import { getInfoUserApi } from "../../../redux/slices/adminUserSlices";

const UpdateItems = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { getUser } = useSelector((state) => state.adminUser);
  useEffect(() => {
    if (getUser) {
      formik.setValues(getUser);
    }
  }, [getUser]);
  const formik = useFormik({
    initialValues: {
      id: " ",
      name: " ",
      email: " ",
      matKhau: " ",
      birthday: "",
      phone: " ",
      gender: true,
      role: " ",
    },
    validationSchema: yup.object({
      id: yup
        .string()
        .required("please fill in the input box")
        .min(1, "please input minimum 1 number")
        .max(4, "please input maximum 4 number"),
      email: yup
        .string()
        .email("Please input email!")
        .required("please fill in the input box"),
      matKhau: yup
        .string()
        .required("please fill in the input box")
        .min(6, "please input minimum 6 letter"),
      // <<<<<<< HEAD
      // birthday: yup.date().required("Please fill in the input date"),
      // =======
      birthday: yup.date().required("Please fill in the input date"),
      // >>>>>>> dd97cdc1e8ff43fcf96d0f40ebdf8e5266ecb5bb
      phone: yup
        .string()
        .matches(/^[0-9]*$/, "please fill in the input number")
        .required("please fill in the input box")
        .min(10, "please input exactly number phone")
        .max(10, "please input exactly number phone"),
      name: yup
        .string()
        .matches(/^[\p{L} ]+$/u, "please input letter")
        .required("please fill in the input box"),
      gender: yup.string().required("please fill in the input box"),
    }),
    // async &await khác với .then.catch khác nhau ở chổ là nếu như .then.catch phải lồng vào nhau
    onSubmit: async (values) => {
      // console.log(values);
      try {
        // xử lí gửi dữ liệu lên server
        const res = await adminUser.adminUserIdPut(
          layDuLieuLocal("user").user.id,
          values
        );
        // console.log(res);
        dispatch(getInfoUserApi(layDuLieuLocal("user").user.id));
        messageApi.success("update thành công");
      } catch (error) {
        console.log(error);
        messageApi.error(error.message);
      }
      formik.resetForm({
        values: {
          id: "",
          email: "",
          password: "",
          birthday: "",
          name: "",
          phone: "",
          role: "",
          gender: true,
        },
      });
    },
  });
  const { handleChange, handleSubmit, values, handleBlur } = formik;
  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-3 group  bg-orange-600">
          <input
            type="text"
            name="id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.id}
            readOnly={true}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.id && formik.touched.id ? (
            <p className="text-red-600">{formik.errors.id}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-red-600">{formik.errors.name}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="matKhau"
            value={values.matKhau}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-600">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            readOnly={true}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-600">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-red-600">{formik.errors.phone}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Number Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="birthday"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.birthday}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {formik.errors.birthday && formik.touched.birthday ? (
              <p className="text-red-600">{formik.errors.birthday}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Birthday
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="gender"
              value={values.gender}
              className=" border-b-2 text-gray-900 text-sm     w-full p-2  dark:border-b-gray-900 dark:text-black dark:focus:border-b-green-700"
            >
              <option>Your Choose</option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
            {formik.errors.gender && formik.touched.gender ? (
              <p className="text-red-600">{formik.errors.gender}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="role"
              value={values.role}
              className=" border-b-2 text-gray-900 text-sm     w-full p-2  dark:border-b-gray-900 dark:text-black dark:focus:border-b-green-700"
            >
              {/* <option>Your Choose</option> */}
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            {formik.errors.role && formik.touched.role ? (
              <p className="text-red-600">{formik.errors.role}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <button
            type="submit"
            className="text-center py-1 min-w-full outline-double  outline-yellow-600 hover:bg-yellow-400 hover:text-white "
          >
            Cập Nhập Thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItems;
