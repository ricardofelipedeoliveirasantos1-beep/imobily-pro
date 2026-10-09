import { forwardRef, type InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, icon, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        <div className="input-container">
          {icon && <div className="input-icon">{icon}</div>}
          <input
            ref={ref}
            className={`input ${icon ? 'has-icon' : ''} ${error ? 'input-error' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
