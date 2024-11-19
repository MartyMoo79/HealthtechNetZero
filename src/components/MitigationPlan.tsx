import React, { useState, useRef } from 'react';
import { ArrowLeft, X, Download } from 'lucide-react';
import { Domain, Answer, AssessmentData } from '../types';
import { domainIcons } from '../utils/icons';
import { calculateDomainCounts } from '../utils/calculations';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatDate } from '../utils/formatDate';

interface Props {
  domains: Domain[];
  answers: Record<string, Answer>;
  assessmentData: AssessmentData;
  onBack: () => void;
}

interface MitigationAction {
  action: string;
  lead: string;
  dueDate: string;
}

interface MitigationActions {
  [key: string]: MitigationAction;
}

const emptyAction: MitigationAction = {
  action: '',
  lead: '',
  dueDate: ''
};

export default function MitigationPlan({ domains, answers, assessmentData, onBack }: Props) {
  const [mitigationActions, setMitigationActions] = useState<MitigationActions>({});
  const [excludedQuestions, setExcludedQuestions] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const getNegativeQuestions = (domain: Domain) => {
    return domain.questions.filter(question => {
      const answer = answers[question.id];
      return answer === 'negative' && !excludedQuestions.includes(question.id);
    });
  };

  const handleActionChange = (questionId: string, field: keyof MitigationAction, value: string) => {
    setMitigationActions(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || emptyAction),
        [field]: value
      }
    }));
  };

  const handleExcludeQuestion = (questionId: string) => {
    setExcludedQuestions(prev => [...prev, questionId]);
    setMitigationActions(prev => {
      const newActions = { ...prev };
      delete newActions[questionId];
      return newActions;
    });
  };

  const getSortedActions = () => {
    const actions = Object.entries(mitigationActions)
      .filter(([questionId]) => !excludedQuestions.includes(questionId))
      .map(([questionId, action]) => ({
        questionId,
        ...action
      }))
      .filter(action => action.dueDate);

    return actions.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Environmental Impact Mitigation Plan', 20, 20);
    
    doc.setFontSize(12);
    doc.text('Organisation Details:', 20, 35);
    doc.setFontSize(10);
    doc.text(`Organisation: ${assessmentData.organisationName}`, 20, 45);
    doc.text(`Completed By: ${assessmentData.completedBy}`, 20, 52);
    doc.text(`Job Role: ${assessmentData.jobRole}`, 20, 59);
    doc.text(`Date: ${formatDate(assessmentData.completionDate)}`, 20, 66);
    
    let yPos = 80;

    const sortedActions = getSortedActions();
    if (sortedActions.length > 0) {
      doc.setFontSize(14);
      doc.text('Actions by Due Date', 20, yPos);
      yPos += 10;

      sortedActions.forEach(action => {
        const domain = domains.find(d => 
          d.questions.some(q => q.id === action.questionId)
        );
        const question = domain?.questions.find(q => q.id === action.questionId);
        
        if (!domain || !question) return;

        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(12);
        doc.text(`Due Date: ${formatDate(action.dueDate)}`, 20, yPos);
        yPos += 7;
        
        doc.text(`Domain: ${domain.title}`, 20, yPos);
        yPos += 7;

        doc.setFontSize(10);
        const splitQuestion = doc.splitTextToSize(`Question: ${question.text}`, 170);
        doc.text(splitQuestion, 20, yPos);
        yPos += splitQuestion.length * 5 + 5;

        const splitAction = doc.splitTextToSize(`Action: ${action.action}`, 170);
        doc.text(splitAction, 20, yPos);
        yPos += splitAction.length * 5 + 5;

        doc.text(`Lead: ${action.lead}`, 20, yPos);
        yPos += 15;
      });
    }
    
    doc.save('mitigation-plan.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Assessment Summary
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mitigation Plan</h1>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Organisation Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Organisation Name</p>
                  <p className="font-medium">{assessmentData.organisationName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed By</p>
                  <p className="font-medium">{assessmentData.completedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Role</p>
                  <p className="font-medium">{assessmentData.jobRole}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(assessmentData.completionDate)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                The mitigation plan helps manage and reduce environmental risks associated with your project. Focus on key actions that will have the most impact.
              </p>
              <p className="text-gray-700 mb-2">For each action, include:</p>
              <ul className="list-disc ml-6 text-gray-700">
                <li>Action - Steps to address the environmental impact</li>
                <li>Lead - Responsible individual or team</li>
                <li>Due Date - Deadline for completion</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can remove items from the plan using the X button if you don't plan to address them at this time.
              </p>
            </div>
          </div>

          <div ref={formRef}>
            {domains.map(domain => {
              const negativeQuestions = getNegativeQuestions(domain);
              if (negativeQuestions.length === 0) return null;

              const counts = calculateDomainCounts(domain, answers);

              return (
                <div key={domain.id} className="mb-8 bg-white rounded-lg shadow p-6">
                  <div className="flex items-center gap-3 mb-6">
                    {domainIcons[domain.id]}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{domain.title}</h2>
                      <p className="text-sm text-gray-500">
                        Negative Impacts: {counts.negative}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {negativeQuestions.map(question => {
                      const questionId = question.id;
                      const action = mitigationActions[questionId] || emptyAction;

                      return (
                        <div key={questionId} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <p className="text-gray-800 mb-2">{question.text}</p>
                              <p className="text-sm text-red-600">Impact: Negative</p>
                            </div>
                            <button
                              onClick={() => handleExcludeQuestion(questionId)}
                              className="ml-4 p-2 text-gray-400 hover:text-red-600 transition-colors group relative"
                              title="Remove from mitigation plan"
                            >
                              <X className="w-5 h-5" />
                              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 right-0 top-full mt-1">
                                Remove from plan
                              </span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mitigating Action
                              </label>
                              <textarea
                                value={action.action}
                                onChange={(e) => handleActionChange(questionId, 'action', e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={3}
                                placeholder="Describe the action to address this impact..."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Person/Team
                              </label>
                              <input
                                type="text"
                                value={action.lead}
                                onChange={(e) => handleActionChange(questionId, 'lead', e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Who will be responsible?"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Due Date
                              </label>
                              <input
                                type="date"
                                value={action.dueDate}
                                onChange={(e) => handleActionChange(questionId, 'dueDate', e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Assessment Summary
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Mitigation Plan to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}