import React from 'react';
import { Domain, Answer, AssessmentData } from '../types';
import Logo from './Logo';
import { 
  ArrowLeft,
  Trophy,
  ShieldCheck,
  AlertOctagon,
  MinusCircle,
  ChevronRight,
  Download,
  Award
} from 'lucide-react';
import { domainIcons } from '../utils/icons';
import { calculateDomainCounts, calculateTotalCounts, getDomainCategory, calculateCarbonStandard } from '../utils/calculations';
import { formatDate } from '../utils/formatDate';
import { jsPDF } from 'jspdf';

interface Props {
  domains: Domain[];
  answers: Record<string, Answer>;
  assessmentData: AssessmentData;
  onComplete: () => void;
  onBack: () => void;
  onEditDomain: (domainIndex: number) => void;
}

const categoryColors = {
  'Positive Environmental Impact': {
    bg: '#28A745',
    text: 'text-green-800',
    border: 'border-green-200',
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />
  },
  'Negative Impact - Proceed with Care': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    icon: <AlertOctagon className="w-8 h-8 text-red-600" />
  },
  'Neutral': {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    icon: <MinusCircle className="w-8 h-8 text-gray-600" />
  }
};

const carbonStandardColors = {
  'Gold': { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-800', 
    border: 'border-yellow-200', 
    icon: <Trophy className="w-8 h-8 text-yellow-600" /> 
  },
  'Silver': { 
    bg: 'bg-gray-100', 
    text: 'text-gray-800', 
    border: 'border-gray-200', 
    icon: <Award className="w-8 h-8 text-gray-600" /> 
  },
  'Bronze': { 
    bg: 'bg-orange-100', 
    text: 'text-orange-800', 
    border: 'border-orange-200', 
    icon: <Award className="w-8 h-8 text-orange-600" /> 
  },
  'Net Zero Improvement Needed': { 
    bg: 'bg-red-100', 
    text: 'text-red-800', 
    border: 'border-red-200', 
    icon: <AlertOctagon className="w-8 h-8 text-red-600" /> 
  }
};

