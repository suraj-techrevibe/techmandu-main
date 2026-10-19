import { useActionData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useState } from 'react';
import { FileUploadZone } from '~/components/seller-registration/FileUploadZone';
import { SellerBenefits } from '~/components/seller-registration/SellerBenefits';
import { SellerFAQ } from '~/components/seller-registration/SellerFAQ';
import { SELLER_REGISTRATION_ENDPOINT } from '~/constants';

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  // Get all uploaded files from the 'documents' input
  const allFiles = formData.getAll('documents');

  // Filter to get only File objects
  const files = allFiles.filter(
    (file): file is File => file instanceof File && file.size > 0,
  );

  if (files.length < 2) {
    return {
      error:
        'Please upload at least 2 documents (PAN card and shop registration certificate).',
    };
  }

  try {
    const outgoing = new FormData();

    // Append other scalar fields (string values)
    for (const [key, value] of formData.entries()) {
      if (key === 'documents') continue; // skip file inputs
      if (typeof value === 'string') {
        outgoing.append(key, value);
      }
    }

    // Append all files
    files.forEach((file) => {
      outgoing.append('file', file);
    });

    const externalRes = await fetch(SELLER_REGISTRATION_ENDPOINT, {
      method: 'POST',
      body: outgoing,
    });

    let payload;
    try {
      payload = await externalRes.json();
    } catch {
      payload = null;
    }

    if (!externalRes.ok) {
      return json(
        {
          error:
            'Registration failed on remote server. Please contact support.',
        },
        { status: externalRes.status },
      );
    }

    return redirect('/vendor-registration/success');
  } catch (err: any) {
    return json({ error: err?.message || 'Network error' }, { status: 500 });
  }
}

interface FormData {
  businessName: string;
  address: string;
  businessRegistrationNo: string;
  panNo: string;
  ownerName: string;
  phone: string;
  email: string;
}

import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';

