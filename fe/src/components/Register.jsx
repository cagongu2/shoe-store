import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Assuming registerUser now takes (email, password, username) or can handle a user object
      // But looking at the backend, username is optional or can be derived from email.
      // Let's pass username as email prefix or adding a username field if UI had it.
      // Current UI only has Email and Password. Backend accepts `username`.
      // I'll default username to email part for now to ensure backend satisfaction if needed.
      const username = data.email.split('@')[0];

      await registerUser(data.email, data.password, username);
      alert("Đăng ký tài khoản thành công!");
      navigate("/dang-nhap");
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      setMessage(serverMessage || "Đăng ký thất bại. Vui lòng thử lại.");
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Vui lòng đăng ký</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email không hợp lệ",
                },
              })}
              type="email"
              name="email"
              id="email"
              placeholder="Địa chỉ email"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              {...register("password", {
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Mật khẩu"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
              Đăng ký
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Đã có tài khoản? Hãy{" "}
          <Link to="/dang-nhap" className="text-blue-500 hover:text-blue-700">
            đăng nhập
          </Link>
        </p>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Cửa hàng giày.
        </p>
      </div>
    </div>
  );
};

export default Register;
