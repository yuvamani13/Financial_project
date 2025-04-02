
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  currency?: boolean;
  className?: string;
}

const AnimatedNumber = ({ 
  value, 
  duration = 300, 
  currency = true, 
  className 
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    // If value doesn't change significantly, just set it
    if (Math.abs(displayValue - value) < 0.01) {
      setDisplayValue(value);
      return;
    }
    
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function - ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(startValue + (value - startValue) * easeProgress);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value); // Ensure we end at exactly the target value
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration, displayValue]);
  
  return (
    <span className={`inline-block overflow-hidden transition-all duration-200 ${className}`}>
      {currency ? formatCurrency(displayValue) : displayValue.toFixed(2)}
    </span>
  );
};

export default AnimatedNumber;
