import React, { useState } from 'react';
import { CarbonAssessment } from '../types';
import { ArrowLeft, Leaf, Award, FileCheck, Calculator, Star } from 'lucide-react';

interface Props {
  onSubmit: (assessment: CarbonAssessment) => void;
  onBack: () => void;
  initialData?: CarbonAssessment;
}

const defaultAssessment: CarbonAssessment = {
  hasCarbonPlan: 'no',
  hasLifecycleAnalysis: 'no',
  hasCarbonImpact: 'no'
};

const levelInfo = [
  { level: 1, label: 'Foundation', color: 'from-blue-300 to-green-600' },
  { level: 2, label: 'Intermediate', color: 'from-green-500 to-green-700' },
  { level: 3, label: 'Advanced', color: 'from-green-600 to-green-800' },
  { level: 4, label: 'Excellence', color: 'from-green-700 to-green-900' }
];

export default function CarbonAssessmentForm({ onSubmit, onBack, initialData }: Props) {
  const [assessment, setAssessment] = useState<CarbonAssessment>(initialData || defaultAssessment);
  const [evergreenStatus, setEvergreenStatus] = useState<'yes' | 'no' | 'in-progress'>(
    initialData?.evergreenLevel ? 'yes' : 'no'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(assessment);
  };

  const getButtonClass = (currentValue: string, optionValue: string) => {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200';
    if (currentValue === optionValue) {
      switch (optionValue) {
        case 'yes':
          return `${baseClasses} bg-green-600 text-white hover:bg-green-700`;
        case 'no':
          return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
        case 'in-progress':
          return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
        default:
          return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
      }
    }
    return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  const handleEvergreenStatusChange = (status: 'yes' | 'no' | 'in-progress') => {
    setEvergreenStatus(status);
    if (status === 'yes') {
      setAssessment(prev => ({
        ...prev,
        evergreenLevel: prev.evergreenLevel || 1
      }));
    } else {
      setAssessment(prev => ({
        ...prev,
        evergreenLevel: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Leaf className="w-12 h-12 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Carbon Assessment</h1>
              <p className="text-gray-600">Evaluate your organisation's carbon reduction initiatives</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Carbon Reduction Plan</h2>
                </div>
                <p className="text-gray-600 mb-4">Does your organisation have a carbon reduction plan?</p>
                <div className="flex gap-2">
                  {['yes', 'no', 'in-progress'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAssessment(prev => ({ ...prev, hasCarbonPlan: value as 'yes' | 'no' | 'in-progress' }))}
                      className={getButtonClass(assessment.hasCarbonPlan, value)}
                    >
                      {value === 'in-progress' ? 'In Progress' : value.charAt(0).toUpperCase() + value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Evergreen Assessment</h2>
                </div>
                <p className="text-gray-600 mb-4">Have you completed the Evergreen Assessment?</p>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {['yes', 'no', 'in-progress'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleEvergreenStatusChange(value as 'yes' | 'no' | 'in-progress')}
                        className={getButtonClass(evergreenStatus, value)}
                      >
                        {value === 'in-progress' ? 'In Progress' : value.charAt(0).toUpperCase() + value.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  {evergreenStatus === 'yes' && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Select Your Evergreen Level
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {levelInfo.map(({ level, label, color }) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setAssessment(prev => ({ ...prev, evergreenLevel: level }))}
                            className={`relative p-4 rounded-lg text-left transition-all duration-200 
                              ${assessment.evergreenLevel === level
                                ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                                : 'bg-white border-2 border-gray-200 hover:border-green-500'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`text-lg font-bold ${assessment.evergreenLevel === level ? 'text-white' : 'text-gray-900'}`}>
                                  Level {level}
                                </p>
                                <p className={`text-sm ${assessment.evergreenLevel === level ? 'text-white' : 'text-gray-600'}`}>
                                  {label}
                                </p>
                              </div>
                              <Star className={`w-6 h-6 ${assessment.evergreenLevel === level ? 'text-white' : 'text-green-600'}`} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Life Cycle Analysis</h2>
                </div>
                <p className="text-gray-600 mb-4">Have you conducted a Life Cycle Analysis?</p>
                <div className="flex gap-2">
                  {['yes', 'no', 'in-progress'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAssessment(prev => ({ ...prev, hasLifecycleAnalysis: value as 'yes' | 'no' | 'in-progress' }))}
                      className={getButtonClass(assessment.hasLifecycleAnalysis, value)}
                    >
                      {value === 'in-progress' ? 'In Progress' : value.charAt(0).toUpperCase() + value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Carbon Impact</h2>
                </div>
                <p className="text-gray-600 mb-4">Have you quantified the Carbon Impact of adoption/spread/delivery?</p>
                <div className="flex gap-2">
                  {['yes', 'no', 'in-progress'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAssessment(prev => ({ ...prev, hasCarbonImpact: value as 'yes' | 'no' | 'in-progress' }))}
                      className={getButtonClass(assessment.hasCarbonImpact, value)}
                    >
                      {value === 'in-progress' ? 'In Progress' : value.charAt(0).toUpperCase() + value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue to Assessment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
