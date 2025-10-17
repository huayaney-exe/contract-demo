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
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Background connector line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 rounded-full z-0">
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / totalSteps) * 100}%`,
              background: 'hsl(var(--interbank-secondary-blue))'
            }}
          />
        </div>

        {/* Step Circles */}
        <div className="relative flex justify-between z-10">
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
                  flex flex-col items-center group relative z-20
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                  transition-all duration-300
                `}
              >
                {/* Circle with solid background - NO TRANSPARENCY */}
                <div
                  className={`
                    relative flex items-center justify-center
                    w-8 h-8 rounded-full transition-all duration-300
                    font-['Geometria',sans-serif] font-medium text-base
                    ${
                      isActive
                        ? 'scale-110'
                        : isClickable
                        ? 'hover:scale-105'
                        : ''
                    }
                  `}
                  style={{
                    background: isActive || isComplete
                      ? 'hsl(var(--interbank-secondary-blue))'
                      : 'hsl(var(--interbank-white))',
                    border: isActive || isComplete
                      ? '2px solid hsl(var(--interbank-secondary-blue))'
                      : '2px solid hsl(var(--interbank-secondary-blue-lighter))',
                    color: isActive || isComplete
                      ? 'hsl(var(--interbank-white))'
                      : 'hsl(var(--interbank-secondary-blue-lighter))',
                    outline: isActive
                      ? '8px solid hsl(var(--interbank-secondary-blue-pale))'
                      : 'none',
                    boxShadow: isActive || isComplete
                      ? '0px 2px 8px rgba(0, 57, 166, 0.25)'
                      : 'none',
                    zIndex: isActive ? 30 : 20
                  }}
                >
                  {isComplete && !isActive ? (
                    <Check className="w-4 h-4" style={{ color: 'hsl(var(--interbank-white))' }} />
                  ) : (
                    <span className="relative z-10">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`
                    mt-3 text-xs font-medium text-center max-w-[100px] leading-tight
                    transition-colors duration-300
                    font-['Geometria',sans-serif]
                  `}
                  style={{
                    color: isActive
                      ? 'hsl(var(--interbank-secondary-blue))'
                      : isComplete
                      ? 'hsl(var(--interbank-gray-900))'
                      : 'hsl(var(--interbank-gray-500))'
                  }}
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
        <p className="text-sm" style={{ color: 'hsl(var(--interbank-gray-700))' }}>
          Paso{' '}
          <span className="font-semibold" style={{ color: 'hsl(var(--interbank-secondary-blue))' }}>
            {currentStep + 1}
          </span>{' '}
          de <span className="font-semibold">{totalSteps}</span>
        </p>
        <div className="mt-2 flex justify-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: index === currentStep ? '32px' : '8px',
                background: index === currentStep
                  ? 'hsl(var(--interbank-secondary-blue))'
                  : 'hsl(var(--interbank-gray-300))'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
