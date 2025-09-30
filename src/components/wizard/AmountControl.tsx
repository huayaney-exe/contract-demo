import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AmountControlProps {
  label: string;
  currency: string;
  value: string;
  onChange: (value: string) => void;
  suggestion?: number;
  error?: string;
  success?: string;
  placeholder?: string;
}

const AmountControl = ({
  label,
  currency,
  value,
  onChange,
  suggestion = 100000,
  error,
  success,
  placeholder = "Ingresa el monto o escribe 'SL'"
}: AmountControlProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatNumber = (num: string) => {
    const cleaned = num.replace(/[^\d.]/g, '');
    if (!cleaned) return '';

    const parts = cleaned.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();

    // Allow "SL" or "SIN LIMITES"
    if (inputValue === 'SL' || inputValue === 'SIN LIMITES' || inputValue.startsWith('SIN')) {
      setDisplayValue(inputValue);
      onChange(inputValue);
      setShowSlider(false);
      return;
    }

    // Handle numeric input
    const numericValue = inputValue.replace(/[^\d.]/g, '');
    setDisplayValue(formatNumber(numericValue));
    onChange(numericValue);

    // Show slider if we have a numeric value
    if (numericValue && parseFloat(numericValue) > 0) {
      setShowSlider(true);
    }
  };

  const handleSliderChange = (values: number[]) => {
    const newValue = values[0].toString();
    setDisplayValue(formatNumber(newValue));
    onChange(newValue);
  };

  const handleQuickSelect = (amount: number) => {
    const amountStr = amount.toString();
    setDisplayValue(formatNumber(amountStr));
    onChange(amountStr);
    setShowSlider(true);
  };

  const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
  const sliderMax = Math.max(suggestion * 2, numericValue * 1.5, 500000);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center gap-2">
        {label}
        <span className="text-xs text-muted-foreground">({currency})</span>
      </Label>

      <div className="space-y-2">
        <div className="relative">
          <Input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`pr-10 ${
              error
                ? 'border-destructive focus-visible:ring-destructive'
                : success
                ? 'border-green-500 focus-visible:ring-green-500'
                : ''
            }`}
          />

          {/* Validation Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error && (
              <AlertCircle className="w-5 h-5 text-destructive" />
            )}
            {success && !error && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && !error && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            {success}
          </p>
        )}

        {/* Quick Select Buttons */}
        {!value.toUpperCase().includes('SL') && !value.toUpperCase().includes('SIN') && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickSelect(10000)}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-interbank-primary hover:bg-interbank-light transition-colors"
            >
              {currency} 10,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(50000)}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-interbank-primary hover:bg-interbank-light transition-colors"
            >
              {currency} 50,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(100000)}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-interbank-primary hover:bg-interbank-light transition-colors"
            >
              {currency} 100,000
            </button>
            <button
              type="button"
              onClick={() => {
                setDisplayValue('SL');
                onChange('SL');
                setShowSlider(false);
              }}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-interbank-primary hover:bg-interbank-light transition-colors"
            >
              Sin límites
            </button>
          </div>
        )}

        {/* Visual Slider */}
        {showSlider && numericValue > 0 && (
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="text-interbank-primary font-medium">
                {currency} {formatNumber(numericValue.toString())}
              </span>
              <span>{formatNumber(sliderMax.toString())}</span>
            </div>
            <Slider
              value={[numericValue]}
              onValueChange={handleSliderChange}
              min={0}
              max={sliderMax}
              step={1000}
              className="w-full"
            />
          </div>
        )}

        {/* Suggestion */}
        {!error && !value && (
          <p className="text-xs text-muted-foreground">
            💡 Sugerido: {currency} {formatNumber(suggestion.toString())} o escribe "SL" para sin límites
          </p>
        )}
      </div>
    </div>
  );
};

export default AmountControl;