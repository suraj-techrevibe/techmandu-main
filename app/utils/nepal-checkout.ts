/**
 * Pure helpers for the "recipient in Nepal" shipping address. No React or Remix imports, so they
 * can be unit tested directly (see nepal-checkout.test.ts).
 *
 * normaliseNepalPhone and VALLEY_AREAS mirror the backend file
 * techmandu-backend-main/src/plugins/ncm/util/shipping-price.util.ts.
 * Keep them identical: the browser check must accept exactly what the server will accept.
 */

/** Same rule as the backend: local digits only, 7 to 10 of them, +977 removed. */
export function normaliseNepalPhone(raw: string | null | undefined): string | undefined {
  let digits = (raw ?? '').replace(/\D/g, '');
  if (digits.startsWith('977') && digits.length > 10) digits = digits.slice(3);
  if (digits.length < 7 || digits.length > 10) return undefined;
  return digits;
}

export const VALLEY_AREAS = [
  'kathmandu', 'lalitpur', 'bhaktapur', 'patan', 'kirtipur', 'thimi', 'madhyapur',
  'budhanilkantha', 'tokha', 'tarakeshwar', 'gokarneshwar', 'kageshwari', 'manohara',
  'chandragiri', 'nagarjun', 'dakshinkali', 'shankharapur', 'changunarayan',
  'godawari', 'konjyosom', 'mahalaxmi', 'suryabinayak', 'bode', 'sanothimi',
  'baneshwor', 'koteshwor', 'balkumari', 'imadol', 'satdobato', 'kalanki',
];

const normalise = (text: string) =>
  text
    .toLowerCase()
    .replace(/[_\-.,]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** True when the chosen city is in the Kathmandu Valley (this decides whether Ring Road is asked). */
export function isValleyCity(city: string | null | undefined): boolean {
  const text = normalise(city ?? '');
  if (!text) return false;
  return VALLEY_AREAS.some((area) => text.includes(area));
}

export type RingRoad = 'inside' | 'outside';

const RING_ROAD_LABEL: Record<RingRoad, string> = {
  inside: 'Inside Ring Road',
  outside: 'Outside Ring Road',
};

/**
 * Builds the streetLine2 value. The backend's parseRingRoadZone looks for the words
 * "inside ring road" / "outside ring road" in streetLine2, so this text is the contract.
 * A landmark typed by the customer follows after a comma.
 */
export function buildStreetLine2(
  ringRoad: RingRoad | undefined,
  landmark: string | null | undefined,
): string {
  const parts = [ringRoad ? RING_ROAD_LABEL[ringRoad] : '', (landmark ?? '').trim()];
  return parts.filter(Boolean).join(', ');
}

/** Reads a stored streetLine2 back into the form fields, so editing an address keeps its answers. */
export function splitStreetLine2(streetLine2: string | null | undefined): {
  ringRoad: RingRoad | undefined;
  landmark: string;
} {
  const raw = (streetLine2 ?? '').trim();
  const text = normalise(raw);
  const ringRoad: RingRoad | undefined = /\boutside (the )?ring road\b/.test(text)
    ? 'outside'
    : /\binside (the )?ring road\b/.test(text)
    ? 'inside'
    : undefined;
  if (!ringRoad) return { ringRoad, landmark: raw };
  const landmark = raw
    .replace(/\b(inside|outside)( the)? ring road\b/i, '')
    .replace(/^[\s,.\-]+|[\s,.\-]+$/g, '')
    .trim();
  return { ringRoad, landmark };
}

export interface RecipientInput {
  fullName?: string | null;
  phoneNumber?: string | null;
  city?: string | null;
  ringRoad?: string | null;
}

/** Field-level problems, keyed by form field name. An empty object means the recipient details are fine. */
export function validateRecipient(input: RecipientInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!(input.fullName ?? '').trim()) {
    errors.fullName = "Enter the recipient's full name";
  }
  if (!normaliseNepalPhone(input.phoneNumber)) {
    errors.phoneNumber = "Enter the recipient's Nepal phone number, e.g. 98XXXXXXXX";
  }
  if (isValleyCity(input.city) && input.ringRoad !== 'inside' && input.ringRoad !== 'outside') {
    errors.ringRoad = 'Choose inside or outside Ring Road';
  }
  return errors;
}
