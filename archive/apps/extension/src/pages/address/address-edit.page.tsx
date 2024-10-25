import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button, FormGroup, Input, Label } from "@hyperbit-private/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetWalletQuery } from "~/services/api";

export function AddressEditPage() {
  const navigate = useNavigate();
  const { walletId, address } = useParams();
  const getWalletQuery = useGetWalletQuery({ walletId: walletId as string });
  const wallet = getWalletQuery.data;
  console.log("wallet", wallet);

  return (
    <div className="flex flex-col flex-1">
      <div className="py-2 border-b">
        <div className="flex items-center justify-between px-2 pt-1 pb-3">
          <button
            type="button"
            className="outline-brand-500 action:text-brand-500"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon className="w-5" />
          </button>
          <div className="font-medium text-md">{address}</div>
          <div>&nbsp;</div>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-2 pt-2">
        <div className="flex-1">
          <FormGroup>
            <Label>Label</Label>
            {/* @ts-expect-error TODO */}
            <Input type="text" placeholder="Label" maxlength="255" />
          </FormGroup>
        </div>
        <FormGroup>
          <Button fullWidth>Update</Button>
        </FormGroup>
      </div>
    </div>
  );
}
