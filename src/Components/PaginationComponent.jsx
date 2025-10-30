import React from "react";
import ReactPaginate from "react-paginate";

function PaginationComponent({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      previousLabel={"← Prev"}
      nextLabel={"Next →"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"flex gap-2 justify-center items-center mt-4"}
      pageClassName={"px-3 py-1 border rounded-md cursor-pointer"}
      activeClassName={"bg-blue-500 text-white"}
      previousClassName={"px-3 py-1 border rounded-md cursor-pointer"}
      nextClassName={"px-3 py-1 border rounded-md cursor-pointer"}
    />
  );
}

export default PaginationComponent;
