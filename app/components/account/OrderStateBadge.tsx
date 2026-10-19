import { useTranslation } from 'react-i18next';

// Copied from https://www.vendure.io/docs/typescript-api/orders/order-state/
type OrderState =
  | 'Created'
  | 'Draft'
  | 'AddingItems'
  | 'ArrangingPayment'
  | 'PaymentAuthorized'
  | 'PaymentSettled'
  | 'PartiallyShipped'
  | 'Shipped'
  | 'PartiallyDelivered'
  | 'Delivered'
  | 'Modifying'
  | 'ArrangingAdditionalPayment'
  | 'Cancelled';

export function OrderStateBadge({ state }: { state?: string }) {
  const { t } = useTranslation();

  let colorClasses = '';
  let displayText = '';

  switch (state as OrderState) {
    case 'PaymentAuthorized':
    case 'PaymentSettled':
    case 'Shipped':
    case 'PartiallyShipped':
    case 'PartiallyDelivered':
    case 'Modifying':
    case 'ArrangingPayment':
    case 'ArrangingAdditionalPayment':
      colorClasses = 'bg-blue-600 text-white';
      displayText = 'IN PROGRESS';
      break;
    case 'Delivered':
      colorClasses = 'bg-green-600 text-white';
      displayText = 'COMPLETED';
      break;
    case 'Cancelled':
      colorClasses = 'bg-red-600 text-white';
      displayText = 'CANCELED';
      break;
    default:
    case 'Draft':
    case 'AddingItems':
      colorClasses = 'bg-gray-100 text-gray-800';
      displayText = t(`order.states.${state}`) ?? 'UNKNOWN';
      break;
  }

  return (
    <span
      className={`text-xs font-semibold px-3 py-1.5 rounded uppercase whitespace-nowrap ${colorClasses}`}
    >
      {displayText || (t(`order.states.${state}`) ?? 'UNKNOWN')}
    </span>
  );
}
