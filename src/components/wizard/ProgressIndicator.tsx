import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    id: string;
    title: string;
    isComplete: boolean;
  }>;
  onStepClick?: (stepIndex: number) => void;
}

const ProgressIndicator = ({
  currentStep,
  totalSteps,
  steps,
  onStepClick
}: ProgressIndicatorProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-interbank-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Circles */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = step.isComplete || index < currentStep;
            const isClickable = isComplete || index === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={`
                  flex flex-col items-center group
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                  transition-all duration-300
                `}
              >
                {/* Circle */}
                <div
                  className={`
                    relative z-10 flex items-center justify-center
                    w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${
                      isActive
                        ? 'border-interbank-primary bg-interbank-primary scale-110 shadow-lg'
                        : isComplete
                        ? 'border-green-500 bg-green-500 hover:scale-105'
                        : 'border-gray-300 bg-white'
                    }
                  `}
                >
                  {isComplete && !isActive ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`
                        text-sm font-semibold
                        ${
                          isActive || isComplete
                            ? 'text-white'
                            : 'text-gray-400'
                        }
                      `}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center max-w-[80px]
                    transition-colors duration-300
                    ${
                      isActive
                        ? 'text-interbank-primary'
                        : isComplete
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Counter */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          Paso{' '}
          <span className="font-semibold text-interbank-primary">
            {currentStep + 1}
          </span>{' '}
          de <span className="font-semibold">{totalSteps}</span>
        </p>
        <div className="mt-2 flex justify-center gap-1">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`
                h-1 rounded-full transition-all duration-300
                ${index === currentStep ? 'w-8 bg-interbank-primary' : 'w-2 bg-gray-300'}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;