export default function ResultsSummary({ domains, answers, assessmentData, onComplete, onBack, onEditDomain }: Props) {
  const totalCounts = calculateTotalCounts(domains, answers);
  const overallCategory = getDomainCategory(totalCounts);

  const exportSummaryToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Environmental Impact Assessment Summary', 20, 20);
    
    doc.setFontSize(12);
    doc.text('Organisation Details:', 20, 35);
    doc.setFontSize(10);
    doc.text(`Organisation: ${assessmentData.organisationName}`, 20, 45);
    doc.text(`Completed By: ${assessmentData.completedBy}`, 20, 52);
    doc.text(`Job Role: ${assessmentData.jobRole}`, 20, 59);
    doc.text(`Date: ${formatDate(assessmentData.completionDate)}`, 20, 66);

    doc.setFontSize(14);
    doc.text('Overall Assessment', 20, 80);
    doc.setFontSize(12);
    doc.text(`Category: ${overallCategory}`, 20, 90);
    doc.text('Impact Counts:', 20, 97);
    doc.text(`Positive: ${totalCounts.positive}`, 30, 104);
    doc.text(`Negative: ${totalCounts.negative}`, 30, 111);
    doc.text(`No Impact: ${totalCounts.noImpact}`, 30, 118);
    doc.text(`Unknown: ${totalCounts.unknown}`, 30, 125);

    if (assessmentData.carbonAssessment) {
      const carbonStandard = calculateCarbonStandard(assessmentData.carbonAssessment);
      doc.text('Carbon Assessment', 20, 140);
      doc.text(`Standard: ${carbonStandard}`, 20, 147);
    }

    let yPos = 160;
    domains.forEach((domain) => {
      const counts = calculateDomainCounts(domain, answers);
      
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.text(domain.title, 20, yPos);
      yPos += 7;
      doc.setFontSize(10);
      doc.text(`Positive: ${counts.positive}`, 30, yPos);
      yPos += 7;
      doc.text(`Negative: ${counts.negative}`, 30, yPos);
      yPos += 7;
      doc.text(`No Impact: ${counts.noImpact}`, 30, yPos);
      yPos += 7;
      doc.text(`Unknown: ${counts.unknown}`, 30, yPos);
      yPos += 15;
    });
    
    doc.save('assessment-summary.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Assessment
            </button>
            <button
              onClick={exportSummaryToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Summary
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Logo size="large" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Assessment Summary</h2>
              <p className="text-gray-500">Environmental Impact Assessment Results</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Organisation Details</h3>
            <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Organisation Name</p>
                <p className="font-medium text-gray-900">{assessmentData.organisationName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completion Date</p>
                <p className="font-medium text-gray-900">{formatDate(assessmentData.completionDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed By</p>
                <p className="font-medium text-gray-900">{assessmentData.completedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Role</p>
                <p className="font-medium text-gray-900">{assessmentData.jobRole}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className={`p-6 rounded-lg border ${categoryColors[overallCategory].border} ${categoryColors[overallCategory].bg}`}>
              <div className="flex items-center gap-4 mb-4">
                {categoryColors[overallCategory].icon}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Overall Assessment</h3>
                  <p className={`text-lg font-semibold ${categoryColors[overallCategory].text}`}>
                    {overallCategory}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Positive Impact</p>
                  <p className="text-2xl font-bold text-green-600">{totalCounts.positive}</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Negative Impact</p>
                  <p className="text-2xl font-bold text-red-600">{totalCounts.negative}</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">No Impact</p>
                  <p className="text-2xl font-bold text-amber-600">{totalCounts.noImpact}</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Unknown</p>
                  <p className="text-2xl font-bold text-blue-600">{totalCounts.unknown}</p>
                </div>
              </div>
            </div>
          </div>

          {assessmentData.carbonAssessment && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Carbon Assessment</h3>
              <div className={`p-6 rounded-lg border ${carbonStandardColors[calculateCarbonStandard(assessmentData.carbonAssessment)].border} ${carbonStandardColors[calculateCarbonStandard(assessmentData.carbonAssessment)].bg}`}>
                <div className="flex items-center gap-4 mb-4">
                  {carbonStandardColors[calculateCarbonStandard(assessmentData.carbonAssessment)].icon}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Carbon Standard</h4>
                    <p className={`text-lg font-semibold ${carbonStandardColors[calculateCarbonStandard(assessmentData.carbonAssessment)].text}`}>
                      {calculateCarbonStandard(assessmentData.carbonAssessment)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Carbon Reduction Plan</p>
                    <p className="font-medium">
                      {assessmentData.carbonAssessment.hasCarbonPlan === 'yes' ? 'Yes' : 
                       assessmentData.carbonAssessment.hasCarbonPlan === 'in-progress' ? 'In Progress' : 'No'}
                    </p>
                  </div>
                  {assessmentData.carbonAssessment.evergreenLevel && (
                    <div>
                      <p className="text-gray-600">Evergreen Level</p>
                      <p className="font-medium">Level {assessmentData.carbonAssessment.evergreenLevel}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Life Cycle Analysis</p>
                    <p className="font-medium">
                      {assessmentData.carbonAssessment.hasLifecycleAnalysis === 'yes' ? 'Yes' : 
                       assessmentData.carbonAssessment.hasLifecycleAnalysis === 'in-progress' ? 'In Progress' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Carbon Impact Quantified</p>
                    <p className="font-medium">
                      {assessmentData.carbonAssessment.hasCarbonImpact === 'yes' ? 'Yes' : 
                       assessmentData.carbonAssessment.hasCarbonImpact === 'in-progress' ? 'In Progress' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Edit Sections</h3>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain, index) => (
                <button
                  key={domain.id}
                  onClick={() => onEditDomain(index)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {domainIcons[domain.id]}
                  <span>{domain.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {domains.map((domain) => {
              const counts = calculateDomainCounts(domain, answers);
              const category = getDomainCategory(counts);
              
              return (
                <div 
                  key={domain.id}
                  id={domain.id}
                  className={`border rounded-lg p-4 ${categoryColors[category].border} transition-colors hover:bg-gray-50`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-green-600">
                        {domainIcons[domain.id]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{domain.title}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-sm text-green-600">Positive: {counts.positive}</span>
                          <span className="text-sm text-red-600">Negative: {counts.negative}</span>
                          <span className="text-sm text-amber-600">No Impact: {counts.noImpact}</span>
                          <span className="text-sm text-blue-600">Unknown: {counts.unknown}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category].bg} ${categoryColors[category].text}`}>
                        {category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Assessment
            </button>
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete Mitigation Plan
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
