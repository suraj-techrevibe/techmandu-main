import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildStreetLine2,
  isValleyCity,
  normaliseNepalPhone,
  splitStreetLine2,
  validateRecipient,
} from './nepal-checkout.ts';

describe('normaliseNepalPhone', () => {
  it('strips +977, spaces and dashes', () => {
    assert.equal(normaliseNepalPhone('+977 984-123-4567'), '9841234567');
    assert.equal(normaliseNepalPhone('(01) 4412345'), '014412345');
  });
  it('rejects empty, too short, too long and placeholder values', () => {
    assert.equal(normaliseNepalPhone(''), undefined);
    assert.equal(normaliseNepalPhone(undefined), undefined);
    assert.equal(normaliseNepalPhone('12345'), undefined);
    assert.equal(normaliseNepalPhone('default'), undefined);
    assert.equal(normaliseNepalPhone('98412345678901'), undefined);
  });
});

describe('isValleyCity', () => {
  it('is true for Valley cities in any case', () => {
    for (const city of ['Kathmandu', 'LALITPUR', 'Bhaktapur', 'Kirtipur', 'Madhyapur Thimi']) {
      assert.equal(isValleyCity(city), true, city);
    }
  });
  it('is false for cities outside the Valley and for empty values', () => {
    for (const city of ['Pokhara', 'Biratnagar', 'Butwal', '', undefined, null]) {
      assert.equal(isValleyCity(city), false, String(city));
    }
  });
});

describe('buildStreetLine2 / splitStreetLine2', () => {
  it('writes the exact words the backend parseRingRoadZone looks for', () => {
    assert.equal(buildStreetLine2('inside', ''), 'Inside Ring Road');
    assert.equal(buildStreetLine2('outside', 'near Koteshwor chowk'), 'Outside Ring Road, near Koteshwor chowk');
  });
  it('keeps only the landmark when no ring road is chosen (not a Valley address)', () => {
    assert.equal(buildStreetLine2(undefined, ' near the lake '), 'near the lake');
    assert.equal(buildStreetLine2(undefined, ''), '');
  });
  it('round-trips', () => {
    for (const rr of ['inside', 'outside'] as const) {
      for (const landmark of ['', 'near Baneshwor, 2nd floor']) {
        const back = splitStreetLine2(buildStreetLine2(rr, landmark));
        assert.deepEqual(back, { ringRoad: rr, landmark });
      }
    }
  });
  it('reads older free text, and leaves other text as the landmark', () => {
    assert.deepEqual(splitStreetLine2('outside the ring road - Gwarko'), { ringRoad: 'outside', landmark: 'Gwarko' });
    assert.deepEqual(splitStreetLine2('House 5, Lakeside'), { ringRoad: undefined, landmark: 'House 5, Lakeside' });
    assert.deepEqual(splitStreetLine2(null), { ringRoad: undefined, landmark: '' });
  });
});

describe('validateRecipient', () => {
  const good = { fullName: 'Sita Shrestha', phoneNumber: '9841234567', city: 'Kathmandu', ringRoad: 'inside' };
  it('passes a complete Valley recipient', () => {
    assert.deepEqual(validateRecipient(good), {});
  });
  it('requires a name and a valid phone', () => {
    const errors = validateRecipient({ ...good, fullName: '  ', phoneNumber: '123' });
    assert.ok(errors.fullName);
    assert.ok(errors.phoneNumber);
  });
  it('requires a Ring Road choice only for Valley cities', () => {
    assert.ok(validateRecipient({ ...good, ringRoad: '' }).ringRoad);
    assert.ok(validateRecipient({ ...good, ringRoad: 'middle' }).ringRoad);
    assert.deepEqual(validateRecipient({ ...good, city: 'Pokhara', ringRoad: '' }), {});
  });
});
