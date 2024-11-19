import React from 'react';
import { AssessmentData } from '../types';
import { Building2, Calendar, User2, Briefcase, Stethoscope } from 'lucide-react';

interface Props {
  onSubmit: (data: AssessmentData) => void;
}

export default function OrganisationForm({ onSubmit }: Props) {
  const [info, setInfo] = React.useState<AssessmentData>({
    organisationName: '',
    completionDate: new Date().toISOString().split('T')[0],
    completedBy: '',
    jobRole: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Environmental Impact Assessment for Healthcare Innovation
          </h1>
          <p className="mt-2 text-gray-600">Complete the form below to begin your assessment</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              placeholder="Organisation Name"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={info.organisationName}
              onChange={(e) => setInfo({ ...info, organisationName: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={info.completionDate}
              onChange={(e) => setInfo({ ...info, completionDate: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              placeholder="Your Name"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={info.completedBy}
              onChange={(e) => setInfo({ ...info, completedBy: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              placeholder="Job Role"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={info.jobRole}
              onChange={(e) => setInfo({ ...info, jobRole: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Begin Assessment
          </button>
        </form>
      </div>
    </div>
  );
}