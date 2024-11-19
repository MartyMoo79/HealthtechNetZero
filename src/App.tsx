import React, { useState } from 'react';
import { Domain, Answer, AssessmentData, CarbonAssessment } from './types';
import { domains } from './data/domains';
import OrganisationForm from './components/OrganisationForm';
import DomainAssessment from './components/DomainAssessment';
import ResultsSummary from './components/ResultsSummary';
import MitigationPlan from './components/MitigationPlan';
import CarbonAssessmentForm from './components/CarbonAssessment';

type Step = 'form' | 'carbon' | 'assessment' | 'results' | 'mitigation';

function App() {
  const [step, setStep] = useState<Step>('form');
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    organisationName: '',
    completionDate: '',
    completedBy: '',
    jobRole: ''
  });

  const handleFormSubmit = (data: AssessmentData) => {
    setAssessmentData(data);
    setStep('carbon');
  };

  const handleCarbonAssessment = (carbonData: CarbonAssessment) => {
    setAssessmentData(prev => ({ ...prev, carbonAssessment: carbonData }));
    setStep('assessment');
  };

  const handleAnswerChange = (questionId: string, answer: Answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentDomainIndex < domains.length - 1) {
      setCurrentDomainIndex(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const handleBack = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(prev => prev - 1);
    } else {
      setStep('carbon');
    }
  };

  const handleComplete = () => {
    setStep('mitigation');
  };

  const handleEditDomain = (domainIndex: number) => {
    setCurrentDomainIndex(domainIndex);
    setStep('assessment');
  };

  const renderStep = () => {
    switch (step) {
      case 'form':
        return <OrganisationForm onSubmit={handleFormSubmit} />;
      case 'carbon':
        return (
          <CarbonAssessmentForm
            onSubmit={handleCarbonAssessment}
            onBack={() => setStep('form')}
            initialData={assessmentData.carbonAssessment}
          />
        );
      case 'assessment':
        return (
          <DomainAssessment
            domain={domains[currentDomainIndex]}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onBack={handleBack}
            isLast={currentDomainIndex === domains.length - 1}
            currentProgress={currentDomainIndex + 1}
          />
        );
      case 'results':
        return (
          <ResultsSummary
            domains={domains}
            answers={answers}
            assessmentData={assessmentData}
            onComplete={handleComplete}
            onBack={() => setStep('assessment')}
            onEditDomain={handleEditDomain}
          />
        );
      case 'mitigation':
        return (
          <MitigationPlan
            domains={domains}
            answers={answers}
            assessmentData={assessmentData}
            onBack={() => setStep('results')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderStep()}
    </div>
  );
}

export default App;