import { useFormContext } from 'remix-validated-form';
import { cn } from '~/lib/utils';
import { RingRoad } from '~/utils/nepal-checkout';

interface RecipientDetailsProps {
  /** True when the chosen city is in the Kathmandu Valley. Ring Road is only asked then. */
  isValley: boolean;
  ringRoad: RingRoad | undefined;
  onRingRoadChange: (value: RingRoad) => void;
  landmark: string;
  onLandmarkChange: (value: string) => void;
  note: string;
  onNoteChange: (value: string) => void;
  errors?: { ringRoad?: string; recipientNote?: string };
}

const RING_ROAD_CHOICES: { value: RingRoad; title: string; help: string }[] = [
  { value: 'inside', title: 'Inside Ring Road', help: 'Central Kathmandu, Patan, Baneshwor…' },
  { value: 'outside', title: 'Outside Ring Road', help: 'Beyond the Ring Road, e.g. Budhanilkantha' },
];

const fieldsetClass = (hasError: boolean) =>
  cn(
    'border rounded-lg px-3 py-2.5 focus-within:border-gray-400 transition-colors outline-none',
    hasError ? 'border-red-500' : 'border-gray-300',
  );

const legendClass = (hasError: boolean) =>
  cn('text-xs px-1.5', hasError ? 'text-red-500' : 'text-gray-500');

/**
 * "Who is this for" part of the Nepal shipping address: Ring Road (Valley only), a landmark, and a
 * gift note. It posts three plain form fields: ringRoad, landmark and recipientNote. The server
 * turns ringRoad + landmark into streetLine2 (see buildStreetLine2) and saves the note on the order.
 */
export function RecipientDetails({
  isValley,
  ringRoad,
  onRingRoadChange,
  landmark,
  onLandmarkChange,
  note,
  onNoteChange,
  errors,
}: RecipientDetailsProps) {
  return (
    <div className="col-span-2 space-y-3">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
        <p className="font-medium">Recipient in Nepal</p>
        <p className="mt-1 text-primary/80">
          Enter the details of the person who will receive this order in Nepal, not your own. Our rider or
          courier calls this number before delivery.
        </p>
      </div>

      {isValley ? (
        <fieldset className={fieldsetClass(Boolean(errors?.ringRoad))}>
          <legend className={legendClass(Boolean(errors?.ringRoad))}>
            Is the address inside or outside Ring Road?
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {RING_ROAD_CHOICES.map((choice) => {
              const checked = ringRoad === choice.value;
              return (
                <label
                  key={choice.value}
                  className={cn(
                    'flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm transition-colors',
                    checked
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-gray-400',
                  )}
                >
                  <input
                    type="radio"
                    name="ringRoad"
                    value={choice.value}
                    checked={checked}
                    onChange={() => onRingRoadChange(choice.value)}
                    className="mt-0.5 accent-primary"
                  />
                  <span>
                    <span className="block font-medium text-gray-900">{choice.title}</span>
                    <span className="block text-xs text-gray-500">{choice.help}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {errors?.ringRoad && <p className="mt-2 text-xs text-red-700">{errors.ringRoad}</p>}
        </fieldset>
      ) : (
        // Outside the Valley there is no Ring Road. Send an empty value so the server clears any old one.
        <input type="hidden" name="ringRoad" value="" />
      )}

      <fieldset className={fieldsetClass(false)}>
        <legend className={legendClass(false)}>Nearest landmark (optional)</legend>
        <input
          type="text"
          name="landmark"
          value={landmark}
          onChange={(e) => onLandmarkChange(e.target.value)}
          placeholder="e.g. near the red temple, blue gate"
          maxLength={120}
          className="w-full border-none bg-transparent p-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
        />
      </fieldset>

      <fieldset className={fieldsetClass(Boolean(errors?.recipientNote))}>
        <legend className={legendClass(Boolean(errors?.recipientNote))}>
          Who is this gift for? (optional)
        </legend>
        <textarea
          name="recipientNote"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="e.g. For my mother Sita, her birthday is on Friday"
          rows={2}
          maxLength={500}
          className="w-full resize-none border-none bg-transparent p-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
        />
      </fieldset>
      {errors?.recipientNote && <p className="-mt-2 text-xs text-red-700">{errors.recipientNote}</p>}
    </div>
  );
}

/** Same fields, for use inside a ValidatedForm: it reads the validation errors from the form. */
export function RecipientDetailsInForm(props: Omit<RecipientDetailsProps, 'errors'>) {
  const { fieldErrors } = useFormContext();
  return (
    <RecipientDetails
      {...props}
      errors={{
        ringRoad: fieldErrors.ringRoad,
        recipientNote: fieldErrors.recipientNote,
      }}
    />
  );
}
