import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import Modal from '../modal/Modal';

interface DeleteAccountSectionProps {
    onDeleteAccount?: () => void;
    isDeleting?: boolean;
}

export function DeleteAccountSection({
    onDeleteAccount,
    isDeleting,
}: DeleteAccountSectionProps) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDelete = () => {
        if (onDeleteAccount) {
            onDeleteAccount();
        }
        setShowConfirmModal(false);
    };

    return (
        <>
            <div className="bg-white rounded-lg border border-red-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 pb-3 inline-block">
                    Delete Account
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Permanently delete your account. This would delete all your details and you won't be
                    able to restore it later on.
                </p>
                <button
                    onClick={() => setShowConfirmModal(true)}
                    disabled={isDeleting}
                    className="font-semibold rounded-2xl px-8 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:text-red-100"
                >
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                </button>
            </div>

            <Modal
                isOpen={showConfirmModal}
                close={() => setShowConfirmModal(false)}
                size="small"
            >
                <Modal.Title>Confirm Account Deletion</Modal.Title>
                <Modal.Body>
                    <div className="space-y-4 my-6">
                        <p className="text-gray-700">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </p>
                        <p className="text-sm text-gray-600">
                            All your data, including order history, addresses, and preferences will be
                            permanently removed.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={() => setShowConfirmModal(false)}
                        className="font-semibold rounded-2xl px-8 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-purple-100 border-2 border-purple-700 text-purple-900 hover:bg-purple-200 disabled:opacity-70 disabled:bg-purple-50 disabled:text-purple-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="font-semibold rounded-2xl px-8 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:text-red-100"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
