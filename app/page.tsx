import React from "react";
import Pagination from "@/components/general/Pagination";
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page =
    typeof params.page === "string" ? Number.parseInt(params.page) : 1;

  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={page} />
    </div>
  );
};

export default Home;
