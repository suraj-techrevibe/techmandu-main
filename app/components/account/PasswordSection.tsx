import { Check } from 'lucide-react';
import { useState } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import { ValidatedInput } from '../Input';

interface PasswordSectionProps {
  validator: any;
  isSubmitting?: boolean;
  apiError?: string;
  successMessage?: string;
}

export function PasswordSection({
  validator,
  isSubmitting,
  apiError,
  successMessage,
}: PasswordSectionProps) {
  const [newPassword, setNewPassword] = useState('');

  // Calculate password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 10, label: '', color: 'bg-red-500' };

    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    if (score <= 25) return { score: 25, label: 'Weak', color: 'bg-red-500' };
    if (score <= 50)
      return { score: 50, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 75)
      return { score: 75, label: 'Good', color: 'bg-yellow-500' };
    return { score: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength(newPassword);

  // Password requirements
  const requirements = [
    {
      text: '8 characters',
      met: newPassword.length >= 8,
    },
    {
      text: '1 lower case character',
      met: /[a-z]/.test(newPassword),
    },
    {
      text: '1 special character',
      met: /[^A-Za-z0-9]/.test(newPassword),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 pb-3 inline-block">
        Password
      </h3>

      <ValidatedForm validator={validator} method="post">
        <input type="hidden" name="intent" value="updatePassword" />

        {apiError && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm border border-green-200">
            {successMessage}
          </div>
        )}

        <div className="flex md:items-center gap-3 flex-col md:flex-row">
          <div className="grow mb-4">
            <label className="block text-xs md:text-sm text-gray-500 mb-2">
              Current Password
            </label>
            <ValidatedInput
              name="currentPassword"
              type="password"
              className="w-full"
            />
          </div>

          <div className="grow mb-4">
            <label className="block text-xs md:text-sm text-gray-500 mb-2">
              New Password
            </label>
            <ValidatedInput
              name="newPassword"
              type="password"
              className="w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm md:text-base font-semibold text-gray-900">
              Password Strength
            </span>
          </div>
          <div className="w-full md:w-1/2 bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Password should be long enough, unique to you, and difficult for
            other to guess.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-xs md:text-sm font-medium text-gray-700 mb-3">
            Password must contain
          </p>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 text-xs md:text-sm ${
                  req.met ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {req.met ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-200" />
                )}
                {req.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto font-semibold rounded-lg px-6 md:px-8 py-2.5 md:py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[#253574] text-white hover:bg-[#253574]/90 focus:ring-[#253574]/80 disabled:opacity-50 text-sm md:text-base cursor-pointer"
          >
            {isSubmitting ? 'Saving...' : 'Save Password'}
          </button>
        </div>
      </ValidatedForm>
    </div>
  );
}
