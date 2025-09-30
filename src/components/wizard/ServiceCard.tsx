import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  footnote?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceCard = ({
  icon,
  title,
  description,
  footnote,
  isSelected,
  onSelect
}: ServiceCardProps) => {
  return (
    <Card
      onClick={onSelect}
      className={`
        relative p-6 cursor-pointer transition-all duration-300
        hover:shadow-lg hover:scale-105 group
        ${
          isSelected
            ? 'border-2 border-interbank-primary shadow-lg bg-interbank-light/30'
            : 'border-2 border-gray-200 hover:border-interbank-primary/50'
        }
      `}
    >
      {/* Selection Indicator */}
      <div
        className={`
          absolute top-4 right-4 w-6 h-6 rounded-full border-2
          flex items-center justify-center transition-all duration-300
          ${
            isSelected
              ? 'border-interbank-primary bg-interbank-primary'
              : 'border-gray-300 bg-white group-hover:border-interbank-primary/50'
          }
        `}
      >
        {isSelected && <Check className="w-4 h-4 text-white" />}
      </div>

      {/* Icon */}
      <div
        className={`
          text-4xl mb-4 transition-all duration-300
          ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className={`
          text-lg font-semibold mb-2 transition-colors duration-300
          ${isSelected ? 'text-interbank-primary' : 'text-gray-800'}
        `}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 min-h-[60px]">{description}</p>

      {/* Footnote */}
      {footnote && (
        <p className="text-xs text-muted-foreground mt-3 italic">{footnote}</p>
      )}

      {/* Visual feedback on hover */}
      <div
        className={`
          absolute inset-0 rounded-lg pointer-events-none
          transition-all duration-300
          ${
            isSelected
              ? 'bg-interbank-primary/5'
              : 'bg-transparent group-hover:bg-interbank-primary/5'
          }
        `}
      />
    </Card>
  );
};

export default ServiceCard;