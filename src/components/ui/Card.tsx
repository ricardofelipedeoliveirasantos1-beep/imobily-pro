import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export function Card({ children, className = '', interactive = false, ...props }: CardProps) {
  return (
    <div className={`card ${interactive ? 'card-interactive' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
