const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-8">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 gap-6">
            {/* Cột 1 - Về chúng tôi */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Về chúng tôi</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Liên hệ</a></li>
                <li><a href="#">Bài viết</a></li>
              </ul>
            </div>
  
            {/* Cột 2 - Chính sách */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Chính sách & điều khoản</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#">Chính sách thanh toán</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Chính sách giao hàng</a></li>
                <li><a href="#">Chính sách bảo hành và đổi trả</a></li>
              </ul>
            </div>
  
            {/* Cột 3 - Thông tin liên hệ */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0336 999 999</li>
                <li>✉️ chamsochkhachhang.contact@gmail.com</li>
                <li>📍 Hẻm 51, An Khánh, Ninh Kiều, Cần Thơ</li>
              </ul>
            </div>
  
            {/* Cột 4 - Mạng xã hội */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">🌐 Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">📺 YouTube</a>
                <a href="#" className="text-gray-400 hover:text-white">📷 Instagram</a>
              </div>
            </div>
          </div>
  
          {/* Thanh cuối */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
            <p>© 2025 - All rights reserved. Designed by <span className="text-orange-500">Webpro</span></p>
            <p className="text-sm">Website mục đích demo không kinh doanh chính thức</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  