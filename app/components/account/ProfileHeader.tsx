import { Edit } from 'lucide-react';

interface ProfileHeaderProps {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatarUrl?: string;
    onChangeProfilePicture?: () => void;
    onUpdateEmail?: () => void;
    pendingEmail?: string;
}

export function ProfileHeader({
    name,
    email,
    phone,
    avatarUrl,
    onChangeProfilePicture,
    onUpdateEmail,
    pendingEmail,
}: ProfileHeaderProps) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#F1F3FB] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-lg md:text-2xl font-semibold text-gray-600">
                            {initials}
                        </span>
                    )}
                </div>
                <div className="min-w-0">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 truncate">{name}</h2>
                    {pendingEmail && (
                        <p className="text-xs md:text-sm text-gray-500 truncate flex items-center gap-2">
                            <span>{pendingEmail}</span>
                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                Awaiting Confirmation
                            </span>
                        </p>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-1 md:gap-2 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs md:text-sm text-gray-900 block truncate">
                        <span className="font-medium">Email:</span>{' '}
                        <span className="text-gray-600">{email}</span>
                    </span>
                    {onUpdateEmail && (
                        <button
                            onClick={onUpdateEmail}
                            className="flex-shrink-0 p-1 text-[#253574] hover:bg-[#253574]/10 rounded transition-colors"
                            title="Update Email"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {phone && (
                    <div className="min-w-0">
                        <span className="text-xs md:text-sm text-gray-900 block truncate">
                            <span className="font-medium">Phone:</span>{' '}
                            <span className="text-gray-600">{phone}</span>
                        </span>
                    </div>
                )}
            </div>

            {onChangeProfilePicture && (
                <button
                    onClick={onChangeProfilePicture}
                    className="w-full md:w-auto font-semibold rounded-lg px-4 md:px-8 py-2 md:py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-transparent border-2 border-[#253574] text-[#253574] hover:bg-[#253574]/80 hover:text-white flex-shrink-0 text-xs md:text-base"
                >
                    <span className="truncate">Change Profile Picture</span>
                </button>
            )}
        </div>
    );
}
