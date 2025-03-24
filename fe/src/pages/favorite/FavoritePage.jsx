import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, Links } from "react-router-dom";
import { getImgUrl } from "../../util/getImageUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFavorite,
  removeFromFavorite,
} from "../../redux/features/favorites/favoriteSlice";
import Swal from "sweetalert2";

const FavoritePage = () => {
  const isLogin = false;
  const dispatch = useDispatch();
  const favoriteItemsFromStore = useSelector(
    (state) => state.favorite.favoriteItems
  );

  console.log(favoriteItemsFromStore)

  // State để lưu danh sách yêu thích
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Khi isLogin thay đổi, cập nhật danh sách yêu thích
  useEffect(() => {
    if (isLogin) {
      // axios
      //   .get("/api/favorite") // Đổi "/api/favorite" theo API của bạn
      //   .then((response) => setFavoriteItems(response.data))
      //   .catch((error) =>
      //     console.error("Lỗi khi lấy danh sách yêu thích:", error)
      //   );
    } else {
      setFavoriteItems(favoriteItemsFromStore);
    }
  }, [isLogin, favoriteItemsFromStore]);

  // Hàm xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFromFavorite = (product) => {
    if (isLogin) {
      // axios
      //   .delete(`/api/favorite/${product.id}`) // Gọi API để xóa sản phẩm
      //   .then(() => {
      //     setFavoriteItems((prev) =>
      //       prev.filter((item) => item.product_id !== product.id)
      //     );
      //     Swal.fire({
      //       position: "center",
      //       icon: "success",
      //       title: "Sản phẩm đã được xóa khỏi yêu thích!",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //   })
      //   .catch((error) => console.error("Lỗi khi xóa sản phẩm:", error));
    } else {
      dispatch(removeFromFavorite(product));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sản phẩm đã xóa",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Hàm xóa toàn bộ danh sách yêu thích
  const handleClearFavorite = () => {
    if (isLogin) {
      // axios
      //   .delete("/api/favorite") // API xóa toàn bộ danh sách yêu thích
      //   .then(() => setFavoriteItems([]))
      //   .catch((error) =>
      //     console.error("Lỗi khi xóa danh sách yêu thích:", error)
      //   );
    } else {
      dispatch(clearFavorite());
    }
  };

  return (
    <>
      <div>
        <div className="mt-12 px-12 font-normal">
          {/* title */}
          <div className="mx-[-12px]">
            <div className="px-3">
              <div>
                <div className="mb-12.5 text-center">
                  <p className="font-[400] text-4xl">Sản phẩm yêu thích</p>
                </div>
              </div>
            </div>
          </div>
          {/* product */}
          {favoriteItems.map((item) => (
            <div className="mx-[-12px] mb-6">
              <div className="px-3 bg-white rounded font-[400] drop-shadow-xl">
                <div className="mb-4">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-2 p-4">
                      <Link to={item.link}>
                        <img
                          src={`${getImgUrl(item.images[0].url)}`}
                          alt=""
                          className="rounded w-fit h-30 object-cover sm:w-full sm:h-fit"
                        />
                      </Link>
                    </div>
                    <div className="col-span-12 md:col-span-10 flex items-center">
                      <div className="p-4 ">
                        <div className="mx-[-12px] grid grid-cols-1 xl:grid-cols-3">
                          <div className=" p-4 flex items-center">
                            <Link to={item.link}>
                              <p className="text-xl font-medium">{item.name}</p>
                            </Link>
                          </div>
                          <div className=" p-4 flex items-center">
                            <p className="text-orange-600 text-xl">
                              {item.price} VNĐ
                            </p>
                          </div>
                          <div className="p-4 flex items-center">
                            <div className="flex gap-3 text-white items-center justify-between text-base">
                              <div className="flex h-[40px] items-center justify-center">
                                <button className="py-2 px-3 inline-flex justify-center h-[100%] items-center bg-red-500 rounded w-25">
                                  <Link onClick={handleClearFavorite} to="#">
                                    <FaRegTrashAlt className="leading-[100%]" />
                                  </Link>
                                </button>
                              </div>
                              <div className="py-2 px-3 h-[40px] w-40 bg-green-500 rounded ">
                                <Link
                                  to={item.link}
                                  className=" flex items-center justify-center gap-2"
                                >
                                  <FaEye className="block" /> Xem sản phẩm
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
