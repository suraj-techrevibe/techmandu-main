import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { AccountDetailsSection } from '~/components/account/AccountDetailsSection';
import { DeleteAccountSection } from '~/components/account/DeleteAccountSection';
import { EmailUpdateModal } from '~/components/account/EmailUpdateModal';
import { PasswordSection } from '~/components/account/PasswordSection';
import { ProfileHeader } from '~/components/account/ProfileHeader';
import { ProfilePictureUploadModal } from '~/components/account/ProfilePictureUploadModal';
import {
  requestUpdateCustomerEmailAddress,
  updateCustomer,
  updateCustomerPassword,
} from '~/providers/account/account';
import { getActiveCustomerDetails } from '~/providers/customer/customer';

enum FormIntent {
  UpdateDetails = 'updateDetails',
  UpdatePassword = 'updatePassword',
  DeleteAccount = 'deleteAccount',
  RequestUpdateEmail = 'requestUpdateEmail',
}

export const detailsValidator = withZod(
  z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    // middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    phoneNumber: z.string().optional(),
  }),
);

const passwordValidator = withZod(
  z.object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
  }),
);

const emailUpdateValidator = withZod(
  z.object({
    password: z.string().min(1, { message: 'Password is required' }),
    newEmail: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Must be a valid email'),
  }),
);

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

type FormError = {
  message: string;
  intent?: string;
};

type CustomerUpdatedResponse = {
  customerUpdated: true;
};

type PasswordUpdatedResponse = {
  passwordUpdated: true;
};

type EmailUpdateRequestedResponse = {
  emailUpdateRequested: true;
  newEmail: string;
};

function isFormError(err: unknown): err is FormError {
  return (err as FormError).message !== undefined;
}

function isCustomerUpdatedResponse(
  response: unknown,
): response is CustomerUpdatedResponse {
  return (response as CustomerUpdatedResponse).customerUpdated !== undefined;
}

function isPasswordUpdatedResponse(
  response: unknown,
): response is PasswordUpdatedResponse {
  return (response as PasswordUpdatedResponse).passwordUpdated !== undefined;
}

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const intent = body.get('intent') as FormIntent | null;

  const formError = (formError: FormError, init?: number | ResponseInit) => {
    return json<FormError>(formError, init);
  };

  if (intent === FormIntent.UpdateDetails) {
    const result = await detailsValidator.validate(body);

    if (result.error) {
      return validationError(result.error);
    }

    const { firstName, /* middleName, */ lastName, phoneNumber } = result.data;
    await updateCustomer(
      {
        firstName,
        lastName,
        phoneNumber: phoneNumber || '',
        // Note: middleName would need backend support
      },
      { request },
    );

    return json({
      customerUpdated: true,
    });
  }

  if (intent === FormIntent.UpdatePassword) {
    const result = await passwordValidator.validate(body);

    if (result.error) {
      return validationError(result.error);
    }

    const { currentPassword, newPassword } = result.data;

    const updatePasswordResult = await updateCustomerPassword(
      {
        currentPassword,
        newPassword,
      },
      { request },
    );

    if (updatePasswordResult.__typename !== 'Success') {
      return formError({
        message: updatePasswordResult.message,
        intent: FormIntent.UpdatePassword,
      });
    }

    return json({
      passwordUpdated: true,
    });
  }

  if (intent === FormIntent.DeleteAccount) {
    return json({
      accountDeleted: true,
    });
  }

  if (intent === FormIntent.RequestUpdateEmail) {
    const result = await emailUpdateValidator.validate(body);

    if (result.error) {
      return validationError(result.error);
    }

    const { password, newEmail } = result.data;

    const requestResult = await requestUpdateCustomerEmailAddress(
      password,
      newEmail,
      { request },
    );

    if (requestResult?.__typename !== 'Success') {
      return formError({
        message: (requestResult as any)?.message || 'Something went wrong',
        intent: FormIntent.RequestUpdateEmail,
      });
    }

    return json({
      emailUpdateRequested: true,
      newEmail,
    });
  }

  return formError({ message: 'No valid form intent' }, { status: 401 });
}