const SellerRegistrationForm = () => {
  const actionData = useActionData<typeof action>();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    address: '',
    businessRegistrationNo: '',
    panNo: '',
    ownerName: '',
    phone: '',
    email: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Validation for each step
  const isStep1Valid = () => {
    return (
      formData.businessName.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.businessRegistrationNo.trim() !== '' &&
      formData.panNo.trim() !== ''
    );
  };

  const isStep2Valid = () => {
    return (
      formData.ownerName.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.email.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  const isStep3Valid = () => {
    return uploadedFiles.length >= 2;
  };

  const handleContinue = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCompletedSteps([...completedSteps, 1]);
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid()) {
      setCompletedSteps([...completedSteps, 2]);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const outgoingFormData = new FormData(); // Renamed to avoid conflict with state formData

    // Add all text fields
    outgoingFormData.append('businessName', formData.businessName);
    outgoingFormData.append('address', formData.address);
    outgoingFormData.append(
      'businessRegistrationNo',
      formData.businessRegistrationNo,
    );
    outgoingFormData.append('panNo', formData.panNo);
    outgoingFormData.append('ownerName', formData.ownerName);
    outgoingFormData.append('phone', formData.phone);
    outgoingFormData.append('email', formData.email);

    // Add all uploaded files
    uploadedFiles.forEach((file) => {
      outgoingFormData.append('documents', file);
    });

    // Submit the form
    try {
      const response = await fetch(form.action || '/vendor-registration', {
        method: 'POST',
        body: outgoingFormData,
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      const data = (await response.json()) as { error?: string };
      if (data.error) {
        // Since we are using fetch, we need to handle the error UI manually
        // or trigger a re-render with the error.
        // For now, we'll alert the error if it exists.
        alert(data.error);
      } else if (response.ok) {
        // If it's OK but didn't redirect in the response object (sometimes Remix behavior)
        // Check if the body contains a redirect path
        window.location.href = '/vendor-registration/success';
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred during submission. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-gray-100 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <CustomBreadCrumb items={[{ name: 'Vendor Registration', href: '/vendor-registration' }]} />
        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-8 md:p-12">
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Hidden inputs to preserve data */}
            <input type="hidden" name="ownerName" value={formData.ownerName} />
            <input type="hidden" name="phone" value={formData.phone} />
            <input type="hidden" name="email" value={formData.email} />

            {/* Step 1: Business Information */}
            <div className={currentStep === 1 ? 'block' : 'hidden'}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  1. Business Information
                </h2>
                {/* Outlined indigo circle with checkmark for current step */}
                <div className="relative">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#312e81"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M8 12l3 3 5-5"
                      stroke="#312e81"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                    <legend className="text-sm text-gray-600 px-2">
                      Business Name<span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange('businessName', e.target.value)
                      }
                      className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      autoComplete="organization"
                    />
                  </fieldset>

                  <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                    <legend className="text-sm text-gray-600 px-2">
                      Business Address<span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      autoComplete="street-address"
                    />
                  </fieldset>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                    <legend className="text-sm text-gray-600 px-2">
                      Business Registration Number
                      <span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="text"
                      value={formData.businessRegistrationNo}
                      onChange={(e) =>
                        handleInputChange(
                          'businessRegistrationNo',
                          e.target.value,
                        )
                      }
                      className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      autoComplete="off"
                    />
                  </fieldset>

                  <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                    <legend className="text-sm text-gray-600 px-2">
                      PAN Number<span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="text"
                      value={formData.panNo}
                      onChange={(e) =>
                        handleInputChange('panNo', e.target.value)
                      }
                      className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      autoComplete="off"
                    />
                  </fieldset>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!isStep1Valid()}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${isStep1Valid()
                      ? 'bg-indigo-900 text-white hover:bg-indigo-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Collapsed Step 1 (when on step 2 or 3) */}
            {currentStep > 1 && (
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-500">
                      1. Business Information
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {formData.businessName}
                    </p>
                  </div>
                  {/* Filled gray circle with white checkmark for completed step */}
                  <div className="relative">
                    <svg className="h-8 w-8" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#9ca3af" />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            <div className={currentStep === 2 ? 'block' : 'hidden'}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  2. Contact Information
                </h2>
                {/* Outlined indigo circle with checkmark for current step */}
                <div className="relative">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#312e81"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M8 12l3 3 5-5"
                      stroke="#312e81"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                    <legend className="text-sm text-gray-600 px-2">
                      Owner Name<span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) =>
                        handleInputChange('ownerName', e.target.value)
                      }
                      className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      autoComplete="name"
                    />
                  </fieldset>

                  <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                    <legend className="text-sm text-gray-600 px-2">
                      Phone Number<span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                      autoComplete="tel"
                    />
                  </fieldset>
                </div>

                <fieldset className="border border-gray-300 rounded-lg px-4 pt-2 pb-3">
                  <legend className="text-sm text-gray-600 px-2">
                    Email Address<span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                    autoComplete="email"
                  />
                </fieldset>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!isStep2Valid()}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${isStep2Valid()
                      ? 'bg-indigo-900 text-white hover:bg-indigo-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>

            {/* Collapsed Step 2 (when on step 3) */}
            {currentStep > 2 && (
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-500">
                      2. Contact Information
                    </h2>
                    <p className="text-gray-600 mt-1">Phone No.</p>
                  </div>
                  {/* Filled gray circle with white checkmark for completed step */}
                  <div className="relative">
                    <svg className="h-8 w-8" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#9ca3af" />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents Upload */}
            <div className={currentStep === 3 ? 'block' : 'hidden'}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  3. Documents Upload<span className="text-red-500">*</span>
                </h2>
                {/* Outlined indigo circle with checkmark for current step */}
                <div className="relative">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#312e81"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M8 12l3 3 5-5"
                      stroke="#312e81"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Upload PAN Card (image or PDF) & Shop Registration Certificate
                (image or PDF)
              </p>

              <FileUploadZone
                name="documents"
                multiple={true}
                onChange={setUploadedFiles}
              />

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={!isStep3Valid()}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${isStep3Valid()
                      ? 'bg-indigo-900 text-white hover:bg-indigo-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Continue as Vendor
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>

            {/* Collapsed Steps Summary (only show below current step) */}
            {currentStep === 1 && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-lg font-medium text-gray-500">
                    2. Contact Method
                  </h3>
                  {/* Outlined gray circle for future step */}
                  <div className="relative">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-500">
                    3. Documents Upload
                  </h3>
                  {/* Outlined gray circle for future step */}
                  <div className="relative">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-lg font-medium text-gray-500">
                    3. Documents Upload<span className="text-red-500">*</span>
                  </h3>
                  {/* Outlined gray circle for future step */}
                  <div className="relative">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {actionData?.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{actionData.error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Benefits Section */}
        <SellerBenefits />

        {/* FAQ Section */}
        <SellerFAQ />
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
