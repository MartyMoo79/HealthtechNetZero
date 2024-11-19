import React from 'react';
import { getQuestionIcon } from '../utils/icons';

interface Props {
  domainId: string;
  questionId: string;
  className?: string;
}

export const QuestionIcon: React.FC<Props> = ({ domainId, questionId, className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {getQuestionIcon(domainId, questionId)}
    </div>
  );
};