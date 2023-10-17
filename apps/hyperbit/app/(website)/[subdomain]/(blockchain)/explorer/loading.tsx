import Skeleton from "react-loading-skeleton";
import { Container } from "@/components";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <Container>
      <div className="grid grid-cols-2 my-4 bg-white border-b border-r border-gray-200 divide-x divide-y rounded-md lg:grid-cols-4">
        <div className="p-2 border-t border-l border-gray-200 rounded-md">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
        <div className="p-2">
          <Skeleton count={2} height={22} />
        </div>
      </div>
      <Skeleton count={11} height={40} />
    </Container>
  );
}
