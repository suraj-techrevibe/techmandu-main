import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
    title: string;
    description?: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
    completedSteps: number[];
}

export const StepIndicator = ({
    steps,
    currentStep,
    completedSteps,
}: StepIndicatorProps) => {
    return (
        <nav aria-label="Progress" className="mb-8">
            <ol className="flex items-center justify-between md:justify-center md:space-x-8">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = completedSteps.includes(stepNumber);
                    const isCurrent = currentStep === stepNumber;

                    return (
                        <li
                            key={stepNumber}
                            className="relative flex flex-col items-center flex-1 md:flex-initial"
                        >
                            {/* Connector line (hidden for first step) */}
                            {index !== 0 && (
                                <div
                                    className={`absolute top-5 right-1/2 hidden md:block w-full h-0.5 ${isCompleted || isCurrent
                                        ? 'bg-primary2'
                                        : 'bg-gray-300'
                                        }`}
                                    style={{ right: '50%', left: '-50%', transform: 'translateY(-50%)' }}
                                />
                            )}

                            {/* Step circle */}
                            <div className="relative flex items-center justify-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${isCompleted
                                        ? 'border-primary2 bg-primary2'
                                        : isCurrent
                                            ? 'border-primary2 bg-white'
                                            : 'border-gray-300 bg-white'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <CheckIcon className="h-6 w-6 text-white" />
                                    ) : (
                                        <span
                                            className={`text-sm font-semibold ${isCurrent ? 'text-primary2' : 'text-gray-500'
                                                }`}
                                        >
                                            {stepNumber}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Step label */}
                            <div className="mt-2 text-center">
                                <p
                                    className={`text-sm font-medium ${isCurrent
                                        ? 'text-primary2'
                                        : isCompleted
                                            ? 'text-gray-900'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    {step.title}
                                </p>
                                {step.description && (
                                    <p className="text-xs text-gray-500 hidden md:block">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
