import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaLongArrowAltRight,
  FaEye,
  FaFacebook,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";
import { getImgUrl } from "../../../util/getImageUrl";

const BlogDetail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const comment = watch("comment", "");

  const onSubmit = (data) => console.log(data);

  const onCommentSubmit = (data) => {
    console.log("Bình luận:", data.comment);
    // reset();
  };

  return (
    <>
      <div className="bg-white">
        {/* content */}
        <div className="my-12 px-12">
          <div className="mx-[-12px] grid grid-cols-12">
            <div className="xl:col-span-8 lg:col-span-6 px-3 col-span-12">
              {/* div */}
              <div className="px-3">
                <div className="mx-[-12px]">
                  {/* image */}
                  <div className="px-3">
                    <div>
                      <img
                        className="w-full h-full"
                        src="https://shoes.themedemo.site/backend/uploads/blog/air-jordan-3-lich-su-cua-thiet-ke-da-cuu-roi-nike.png"
                        
                        alt="Air Jordan 3  Lịch sử của thiết kế đã cứu rỗi Nike"
                      ></img>
                    </div>
                  </div>
                  {/* title */}
                  <div className="px-3">
                    <div className="pt-[30px]">
                      <div className="pb-5">
                        <a
                          className="active text-orange-300 font-thin text-[14px]"
                          href="https://shoes.themedemo.site/bai-viet/tin-tuc"
                        >
                          Tin tức
                        </a>
                      </div>
                      <p className="mb-2 text-3xl">
                        Air Jordan 3 Lịch sử của thiết kế đã cứu rỗi Nike
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-gray-500 text-sm">
                        <li className="pr-3 flex items-center">
                          <CiUser />
                          <div className="pl-2">Khoa Nguyen</div>
                        </li>
                        <li className="pr-3 flex items-center">
                          <SlCalender />
                          <div className="pl-2">Ngày 01/12/2024</div>
                        </li>
                        <li className="pr-3 flex items-center">
                          <IoEyeOutline />
                          <div className="pl-2">643 lượt xem</div>
                        </li>
                      </ul>
                    </div>
                    <div className="my-4 w-full border-b border-gray-200"></div>
                  </div>
                  {/* content */}
                  <div className="px-3 text-base text-gray-500">
                    <p className="text-justify mb-4"></p>
                    <p>
                      Air Jordan 3 – Lịch sử của thiết kế đã cứu rỗi Nike Một
                      trong những mẫu Air Jordan phổ biến nhất từ trước đến
                      nay, Air Jordan 3 đã thiết lập một tiêu chuẩn mới về thời
                      trang và công nghệ cho giày Jordan. Giống như Air Jordan
                      2, Air Jordan 3 là sự pha trộn hoàn hảo giữa sự tinh tế và
                      vẻ phong cách mà một đôi sneaker cần có. Và sau đây, hãy
                      cùng&nbsp;Sneaker Daily&nbsp;tìm hiểu về lịch sử của Air
                      Jordan 3 – một trong những thiết kế đã làm nên thương hiệu
                      Nike như ngày nay. Lịch sử Air Jordan 3&nbsp; Khi mới ra
                      mắt, Air Jordan 3 đã được lược bỏ chi tiết dấu Swoosh lớn
                      dọc theo sườn. Thay vào đó, chỉ có logo Nike Air ở mặt
                      sau, cùng với ba yếu tố mới quan trọng: Logo Jumpman mới
                      trên lưỡi gà, họa tiết elephant print trên upper và một bộ
                      đế Visible Air ở gót chân. Air Jordan 3 cũng đi kèm với
                      mức giá bán lẻ là 100 đô la khi mới ra mắt tương tự như
                      Air Jordan 2. Tại Nike năm 1987, dù thế nào đi nữa, thì
                      cũng đã có những rắc rối xảy ra với thương hiệu đến từ
                      nước Mỹ này. Peter Moore, nhà thiết kế của hai phiên bản
                      Air Jordan đầu tiên và giám đốc marketing – Rob Strasser
                      đều rời công ty trong vòng một tuần để xây dựng thương
                      hiệu Van Grack của riêng họ. Điều này làm cho mọi thứ trở
                      nên phức tạp hơn rất nhiều đối với Nike và làm chậm quá
                      trình tạo ra Air Jordan 3. Và trên hết, hợp đồng ban đầu
                      của Michael Jordan với thương hiệu cũng sắp đến lúc hết
                      hạn. Ngoài ra, một thông tin khác cũng khiến Nike lo lắng
                      không kém: Moore và Strasser đã cố gắng để lôi kéo Jordan
                      đi cùng, họ nói với anh ta rằng anh ta có thể tạo ra đế
                      chế của riêng mình với họ thay vì dựa vào Nike. Và thật
                      may mắn cho Nike, một nhà thiết kế trẻ tên là Tinker
                      Hatfield đã “lên tiếng” khi công ty này cần anh nhất. Cựu
                      chuyên gia kiến trúc và kiến trúc sư của Đại học
                      Oregon đã có một vài bản hit đầu tiên với The Swoosh, dòng
                      giày chạy Air Max 1 và Air Trainer 1. Theo đó, cả hai đôi
                      giày này đều sở hữu thiết kế mang tính cách mạng, thành
                      công của chúng đã giúp cho Hatfield nhận được sự tin tưởng
                      của Nike và để anh thiết kế Air Jordan 3. “Thời điểm đó
                      chỉ còn khoảng 6 tháng trước khi chúng tôi phải đưa ra sản
                      phẩm cho Michael”&nbsp;– Hatfield kể lại trong loạt phim
                      tài liệu Abstract: The Art of Design.&nbsp;“Vì vậy, mọi
                      thứ đã phải diễn ra rất nhanh chóng, không ngủ trong nhiều
                      tuần và nhiều tháng, di chuyển qua lại châu Á với tất cả
                      các nhà phát triển và làm ra một bản phác thảo” Hatfield
                      thực sự muốn nghe những gì các vận động viên nói về đôi
                      giày thể thao họ đang đi, một đặc điểm mà ông nhận được từ
                      cựu huấn luyện viên Oregon và đồng sáng lập Nike, Bill
                      Bowerman. Hatfield đã trao đổi với Jordan về những gì ngôi
                      sao Chicago Bulls đang tìm kiếm trong một đôi giày: thứ gì
                      đó có thiết kế cổ thấp hơn thay vì đôi giày siêu cao mà
                      mọi người khác đang mang; một cái gì đó thoải mái mà có
                      thể cảm nhận được ngay với lớp da mềm mại, dẻo dai; một
                      cái gì đó với ánh đèn flash và sự tinh tế. Hatfield lắng
                      nghe, và khi thời gian thuyết trình đến, anh ấy đã sẵn
                      sàng. Nhưng bản thân bài thuyết trình đã diễn ra không đơn
                      giản. Hatfield và chủ tịch cũng như người sáng lập ra Nike
                      – Phil Knight đã bay tới California để tặng chiếc giày mới
                      cho Jordan và gia đình anh ấy. Tuy nhiên, Jordan đã trễ
                      tới bốn giờ trong cuộc họp vì anh ra ngoài chơi golf với
                      Strasser và Moore. Khi Michael Jordan đến, anh dường như
                      đã tỏ ra rất cáu giận. Phải chăng Jordan đã bị thuyết phục
                      bởi những nhân viên cũ của Nike? Knight nhường lại cuộc
                      nói chuyện cho Hatfield, người bắt đầu hỏi Michael xem anh
                      ta có nhớ những yêu cầu của mình từ cuộc trò chuyện trước
                      đó không. Ngôi sao bóng rổ đến từ California bắt đầu dịu
                      lại khi họ nói chuyện, và khi Hatfield gỡ tấm vải liệm ra
                      khỏi mô hình nguyên mẫu, Jordan đã thực sự yêu thích nó
                      ngay từ cái nhìn đầu tiên. Đó chính xác là những gì anh ấy
                      đã tìm kiếm. Kiểu dáng đẹp, thiết kế cổ mid, da đầy đủ mềm
                      mại, họa tiết elephant print, và thú vị nhất trong tất cả
                      – logo riêng của anh ấy trên lưỡi gà. Jumpman đã được lấy
                      cảm hứng từ một hình ảnh nổi tiếng năm 1984 của Jordan khi
                      anh nhảy lên không trung cho một cú dunk. Mọi thứ đều nói
                      lên rằng Jordan là người cầm chuôi trong thương hiệu này,
                      và anh đã gia hạn thỏa thuận với Nike. Hầu hết các
                      sneakerhead đều nhớ tới hình ảnh Jordan lần đầu tiên đi
                      trên chân mình đôi Air Jordan 3 trong trận đấu NBA
                      All-Star năm 1988. Tuy nhiên, Jordan thỉnh thoảng cũng đi
                      trên mình thiết kế “White Cement” đầu tháng 11 năm 1987 ở
                      một số trận đấu. Jordan đã sử dụng Air Jordan 3 tại
                      All-Star Weekend diễn ra ở Chicago trên con đường dành
                      danh hiệu Slam Dunk thứ hai liên tiếp với cú foul-line
                      dunk huyền thoại của mình. Jordan cũng đã đeo phối màu
                      “Black Cement” của nhóm trong trận đấu All-Star. Trước
                      18.403 người hâm mộ, anh đã làm lóa mắt khán giả nhà với
                      40 điểm, 8 rebound, 3 hỗ trợ, 4 lần cướp bóng, 4 lần đánh
                      chặn và dành luôn danh hiệu MVP. Đó là lần duy nhất trong
                      cả mùa giải, Jordan mặc đồ đen trong một trận đấu. Để
                      quảng bá cho mẫu giày mới, đã có những quảng cáo cực kỳ có
                      ảnh hưởng của Air Jordan 3 với một Spike Lee trẻ tuổi
                      trong vai trò Mars Blackmon. Lee lần đầu tiên thủ vai
                      trong bộ phim năm 1986 có tên gọi She Gotta Have It.
                      Blackmon, một người ồn ào, bị ám ảnh bởi sneaker, đã đồng
                      hành cùng Jordan trong bốn năm tại các điểm truyền hình và
                      quảng cáo. Các quảng cáo của Wieden + Kennedy là một thành
                      công lớn, làm dấy lên những câu khẩu hiệu như&nbsp;“It’s
                      gotta be the shoes”&nbsp;và một trong những biệt danh của
                      Jordan –&nbsp;“Money”. Ngoài ra còn có một quảng cáo hai
                      trang trong Sports Illustrated Swimsuit năm 1988 giới
                      thiệu Jordan và Blackmon. Giữa ảnh hưởng của Jordan qua
                      All-Star Weekend, các quảng cáo, và thực tế là anh ấy đã
                      chưa từng dùng lại phiên bản Black Cement một lần nào nữa.
                      Hai phối màu “White Cement” và “Black Cement” xuất hiện
                      vào tháng 1 năm 1988. Sau khi mang trên mình phiên bản màu
                      trắng cho gần như cả mùa giải, Jordan chuyển sang phối màu
                      “Fire Red” cho vòng Playoffs năm 1988 và mở đầu mùa giải
                      năm 1988-89. Một colorway thứ tư, có tên là “True Blue”
                      chưa từng được Jordan mang trên chân trong bất kỳ một trận
                      đấu nào của NBA cho đến năm 2001, khi anh mang trên mình
                      một phiên bản retro lúc chơi cho Washington Wizards. Trong
                      những năm qua, Air Jordan 3 đã được retro với số lượng
                      chóng mặt, với các màu sắc cổ điển như White Cement và
                      Black Cement là phổ biến nhất. Phiên bản White Cement đã
                      được Nike phát hành lại vào những năm 1994, 2003, 2011,
                      2013 và 2018, trong khi phối màu Black Cement đã trở lại
                      vào những năm 1994, 2001, 2008, 2011 và 2018. Vào năm
                      2001, Jordan Brand cũng đã mang về chiếc True Blue và phát
                      hành dòng màu không phải OG đầu tiên – Air Jordan 3 Mocha,
                      chuyển đổi logo Nike Air ở gót chân thành logo Jumpman.
                      Thiết kế logo Jumpman ở gót giày cũng lần lượt xuất hiện
                      trên phiên bản White Cement và Black Cement retro vào năm
                      2011. Phối màu “Fire Red” OG đã chưa từng có một bản retro
                      nào cho đến năm 2007. Vào năm đó, người hâm mộ cũng chứng
                      kiến sự xuất hiện của các phối màu mới như Pure Money,
                      Black Cat và Do The Right Thing. Vài năm tiếp theo là
                      quãng thời gian khá im ắng của Air Jordan 3, với chiếc
                      True Blue trở lại vào năm 2009 và thiết kế “25th
                      Anniversary” và “Doernbecher” vào năm 2010 trước một loạt
                      các bản retros và phối màu mới vào năm 2011. Air Jordan 3
                      trở lại một lần nữa vào năm 2013 với kiểu dáng cổ điển của
                      phối màu White Cement (có logo OG Nike Air ở gót chân).
                      Jordan Brand cũng đã mang về trở lại hai thiết kế Fire Red
                      và Doernbecher cùng với nhiều màu sắc mới. Vào năm 2014,
                      Jordan Brand đã hợp tác với SoleFly để ra mắt phiên bản
                      friends-and-family “Lotto” Air Jordan 3. Và năm 2017,
                      atmos đã ra mắt hai phối màu Air Jordan 3 và Air Max 1 lấy
                      cảm hứng từ Air Jordan 3 cho ngày kỷ niệm Air Max Day. Năm
                      2018, phiên bản mới nhất của phối màu Black Cement, giống
                      như thiết kế retro của White Cement vào năm 2013, đã khôi
                      phục logo Nike Air nguyên bản ở gót chân và có chất liệu
                      da cũng như họa tiết elephant print giống với phiên bản OG
                      năm 1988. Một phiên bản kỷ niệm đặc biệt với tên gọi “Free
                      Throw Line” “White Cement” retro cũng xuất hiện vào tháng
                      2, vinh danh Jordan Dunk tại Cuộc thi Slam Dunk năm 1988.
                      Phiên bản Tinker NRG của Air Jordan 3, một lần nữa được
                      phát hành vào năm 2018, đã thêm một bên dấu swoosh lên
                      trên phần thân giày như một sự tưởng nhớ đến một trong
                      những bản phác thảo ban đầu của Hatfield. Air Jordan 3
                      mang rất nhiều ý nghĩa lần đầu tiên của cả Jordan và Nike.
                      Đó là đôi giày sneaker đầu tiên mang logo Jumpman và là
                      đôi giày đầu tiên trong số nhiều đôi giày mà Hatfield
                      thiết kế cho His Airness. Mùa giải 1987-88 là lần đầu tiên
                      Jordan chơi cùng với các đồng đội quan trọng Scottie
                      Pippen và Horace Grant, và cũng là năm đầu tiên của huấn
                      luận viên Phil Jackson tại Bulls (mặc dù với tư cách là
                      một trợ lý). Jordan cũng đã đạt được danh hiệu MVP đầu
                      tiên của mình và giành giải Defensive Player của năm với
                      đôi giày Air Jordan 3s. Di sản của Jordan, bắt đầu từ phút
                      đầu tiên anh bước lên sân NBA khi còn là một tân binh,
                      nhưng đến năm thứ tư, anh đã bắt đầu thống trị các trận
                      đấu như chưa từng có trước đây. Đôi giày anh mang chỉ thêm
                      vào hình ảnh của một biểu tượng bước vào thời kỳ hoàng
                      kim. Mặc dù Chicago Bulls đã thất bại trong trận bán kết
                      NBA Playoffs năm 1988, nhưng hình ảnh của Jordan trong đôi
                      giày bóng rổ với họa tiết elephant print trắng và xám
                      trong suốt mùa giải vẫn không thể xóa nhòa.
                    </p>
                    <p></p>
                  </div>
                  {/* comment */}
                  <div className="px-3 mb-6">
                    <div className="my-5 w-full border-b border-gray-200"></div>

                    <div>
                      <p className="">Chia sẻ</p>
                      <ul className="pt-2 ml-5 flex gap-4">
                        <li>
                          <a
                            href="#"
                            className="text-white bg-blue-600 rounded items-center gap-2 px-2 py-1 inline-flex text-[10px]"
                          >
                            {/* icon */}
                            <FaFacebook />
                            <p className="">Chia sẻ</p>
                            {/* số lượng đã chia sẻ */}
                            <p>0</p>
                          </a>
                        </li>
                        <li>
                          <div className=" text-base w-7 h-7 items-center justify-center rounded-full border-1 border-gray-800 inline-flex">
                            <FaLink className="" />
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="py-2 mb-6 flex justify-between font-bold">
                        <div>
                          <span>
                            <span>0 Bình luận</span>
                          </span>
                        </div>
                        <div>
                          <div className="flex text-gray-600">
                            <div className="font-normal mr-2">
                              <span>Sắp xếp theo</span>
                            </div>
                            <div className="text-[12px] bg-gray-100 border-1 border-gray-400 rounded">
                              <a
                                href="#"
                                className="px-2 flex items-center rounded"
                              >
                                <span className="">Mới nhất</span>
                                <span alt="" className="">
                                  <LuChevronsUpDown />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-5 w-full border-b border-gray-200"></div>
                    </div>

                    {/* comment input */}
                    <div className="mb-6 flex">
                      {/* avt */}
                      <div className="mr-2">
                        <div>
                          <a href="" className="mr-2">
                            <img
                              src={`${getImgUrl("uploads/product/1701277327-1699808901-M860B13-3.jpg")}`}
                              alt=""
                              className="max-h-12.5 max-w-12.5"
                            />
                          </a>
                          <div></div>
                        </div>
                      </div>
                      {/* comment */}
                      <form
                        onSubmit={handleSubmit(onCommentSubmit)}
                        className="border border-gray-300 rounded overflow-hidden w-full"
                      >
                        <textarea
                          className="w-full p-3 border-none focus:outline-none resize-none"
                          rows="3"
                          placeholder="Bình luận..."
                          {...register("comment", { required: true })}
                        ></textarea>
                        <div className="bg-gray-100 flex justify-end p-2">
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50"
                            disabled={!comment.trim()} // Chặn submit khi input rỗng
                          >
                            Đăng
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 lg:col-span-6 col-span-12">
              <div className="px-[15px] py-5 border-solid border-1 rounded-xl border-gray-100">
                {/* search */}
                <div className="pb-6">
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center">
                      <input
                        id="search"
                        type="text"
                        {...register("search")}
                        className="relative py-[6px] h-[42px] pl-5 pr-3 inline-block text-orange-500 rounded-full border-1 w-full border-orange-500 focus:outline-none"
                        placeholder="Tìm bài viết..."
                      />
                      <span className="absolute right-[68px]">
                        <button className="hover:cursor-pointer" type="submit">
                          <IoIosSearch className="text-base" />
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                {/* author */}
                <div className="">
                  <div className="mx-auto flex items-center justify-around">
                    <img
                      src="https://shoes.themedemo.site/backend/uploads/user/1731855340.png"
                      alt=""
                      className="w-[150px] h-[150] rounded-full object-fill"
                    />
                  </div>
                  <div className="flex items-center flex-col">
                    <p className="mt-[30px] mb-[5px] text-lg font-sans">
                      Khoa Nguyen
                    </p>
                    <p className="text-sm font-sans text-gray-500">
                      Người viết
                    </p>
                    <div className="pb-[15px] pt-[7px] flex items-center">
                      <a href="#" target="_blank">
                        <FaFacebook />
                      </a>
                      <a href="#" className="ml-[30px]" target="_blank">
                        <FaTwitter />
                      </a>
                      <a href="#" className="ml-[30px]" target="_blank">
                        <FaGithub />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm font-sans text-gray-500">
                    Sneaker đã trở thành một trong những xu hướng thời trang
                    được ưa chuộng trong những năm gần đây và vẫn đang tiếp tục
                    phát triển mạnh mẽ. Chắc hẳn với những tín đồ mộ điệu
                    sneaker thì mỗi vết dơ, ẩm mốc, hay vết bạc màu cũng chính
                    là kẻ thù số một. Nếu bạn vẫn đang loay hoay không biết
                    cách&nbsp;bảo quản giày sneaker&nbsp;thế nào cho đúng thì
                    hãy bỏ túi một số tips dưới đây nhé!
                  </p>
                  <div className="mb-4 mt-2 w-full border-b border-gray-100"></div>
                </div>

                {/* blog menu */}
                <div className="mb-[30px]">
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px]">
                    Danh mục bài viết
                  </p>
                  <ul className="text-gray-500">
                    <li className="pb-3 border-b-1 border-dashed border-gray-400 ">
                      <a
                        href="https://shoes.themedemo.site/bai-viet/meo-vat"
                        className="flex justify-between"
                      >
                        <p>Mẹo vặt</p>
                        <p>39</p>
                      </a>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <a
                        href="https://shoes.themedemo.site/bai-viet/tin-tuc"
                        className="flex justify-between"
                      >
                        <p>Tin tức</p>
                        <p>39</p>
                      </a>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <a
                        href="https://shoes.themedemo.site/bai-viet/tu-van"
                        className="flex justify-between"
                      >
                        <p>Tư vấn</p>
                        <p>12</p>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* tag */}
                <div>
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px]">
                    Thẻ tag
                  </p>
                  <ul className="">
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/sneaker-square">
                        Sneaker Square
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/nike">Nike</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/adidas">
                        Adidas
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/puma">Puma</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/vo-trang">
                        Vớ trắng
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/hot-trend">
                        Hot trend
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/moi-nhat">
                        Mới nhất
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/huu-ich">
                        Hữu ích
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/new-balance">
                        New Balance
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/sale">Sale</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/chia-se">
                        Chia sẻ
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/goi-y">Gợi ý</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/tin-moi">
                        Tin mới
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/blog">Blog</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/meo-hay-va-bo-ich">
                        Mẹo hay và bổ ích
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
