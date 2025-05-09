"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-4">
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        className="bg-gray-300"
        onClick={() => changePage(1)}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        className="bg-gray-300"
        onClick={() => changePage(currentPage - 1)}
      >
        <FaChevronLeft />
      </Button>
      <Button
        variant="outline"
        disabled={currentPage === pageCount}
        className="bg-gray-300"
        onClick={() => changePage(currentPage + 1)}
      >
        <FaChevronRight />
      </Button>
      <Button
        variant="outline"
        disabled={currentPage === pageCount}
        className="bg-gray-300"
        onClick={() => changePage(pageCount)}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
