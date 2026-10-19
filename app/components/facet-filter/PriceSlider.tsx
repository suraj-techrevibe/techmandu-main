import { Disclosure } from '@headlessui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Slider } from '../ui/slider';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useSearchParams } from '@remix-run/react';

const MIN_MAX = [0, 500000];

export function PriceSlider() {
  const [range, setRange] = useState(MIN_MAX);
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  useEffect(() => {
    if (minPrice && maxPrice) {
      setRange([Number(minPrice), Number(maxPrice)]);
    }
  }, [minPrice, maxPrice]);

  function handleApply() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('minPrice', range[0].toString());
    newSearchParams.set('maxPrice', range[1].toString());
    setSearchParams(newSearchParams);
  }

  return (
    <Disclosure
      as="div"
      key="price-slider"
      defaultOpen={true}
      className="border-b border-gray-200 py-6"
    >
      {({ open }) => (
        <>
          <div className="-my-3 flow-root">
            <Disclosure.Button className="py-3 w-full flex items-center justify-between text-sm text-black text-border">
              <span className="font-medium text-black uppercase">Price</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <ChevronUp
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="pt-6">
            <div className="flex items-center justify-between gap-2 w-full mb-6">
              <input
                type="number"
                min={MIN_MAX[0]}
                max={MIN_MAX[1]}
                value={range[0]}
                onChange={(e) => setRange([Number(e.target.value), range[1]])}
                className="text-xs rounded w-full"
                data-ignore-form
              />
              <input
                type="number"
                min={MIN_MAX[0]}
                max={MIN_MAX[1]}
                value={range[1]}
                onChange={(e) => setRange([range[0], Number(e.target.value)])}
                className="text-xs rounded w-full"
                data-ignore-form
              />
            </div>
            <div className="space-y-6">
              <Slider
                defaultValue={[MIN_MAX[0], MIN_MAX[1]]}
                value={[range[0], range[1]]}
                max={MIN_MAX[1]}
                min={MIN_MAX[0]}
                step={50}
                onValueChange={(value) => setRange(value)}
                className="w-full"
                data-ignore-form
              />
            </div>
            <div className="mt-4 w-full flex justify-end">
              <Button onClick={handleApply}>Apply</Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
