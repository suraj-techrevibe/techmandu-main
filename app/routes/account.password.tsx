import { PencilIcon } from '@heroicons/react/24/outline';
import { useActionData, useNavigation } from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useRef, useState } from 'react';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';
import { Button } from '~/components/Button';
import { ErrorMessage } from '~/components/ErrorMessage';
import { HighlightedButton } from '~/components/HighlightedButton';
import { ValidatedInput } from '~/components/Input';
import { SuccessMessage } from '~/components/SuccessMessage';
import { updateCustomerPassword } from '~/providers/account/account';
import {
  isErrorResult,
  isValidationErrorResponseData,
} from '~/utils/validation-helper';
import { useTranslation } from 'react-i18next';

export const validator = withZod(
  z
    .object({
      currentPassword: z.string().min(1, { message: 'Password is required' }),
      newPassword: z.string().min(1, { message: 'Password is required' }),
      confirmPassword: z.string().min(1, { message: 'Password is required' }),
    })
    .refine(
      ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
      {
        path: ['confirmPassword'],
        message: 'Passwords must match',
      },
    ),
);

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();

  const result = await validator.validate(body);
  if (result.error) {
    return validationError(result.error);
  }

  const { currentPassword, newPassword } = result.data;

  const res = await updateCustomerPassword(
    { currentPassword, newPassword },
    { request },
  );

  if (res.__typename !== 'Success') {
    return json(res, { status: 401 });
  }

  return json(res);
}

export default function AccountPassword() {
  const [editing, setEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const actionDataHook = useActionData<typeof action>();
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isValidationErrorResponseData(actionDataHook)) {
      // no additional handling
      return;
    }

    if (isErrorResult(actionDataHook)) {
      // set error message
      setErrorMessage(actionDataHook.message);
      setIsSaved(false);
      return;
    }

    if (actionDataHook?.success) {
      // show success message and reset form
      setErrorMessage(undefined);
      setIsSaved(true);
      setEditing(false);
      formRef.current?.reset();
    }
  }, [actionDataHook]);

  return (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
    
    <ValidatedForm validator={validator} method="post" formRef={formRef}>
      <div className="space-y-6">
        {editing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                required
                label={t('account.currentPassword')}
                name="currentPassword"
                type="password"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                required
                label={t('account.newPassword')}
                name="newPassword"
                type="password"
              />
              <ValidatedInput
                required
                label={t('account.confirmPassword')}
                name="confirmPassword"
                type="password"
              />
            </div>
          </div>
        )}

        {isSaved && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <SuccessMessage
              heading={t('account.pwdSuccessHeading')}
              message={t('account.pwdSuccessMessage')}
            />
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <ErrorMessage
              heading={t('account.pwdErrorMessage')}
              message={errorMessage}
            />
          </div>
        )}

        <div className="pt-4">
          {editing ? (
            <div className="flex gap-3">
              <HighlightedButton type="submit" isSubmitting={state === 'submitting'}>
                {t('account.savePassword')}
              </HighlightedButton>
              <Button type="reset" onClick={() => setEditing(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          ) : (
            <HighlightedButton type="button" onClick={() => setEditing(true)}>
              <PencilIcon className="w-4 h-4 mr-2" />
              {t('account.changePassword')}
            </HighlightedButton>
          )}
        </div>
      </div>
    </ValidatedForm>
  </div>
);
}
