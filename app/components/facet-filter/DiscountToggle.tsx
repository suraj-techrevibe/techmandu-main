import { useSearchParams } from '@remix-run/react';
import { Switch } from '../ui/switch';

export function DiscountToggle() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isChecked = searchParams.get('discount') === 'on';

  return (
    <div className="flex items-center justify-between gap-3 py-6 border-b border-gray-200">
      <span className="font-semibold">Discount</span>
      <Switch
        name="discount"
        checked={isChecked}
        onCheckedChange={(checked) => {
          if (checked) {
            searchParams.set('discount', 'on');
            setSearchParams(searchParams);
          } else {
            searchParams.delete('discount');
            setSearchParams(searchParams);
          }
        }}
      />
    </div>
  );
}
