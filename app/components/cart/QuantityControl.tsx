import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface QuantityControlProps {
    quantity: number;
    onAdjust: (newQuantity: number) => void;
    min?: number;
    disableCurrent?: boolean; // If true, disables based on current min/max (optional enhancement)
}

export function QuantityControl({
    quantity,
    onAdjust,
    min = 0,
}: QuantityControlProps) {
    return (
        <div className="flex items-center bg-white rounded-md border border-gray-200 overflow-hidden">
            <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors border-r border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onAdjust(Math.max(min, quantity - 1))}
                disabled={quantity <= min}
            >
                <MinusIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center min-w-[60px] h-10 px-3 bg-white text-gray-900 font-medium text-sm">
                {quantity}
            </div>

            <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors border-l border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onAdjust(quantity + 1)}
            >
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
    );
}
