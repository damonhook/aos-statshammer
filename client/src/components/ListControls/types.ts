import type React from 'react';

export interface IPrimaryItem {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
}

export interface ISecondaryItem {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}
