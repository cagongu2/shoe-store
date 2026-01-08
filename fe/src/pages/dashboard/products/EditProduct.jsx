import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useFetchAllBrandsQuery } from "../../../redux/features/brands/brandsApi";
import { useFetchAllCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import { useFetchAllColorsQuery } from "../../../redux/features/colors/colorsApi";
import { useFetchAllSizesQuery } from "../../../redux/features/sizes/sizesApi";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation
} from "../../../redux/features/products/productsApi";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { getImgUrl } from "../../../util/getImageUrl";

const EditProduct = () => {
  const editProductId = localStorage.getItem("editProductId");

  const { data: product, isLoading: isFetching } = useFetchProductByIdQuery({ id: Number(editProductId) }, {
    skip: !editProductId
  });

  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brandId: "",
      categoryId: "",
      hot: false,
      sale: false,
      images: [], // Selected new files
      stocks: [{ colorId: "", sizeId: "", quantity: 1 }],
    },
  });

  const { data: brands } = useFetchAllBrandsQuery();
  const { data: categories } = useFetchAllCategoriesQuery();
  const { data: colors } = useFetchAllColorsQuery();
  const { data: sizes } = useFetchAllSizesQuery();
  const [updateProduct, { isLoading: isUpdating, isError, error }] =
    useUpdateProductMutation();

  const selectedImages = watch("images") || [];
  const stocks = watch("stocks");

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        brandId: product.brandId,
        categoryId: product.categoryId,
        hot: product.hot,
        sale: product.sale,
        images: [],
        stocks: product.stocks?.length > 0
          ? product.stocks.map(s => ({ colorId: s.colorId, sizeId: s.sizeId, quantity: s.quantity }))
          : [{ colorId: "", sizeId: "", quantity: 1 }],
      });
      setExistingImages(product.images || []);
      setDeletedImageIds([]);
    }
  }, [product, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if ((selectedImages?.length || 0) + files.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "Quá số lượng ảnh",
        text: "Bạn chỉ có thể tải lên thêm tối đa 5 ảnh!",
      });
      return;
    }
    setValue("images", [...selectedImages, ...files]);
  };

  const removeSelectedImage = (index) => {
    setValue(
      "images",
      selectedImages.filter((_, i) => i !== index)
    );
  };

  const removeExistingImage = (id) => {
    setDeletedImageIds(prev => [...prev, id]);
    setExistingImages(prev => prev.filter(img => img.id !== id));
  };

  const addStock = () => {
    setValue("stocks", [...stocks, { colorId: "", sizeId: "", quantity: 1 }]);
  };

  const removeStock = (index) => {
    if (stocks.length > 1) {
      setValue("stocks", stocks.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data) => {
    const productData = new FormData();
    productData.append("name", data.name);
    productData.append("price", data.price);
    productData.append("hot", data.hot);
    productData.append("description", data.description);
    productData.append("sale", data.sale);
    productData.append("brandId", data.brandId);
    productData.append("categoryId", data.categoryId);

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => productData.append("images", file));
    }
    productData.append("stocks", JSON.stringify(data.stocks));
    productData.append("deletedImageIds", JSON.stringify(deletedImageIds));

    try {
      await updateProduct({ id: Number(editProductId), body: productData }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sản phẩm đã được cập nhật thành công!!!",
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

  if (isFetching || isUpdating) return <Loading />;

  return (
    <div className="container mx-auto p-6 w-full">
      <h1 className="text-2xl font-semibold text-center mb-4 text-[#345DA7]">Chỉnh Sửa Sản Phẩm</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-3xl mx-auto border border-[#345DA7]/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-bold text-gray-700 mb-2">Tên sản phẩm</label>
            <input
              {...register("name", {
                required: "Tên sản phẩm không được để trống",
              })}
              placeholder="Ví dụ: Nike Air Max 2024"
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#345DA7]/20 outline-none transition-all"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-gray-700 mb-2">Giá niêm yết</label>
            <input
              {...register("price", {
                required: "Giá sản phẩm không được để trống",
              })}
              type="number"
              placeholder="Giá VNĐ"
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#345DA7]/20 outline-none transition-all"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1 ml-1">{errors.price.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả sản phẩm</label>
          <textarea
            {...register("description", {
              required: "Không được để trống",
            })}
            placeholder="Mô tả chi tiết về sản phẩm..."
            rows="4"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#345DA7]/20 outline-none transition-all resize-none"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <label className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input type="checkbox" {...register("hot")} className="w-5 h-5 rounded border-gray-300 text-[#345DA7] focus:ring-[#345DA7]" />
            <span className="ml-3 text-sm font-bold text-gray-700">Sản phẩm Hot 🔥</span>
          </label>

          <label className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
            <input type="checkbox" {...register("sale")} className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500" />
            <span className="ml-3 text-sm font-bold text-gray-700">Sản phẩm Sale %</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Thương hiệu</label>
            <select
              {...register("brandId")}
              className="w-full p-4 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-[#345DA7]/20 appearance-none transition-all"
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brands?.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
            <select
              {...register("categoryId")}
              className="w-full p-4 border border-gray-200 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-[#345DA7]/20 appearance-none transition-all"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-md font-black text-[#345DA7] uppercase tracking-wider mb-4">Hình ảnh sản phẩm</h3>

          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-3 font-bold">ẢNH HIỆN TẠI</p>
            <div className="flex flex-wrap gap-4">
              {existingImages.map((img) => (
                <div key={img.id} className="relative w-24 h-24 group">
                  <img
                    src={getImgUrl(img.link)}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl border border-gray-100 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg transform group-hover:scale-110 transition-transform"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {existingImages.length === 0 && <p className="text-gray-300 italic text-sm">Không có ảnh nào</p>}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-400 mb-3 font-bold uppercase">Tải lên ảnh mới</p>
            <div className="relative border-2 border-dashed border-[#345DA7]/20 rounded-2xl p-6 hover:bg-[#345DA7]/5 transition-colors text-center">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2">
                <div className="flex justify-center">
                  <svg className="w-10 h-10 text-[#345DA7]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-500">Kéo thả hoặc click để chọn ảnh</p>
                <p className="text-[10px] text-gray-400">PNG, JPG tối đa 5MB</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-cover rounded-2xl border border-[#345DA7]/20 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedImage(index)}
                    className="absolute -top-2 -right-2 bg-[#345DA7] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg transform group-hover:scale-110 transition-transform"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-md font-black text-[#345DA7] uppercase tracking-wider">Phân loại & Số lượng</h3>
            <button
              type="button"
              onClick={addStock}
              className="text-xs font-black text-[#345DA7] hover:underline flex items-center gap-1"
            >
              + THÊM PHÂN LOẠI
            </button>
          </div>

          <div className="space-y-4">
            {stocks.map((stock, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-2xl relative group">
                <div className="flex-1">
                  <Controller
                    name={`stocks[${index}].colorId`}
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-[#345DA7]/10">
                        <option value="">Màu sắc</option>
                        {colors?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name={`stocks[${index}].sizeId`}
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-[#345DA7]/10">
                        <option value="">Kích cỡ</option>
                        {sizes?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    {...register(`stocks[${index}].quantity`, { min: 1 })}
                    placeholder="SL kho"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#345DA7]/10"
                  />
                </div>
                {stocks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStock(index)}
                    className="absolute -right-2 -top-2 bg-white text-red-400 w-6 h-6 rounded-full shadow-md flex items-center justify-center hover:text-red-600 transition-colors border border-gray-100"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("activeMenu");
              localStorage.setItem("activeMenu", "productList");
              window.location.reload();
            }}
            className="flex-1 p-4 rounded-2xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex-[2] p-4 rounded-2xl bg-gradient-to-r from-[#345DA7] to-[#3B8AC4] text-white font-black hover:opacity-90 transition-all shadow-xl shadow-[#345DA7]/20 uppercase tracking-widest text-xs"
          >
            {isUpdating ? "Đang xử lý..." : "Lưu thay đổi"}
          </button>
        </div>

        {isError && (
          <p className="text-red-500 mt-4 text-center text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100">
            {error?.data?.message || "Lỗi khi cập nhật sản phẩm"}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
