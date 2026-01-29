'use client'

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import ModalContainer from "@/components/modals/ModalContainer";
import { isNumber } from "@/constants/isNumber";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  company: CompanyProps;
}

const WithdrawSetupModal = (props: ModalProps) => {
  const { opened, onClose, company } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    minimum: company?.withdraw?.minimum?.toString() ?? "0",
    maximum: company?.withdraw?.maximum?.toString() ?? "0",
  });

  const Handler = async () => {
    try {
      if (+data.minimum > +data.maximum)
        throw new Error("Minimum amount cannot be greater than maximum amount");
      setLoading(true);
      const res = await axios.post(`/api/company/withdraw-setup`, {
        minimum: data.minimum,
        maximum: data.maximum,
      });
      if (res.data.error) throw new Error(res.data.error);
      location.reload();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer opened={opened} onClose={onClose} title="Withdraw">
      <div className="flex flex-col gap-4">
        <div>
          <label>Minimum Amount</label>
          <TextInput
            type="number"
            value={data.minimum}
            onChange={(e) => {
              isNumber(+e.target.value) &&
                setData({ ...data, minimum: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Maximum Amount</label>
          <TextInput
            type="number"
            value={data.maximum}
            onChange={(e) => {
              isNumber(+e.target.value) &&
                setData({ ...data, maximum: e.target.value });
            }}
          />
        </div>

        <Button onClick={Handler} loading={loading}>
          Save
        </Button>
      </div>
    </ModalContainer>
  );
};

export default WithdrawSetupModal;
