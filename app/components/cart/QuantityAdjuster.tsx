import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

interface QuantityAdjusterProps {
  quantity: number;
  setQty: Dispatch<SetStateAction<number>>;
}

export function QuantityAdjuster({ quantity, setQty }: QuantityAdjusterProps) {
  const handleAdjustQuantity = (quantity: string) => {
    setQty(Number(quantity));
  };

  return (
    <div className="flex items-center gap-1 w-full max-w-[200px]">
      <button
        type="button"
        className="flex items-center justify-center border border-[#E4E4E4] rounded-[6px] w-12 h-12 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleAdjustQuantity(String(Math.max(0, quantity - 1)))}
        disabled={quantity <= 1}
      >
        <MinusIcon className="size-[27px] text-[#717171]" />
      </button>

      <div className="flex items-center justify-center bg-[#F9F9F9] py-[14px] px-[42px] rounded-[6px]">
        {quantity}
      </div>

      <button
        type="button"
        className="flex items-center justify-center border border-[#E4E4E4] rounded-[6px] w-12 h-12 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleAdjustQuantity(String(Math.min(10, quantity + 1)))}
        disabled={quantity >= 10}
      >
        <PlusIcon className="size-[27px] text-[#717171]" />
      </button>
    </div>
  );
}
