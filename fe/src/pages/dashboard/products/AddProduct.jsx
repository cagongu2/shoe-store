import { useForm, Controller } from "react-hook-form";
import { useFetchAllBrandsQuery } from "../../../redux/features/brands/brandsApi";
import { useFetchAllCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import { useFetchAllColorsQuery } from "../../../redux/features/colors/colorsApi";
import { useFetchAllSizesQuery } from "../../../redux/features/sizes/sizesApi";
import { useAddProductMutation } from "../../../redux/features/products/productsApi";
import Swal from "sweetalert2";

const AddProduct = () => {
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
      images: [],
      stocks: [{ colorId: "", sizeId: "", quantity: 1 }],
    },
  });

  const { data: brands } = useFetchAllBrandsQuery();
  const { data: categories } = useFetchAllCategoriesQuery();
  const { data: colors } = useFetchAllColorsQuery();
  const { data: sizes } = useFetchAllSizesQuery();
  const [createProduct, { isLoading, isError, error }] =
    useAddProductMutation();

  const images = watch("images");
  const stocks = watch("stocks");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "Quá số lượng ảnh",
        text: "Bạn chỉ có thể tải lên tối đa 5 ảnh!",
      });
      return;
    }
    setValue("images", [...images, ...files]);
  };

  const removeImage = (index) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  const addStock = () => {
    setValue("stocks", [...stocks, { colorId: "", sizeId: "", quantity: 1 }]);
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
    data.images.forEach((file) => productData.append("images", file));
    productData.append("stocks", JSON.stringify(data.stocks));

    try {
      const response = await createProduct(productData).unwrap();
      console.log(response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sản phẩm đã được thêm thành công!!!",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("activeMenu");
      localStorage.setItem("activeMenu", "productList");
      window.location.reload();
      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error?.data?.message || "Đã xảy ra lỗi khi tạo sản phẩm!",
      });
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <select
            {...register("brandId")}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Chọn thương hiệu</option>
            {brands?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <select
            {...register("categoryId")}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Chọn danh mục</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded mt-3"
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {images.map((file, index) => (
            <div key={index} className="relative w-20 h-20">
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-4">Loại hàng</h3>
        {stocks.map((stock, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-2 mt-2">
            <Controller
              name={`stocks[${index}].colorId`}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
                >
                  <option value="">Chọn màu</option>
                  {colors?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <Controller
              name={`stocks[${index}].sizeId`}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
                >
                  <option value="">Chọn size</option>
                  {sizes?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <input
              type="number"
              {...register(`stocks[${index}].quantity`, { min: 1, max: 100 })}
              placeholder="Số lượng"
              className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
            />
          </div>
        ))}

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-2">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-green-500 text-white p-2 rounded"
          >
            {isLoading ? "Đang tạo..." : "Tạo sản phẩm"}
          </button>
          <button
            type="button"
            onClick={addStock}
            className="w-full md:w-1/2 bg-blue-500 text-white p-2 rounded"
          >
            + Thêm loại hàng
          </button>
        </div>

        {isError && (
          <p className="text-red-500 mt-2 text-center">
            {error?.data?.message || "Lỗi khi tạo sản phẩm"}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