export default function AccountDetails() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const actionDataHook = useActionData<typeof action>();
  const { t } = useTranslation();

  const { firstName, lastName, phoneNumber, emailAddress, id, customFields } =
    activeCustomer;
  const fullName = `${firstName} ${lastName}`;

  const { state } = useNavigation();
  const updateEmailFetcher = useFetcher<
    EmailUpdateRequestedResponse | FormError
  >();

  const [formError, setFormError] = useState<FormError>();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [showEmailUpdateModal, setShowEmailUpdateModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | undefined>();

  useEffect(() => {
    if (!actionDataHook) {
      return;
    }

    if (isCustomerUpdatedResponse(actionDataHook)) {
      setFormError(undefined);
      return;
    }

    if (isPasswordUpdatedResponse(actionDataHook)) {
      setFormError(undefined);
      setPasswordSuccess(true);
      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
      return;
    }

    if (isFormError(actionDataHook)) {
      setFormError(actionDataHook);
      return;
    }
  }, [actionDataHook]);

  const handleChangeProfilePicture = () => {
    setShowProfilePictureModal(true);
  };

  const handleUpdateEmail = () => {
    setShowEmailUpdateModal(true);
  };

  const handleEmailUpdate = (newEmail: string, password: string) => {
    updateEmailFetcher.submit(
      {
        intent: FormIntent.RequestUpdateEmail,
        newEmail,
        password,
      },
      { method: 'post' },
    );
  };

  // Close modal on success
  useEffect(() => {
    if (updateEmailFetcher.state === 'idle' && updateEmailFetcher.data) {
      if ('emailUpdateRequested' in updateEmailFetcher.data) {
        setPendingEmail(updateEmailFetcher.data.newEmail);
        setShowEmailUpdateModal(false);
      }
    }
  }, [updateEmailFetcher.state, updateEmailFetcher.data]);

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Delete account requested');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-[#F1F3FB] rounded-lg border border-gray-200 p-6">
        <ProfileHeader
          name={fullName}
          email={emailAddress}
          phone={phoneNumber || undefined}
          onChangeProfilePicture={handleChangeProfilePicture}
          onUpdateEmail={handleUpdateEmail}
          pendingEmail={pendingEmail}
          avatarUrl={customFields?.avatarUrl?.preview}
        />
      </div>

      {/* Email Update Modal */}
      <EmailUpdateModal
        isOpen={showEmailUpdateModal}
        onClose={() => setShowEmailUpdateModal(false)}
        currentEmail={emailAddress}
        onSubmit={handleEmailUpdate}
        isSubmitting={updateEmailFetcher.state === 'submitting'}
        error={
          updateEmailFetcher.data &&
          'message' in updateEmailFetcher.data &&
          updateEmailFetcher.data.intent === FormIntent.RequestUpdateEmail
            ? updateEmailFetcher.data.message
            : undefined
        }
        success={
          updateEmailFetcher.state === 'idle' &&
          updateEmailFetcher.data &&
          'emailUpdateRequested' in updateEmailFetcher.data
            ? true
            : false
        }
      />

      <ProfilePictureUploadModal
        isOpen={showProfilePictureModal}
        onClose={() => setShowProfilePictureModal(false)}
        userId={id}
        onSuccess={(imageUrl) => {
          // You might want to refresh the page or update local state
          window.location.reload();
        }}
      />

      {/* Account Details Section */}
      <AccountDetailsSection
        firstName={firstName}
        lastName={lastName}
        email={emailAddress}
        phoneNumber={phoneNumber || ''}
        validator={detailsValidator}
        isSubmitting={state === 'submitting'}
      />

      {/* Password Section */}
      <PasswordSection
        validator={passwordValidator}
        isSubmitting={state === 'submitting'}
        apiError={
          formError?.intent === FormIntent.UpdatePassword
            ? formError.message
            : undefined
        }
        successMessage={
          passwordSuccess ? 'Password updated successfully' : undefined
        }
      />

      {/* Delete Account Section */}
      <DeleteAccountSection
        onDeleteAccount={handleDeleteAccount}
        isDeleting={state === 'submitting'}
      />
    </div>
  );
}
