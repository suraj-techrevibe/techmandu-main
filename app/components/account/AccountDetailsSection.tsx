import { Phone } from 'lucide-react';
import { ValidatedForm } from 'remix-validated-form';
import { FieldsetInput } from './FieldsetInput';

interface AccountDetailsSectionProps {
    firstName: string;
    // middleName?: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    validator: any;
    isSubmitting?: boolean;
}

export function AccountDetailsSection({
    firstName,
    // middleName,
    lastName,
    email,
    phoneNumber,
    validator,
    isSubmitting,
}: AccountDetailsSectionProps) {
    const fullName = `${firstName} ${lastName}`;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 pb-3 inline-block">
                    Account Details
                </h3>

                <ValidatedForm
                    validator={validator}
                    method="post"
                    defaultValues={{
                        firstName,
                        lastName,
                        phoneNumber: phoneNumber ?? '',
                    }}
                >
                    <input type="hidden" name="intent" value="updateDetails" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FieldsetInput
                            name="firstName"
                            label="First Name"
                            placeholder="Enter your first name"
                            defaultValue={firstName}
                        />

                        {/* <FieldsetInput
                            name="middleName"
                            label="Middle Name"
                            placeholder="Enter your middle name"
                            defaultValue={middleName ?? ''}
                        /> */}

                        <FieldsetInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter your last name"
                            defaultValue={lastName}
                        />
                    </div>

                    <div className="mb-6">
                        <FieldsetInput
                            name="phoneNumber"
                            label="Phone Number"
                            type="tel"
                            placeholder="Enter your phone number"
                            defaultValue={phoneNumber ?? ''}
                            icon={<Phone className="h-5 w-5 text-gray-400" />}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-semibold rounded-2xl px-8 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[#253574] text-white hover:bg-[#253574]/80 focus:ring-[#253574] disabled:bg-[#253574]/80 disabled:text-[#253574]/80"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Profile'}
                    </button>
                </ValidatedForm>
            </div>
        </div>
    );
}
