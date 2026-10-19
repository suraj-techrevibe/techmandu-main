import { X } from 'lucide-react';
import { useState } from 'react';

interface EmailUpdateModalProps {
    isOpen: boolean;
    currentEmail: string;
    onClose: () => void;
    onSubmit: (newEmail: string, password: string) => void;
    isSubmitting: boolean;
    error?: string;
    success?: boolean;
}

export function EmailUpdateModal({
    isOpen,
    onClose,
    currentEmail,
    onSubmit,
    isSubmitting,
    error,
    success,
}: EmailUpdateModalProps) {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newEmail, password);
    };

    const handleClose = () => {
        setNewEmail('');
        setPassword('');
        onClose();
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Update Email Address
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Email
                        </label>
                        <input
                            type="email"
                            value={currentEmail}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Email Address
                        </label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253574] focus:border-transparent"
                            placeholder="Enter new email address"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253574] focus:border-transparent"
                            placeholder="Enter your password to confirm"
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !newEmail || !password || newEmail === currentEmail}
                            className="flex-1 px-4 py-2.5 bg-[#253574] text-white font-semibold rounded-lg hover:bg-[#253574]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Update Email'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
