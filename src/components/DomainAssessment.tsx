import React, { useState } from 'react';
import { ArrowLeft, Award, Globe, Target } from 'lucide-react';
import { Answer, Domain, Question } from '../types';
import { QuestionIcon } from '../utils/icons';
import { domainIcons } from '../utils/icons';

interface Props {
  domain: Domain;
  answers: Record<string, Answer>;
  onAnswerChange: (questionId: string, answer: Answer) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
  currentProgress: number;
}

const impactOptions = [
  { 
    label: 'Positive Impact',
    value: 'positive',
    baseColor: 'bg-green-100 text-green-700 border-green-200',
    activeColor: 'bg-green-600 text-white hover:bg-green-700 hover:ring-green-500'
  },
  {
    label: 'Negative Impact',
    value: 'negative',
    baseColor: 'bg-red-100 text-red-700 border-red-200',
    activeColor: 'bg-red-600 text-white hover:bg-red-700 hover:ring-red-500'
  },
  {
    label: 'No Impact',
    value: 'no-impact',
    baseColor: 'bg-amber-100 text-amber-700 border-amber-200',
    activeColor: 'bg-amber-600 text-white hover:bg-amber-700 hover:ring-amber-500'
  },
  {
    label: 'Unknown Impact',
    value: 'unknown',
    baseColor: 'bg-blue-100 text-blue-700 border-blue-200',
    activeColor: 'bg-blue-600 text-white hover:bg-blue-700 hover:ring-blue-500'
  }
];

export default function DomainAssessment({ 
  domain, 
  answers, 
  onAnswerChange,
  onNext,
  onBack,
  isLast,
  currentProgress
}: Props) {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});

  const handleFileUpload = (questionId: string, file: File) => {
    setSelectedFiles(prev => ({
      ...prev,
      [questionId]: file
    }));
  };

  const getWeightingInfo = (question: Question) => {
    switch (question.category) {
      case 'key-metric-un':
        return {
          label: 'Key Metric & UN Goals',
          icon: <Award className="w-4 h-4" />,
          classes: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'key-metric':
        return {
          label: 'Key Metric',
          icon: <Target className="w-4 h-4" />,
          classes: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'un-goals':
        return {
          label: 'UN Goals',
          icon: <Globe className="w-4 h-4" />,
          classes: 'bg-green-50 text-green-700 border-green-200'
        };
      default:
        return null;
    }
  };

  const getAnswerButtonClass = (currentAnswer: string, option: typeof impactOptions[0]) => {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-offset-2';
    if (currentAnswer === option.value) {
      return `${baseClasses} ${option.activeColor}`;
    }
    return `${baseClasses} ${option.baseColor}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <p className="text-sm text-gray-500">Domain {currentProgress} of 9</p>
        </div>

        <div className="flex items-center gap-4 mb-8">
          {domainIcons[domain.id]}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{domain.title}</h2>
            {domain.description && (
              <p className="text-gray-600 mt-2">{domain.description}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {domain.questions.map((question) => {
            const weightingInfo = getWeightingInfo(question);
            
            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="mt-1">
                    <QuestionIcon domainId={domain.id} questionId={question.id} />
                  </div>
                  <div>
                    <p className="text-gray-800">{question.text}</p>
                    {weightingInfo && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${weightingInfo.classes}`}>
                          {weightingInfo.icon}
                          <span className="text-sm font-medium">{weightingInfo.label}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-8">
                  <div className="flex flex-wrap gap-2">
                    {impactOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => onAnswerChange(question.id, option.value as Answer)}
                        className={getAnswerButtonClass(answers[question.id], option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <label className="relative cursor-pointer">
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(question.id, file);
                          }}
                          className="hidden"
                          title="Upload evidence to support your answer"
                        />
                        <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" title="Upload evidence to support your answer">
                          Upload Evidence
                        </span>
                      </label>
                      {selectedFiles[question.id] && (
                        <p className="text-sm text-green-600">
                          Evidence uploaded: {selectedFiles[question.id].name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLast ? 'View Results' : 'Next Domain'}
          </button>
        </div>
      </div>
    </div>
  );
}