import React from "react";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import { FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="px-[48px] mt-[48px] bg-white">
        <div className="flex justify-center overflow-hidden mx-[-12px">
          <div className="text-center px-3">
            <div className="px-0">
              <div className="mb-13">
                <p className="text-4xl mb-[8px]">Liên hệ</p>
                <p className="text-sm text-gray-400">
                  Chúng tôi làm việc vì bạn - Hãy liên hệ với chúng tôi
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-hidden mx-[-12px] grid xl:grid-cols-2">
          {/* info */}
          <div className="col-span-2 px-3 mb-4 lg:col-span-1">
            <div>
              <div className="px-0">
                <div className="flex mx-[-12px] justify-center flex-col">
                  <div className="px-3 mb-4">
                    <div className="bg-white flex items-center px-4 py-2 rounded gap-2 border-solid border-1 border-gray-200">
                      <div className="border-1 rounded-full border-dotted border-orange-500 w-10 h-10 flex justify-center items-center">
                        <IoLocationSharp className="text-orange-500 text-xl" />
                      </div>
                      <span className="text-gray-400 text-sm">
                        Hẻm 51, An Khánh, Ninh Kiều, Cần Thơ
                      </span>
                    </div>
                  </div>
                  <div className="px-3 mb-4">
                    <div className="bg-white flex items-center px-4 py-2 rounded gap-2 border-solid border-1 border-gray-200">
                      <div className="border-1 rounded-full border-dotted border-orange-500 w-10 h-10 flex justify-center items-center">
                        <FaPhoneAlt className="text-orange-500 text-xl" />
                      </div>
                      <span className="text-gray-400 text-sm">
                        0336 999 999
                      </span>
                    </div>
                  </div>
                  <div className="px-3 mb-4">
                    <div className="bg-white flex items-center px-4 py-2 rounded gap-2 border-solid border-1 border-gray-200">
                      <div className="border-1 rounded-full border-dotted border-orange-500 w-10 h-10 flex justify-center items-center">
                        <IoMail className="text-orange-500 text-xl" />
                      </div>
                      <span className="text-gray-400 text-sm">
                        chamsockhachhang.contact@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className="px-3 mb-4">
                    <div className="bg-white flex items-center px-4 py-2 rounded gap-2 border-solid border-1 border-gray-200">
                      <div className="border-1 rounded-full border-dotted border-orange-500 w-10 h-10 flex justify-center items-center">
                        <FaFacebookF className="text-orange-500 text-xl" />
                      </div>
                      <span className="text-gray-400 text-sm">
                        facebook.com/sneaker.square.hcm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="col-span-2 px-3 lg:col-span-1">
            <div className="px-0">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                {/* Họ và tên & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Vui lòng nhập họ và tên",
                      })}
                      className="w-full p-2 rounded border-solid border-1 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 px-3 py-[6px]"
                      placeholder="Nhập tại đây..."
                    />
                    {errors.name && (
                      <p className="text-red-500 font-thin text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Vui lòng nhập email",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email không hợp lệ",
                        },
                      })}
                      className="w-full p-2 rounded border-solid border-1 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 px-3 py-[6px]"
                      placeholder="Nhập tại đây..."
                    />
                    {errors.email && (
                      <p className="text-red-500 font-thin text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Số điện thoại & Tiêu đề */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Vui lòng nhập số điện thoại",
                      })}
                      className="w-full p-2 rounded border-solid border-1 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 px-3 py-[6px]"
                      placeholder="Nhập tại đây..."
                    />
                    {errors.phone && (
                      <p className="text-red-500 font-thin text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      {...register("subject", {
                        required: "Vui lòng nhập tiêu đề",
                      })}
                      className="w-full p-2 rounded border-solid border-1 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 px-3 py-[6px]"
                      placeholder="Nhập tại đây..."
                    />
                    {errors.subject && (
                      <p className="text-red-500 font-thin text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Nội dung */}
                <div className=" mb-6">
                  <label className="block text-gray-400 text-sm mb-2">
                    Nội dung
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Vui lòng nhập nội dung",
                    })}
                    className="w-full p-2 rounded border-solid border-1 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 px-3 py-[6px] h-32"
                    placeholder="Nhập tại đây..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 font-thin text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Nút gửi */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="mb-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* map */}
          <div className="col-span-2 px-3">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4185210673036!2d106.78303187495865!3d10.855738189297917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276e7ea103df%3A0xb6cf10bb7d719327!2zSFVURUNIIC0gxJDhuqFpIGjhu41jIEPDtG5nIG5naOG7hyBUUC5IQ00gKFRodSBEdWMgQ2FtcHVzKQ!5e0!3m2!1svi!2s!4v1741984928775!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
