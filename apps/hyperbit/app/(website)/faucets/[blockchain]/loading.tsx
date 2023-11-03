import { FormGroup } from "@hyperbitui/react";
import Skeleton from "react-loading-skeleton";
import { FaucetContainer } from "./_components/FaucetContainer";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <FaucetContainer>
      <div className="w-full max-w-sm mx-auto mb-8">
        <Skeleton count={1} height={40} />
      </div>
      <Skeleton count={2} />
      <FormGroup>
        <Skeleton count={1} />
        <Skeleton count={1} height={36} />
      </FormGroup>
      <FormGroup>
        <Skeleton count={1} />
        <Skeleton count={1} height={36} />
      </FormGroup>
      <FormGroup>
        <Skeleton count={1} />
        <Skeleton count={1} height={36} />
      </FormGroup>
      <FormGroup>
        <div className="w-full max-w-xs mx-auto">
          <Skeleton count={1} height={10} />
          <Skeleton count={1} height={36} />
        </div>
      </FormGroup>
    </FaucetContainer>
  );
}
