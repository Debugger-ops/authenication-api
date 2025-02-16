// components/ui/alert.tsx
import React from 'react';

export function Alert({ variant, children }: { variant: string; children: React.ReactNode }) {
  return <div className={`alert ${variant}`}>{children}</div>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="alert-description">{children}</div>;
}
