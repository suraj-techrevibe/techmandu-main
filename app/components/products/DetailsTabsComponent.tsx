import { useState } from 'react';
import { ProductQuery } from '~/generated/graphql';

type Variant = NonNullable<ProductQuery['product']>['variants'][number];
type Spec = NonNullable<Variant['customFields']>['specification'];

interface Props {
  description: string;
  specifications?: Spec | null | undefined;
  returns?: NonNullable<Variant['customFields']>['return'];
}

type TabKey = 'description' | 'specifications' | 'return' | 'reviews';

const TABS: { id: TabKey; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'return', label: 'Return' },
  // { id: 'reviews', label: 'Reviews' },
];

const DetailsTabsComponent = ({
  description,
  returns,
  specifications,
}: Props) => {
  const [activeTab, setActiveTab] = useState<TabKey>('description');

  return (
    <div className="mt-14">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex items-center justify-center gap-[50px]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-[8px] md:text-sm transition-colors text-center ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'description' && (
          <p
            dangerouslySetInnerHTML={{
              __html: description || 'No Information.',
            }}
          />
        )}

        {activeTab === 'specifications' &&
          (specifications && specifications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[74px] items-center justify-between">
              {specifications.map((spec, idx) => (
                <div
                  key={spec?.key ?? idx}
                  className="flex items-center gap-[17px]"
                >
                  <p className=" text-[14px] leading-4 font-medium">
                    {spec?.key}
                  </p>
                  <p className="text-[#818181] text-[14px] leading-4 font-medium">
                    {spec?.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>No Specifications found</div>
          ))}

        {activeTab === 'return' && (
          <div>
            {
              <p
                dangerouslySetInnerHTML={{
                  __html: returns || 'No Returns Information.',
                }}
              />
            }
          </div>
        )}
        {activeTab === 'reviews' && <div>Reviews</div>}
      </div>
    </div>
  );
};

export default DetailsTabsComponent;
