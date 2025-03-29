import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/features/products/productsApi";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const EditProduct = () => {
  const [editProductId, setEditProductId] = useState(
    localStorage.getItem("editProductId") || ""
  );

  useEffect(() => {
    setEditProductId(localStorage.getItem("editProductId") || "");
  }, []);

  const { data: product, isLoading } = useFetchProductByIdQuery(
    Number(editProductId)
  );

  const [updateProduct, { isLoading: isUpdating, isError, error }] =
    useUpdateProductMutation(editProductId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      hot: false,
      sale: false,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        hot: product.hot,
        sale: product.sale,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct({ id: Number(editProductId), ...data }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sản phẩm đã được cập nhật thành công!",
        showConfirmButton: false,
        timer: 1500,
      });

      localStorage.removeItem("activeMenu");
      localStorage.setItem("activeMenu", "productList");
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error?.data?.message || "Đã xảy ra lỗi khi cập nhật sản phẩm!",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isUpdating) return <Loading />;

  return (
    <div className="container mx-auto p-6 w-full">
      <h1 className="text-2xl font-semibold text-center mb-4">Thêm Sản Phẩm</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <input
              {...register("name", {
                required: "Tên sản phẩm không được để trống",
              })}
              placeholder="Tên sản phẩm"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <div className="h-5">
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <input
              {...register("price", {
                required: "Giá sản phẩm không được để trống",
              })}
              type="number"
              placeholder="Giá"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <div className="h-5">
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full">
            <input
              {...register("description", {
                required: "Không được để trống",
              })}
              placeholder="Mô tả sản phẩm"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <div className="h-5">
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>{" "}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <label className="flex items-center">
            <input type="checkbox" {...register("hot")} className="mr-2" />
            Sản phẩm hot
          </label>

          <label className="flex items-center">
            <input type="checkbox" {...register("sale")} className="mr-2" />
            Sản phẩm sale
          </label>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-2">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-green-500 text-white p-2 rounded"
          >
            {isLoading ? "Đang cập nhật..." : "cập nhật sản phẩm"}
          </button>
        </div>

        {isError && (
          <p className="text-red-500 mt-2 text-center">
            {error?.data?.message || "Lỗi khi cập nhật sản phẩm"}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
