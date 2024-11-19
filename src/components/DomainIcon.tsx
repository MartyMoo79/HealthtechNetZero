import React from 'react';
import { getDomainIcon } from '../utils/icons';

interface Props {
  domainId: string;
  className?: string;
}

export const DomainIcon: React.FC<Props> = ({ domainId, className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {getDomainIcon(domainId)}
    </div>
  );
};