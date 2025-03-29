import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePagination = () => {
    const pages = [];
    const maxVisiblePages = 6; // Số lượng trang hiển thị trước khi có "..."

    if (totalPages <= maxVisiblePages) {
      // Nếu tổng số trang ít, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu tiên
      pages.push(1);

      // Nếu trang hiện tại lớn hơn 4, hiển thị "..."
      if (currentPage > 4) {
        pages.push("...");
      }

      // Hiển thị 2 trang trước và sau trang hiện tại
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Nếu trang hiện tại cách trang cuối quá xa, thêm "..."
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      // Hiển thị trang cuối cùng
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className={`px-4 py-2 border rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {generatePagination().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`px-4 py-2 border rounded mx-1 ${
              page === currentPage
                ? "bg-gray-600 text-white"
                : "hover:bg-gray-300"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

