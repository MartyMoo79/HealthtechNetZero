import { Domain, Answer, Question, ImpactCounts, CarbonAssessment, CarbonStandard } from '../types';

export function calculateDomainCounts(domain: Domain, answers: Record<string, Answer>): ImpactCounts {
  return domain.questions.reduce((counts, question) => {
    const answer = answers[question.id];
    if (!answer) return counts;
    
    switch (answer) {
      case 'positive':
        return { ...counts, positive: counts.positive + 1 };
      case 'negative':
        return { ...counts, negative: counts.negative + 1 };
      case 'no-impact':
        return { ...counts, noImpact: counts.noImpact + 1 };
      case 'unknown':
        return { ...counts, unknown: counts.unknown + 1 };
      default:
        return counts;
    }
  }, { positive: 0, negative: 0, noImpact: 0, unknown: 0 });
}

export function calculateTotalCounts(domains: Domain[], answers: Record<string, Answer>): ImpactCounts {
  return domains.reduce((totalCounts, domain) => {
    const domainCounts = calculateDomainCounts(domain, answers);
    return {
      positive: totalCounts.positive + domainCounts.positive,
      negative: totalCounts.negative + domainCounts.negative,
      noImpact: totalCounts.noImpact + domainCounts.noImpact,
      unknown: totalCounts.unknown + domainCounts.unknown
    };
  }, { positive: 0, negative: 0, noImpact: 0, unknown: 0 });
}

export function getDomainCategory(counts: ImpactCounts): string {
  const totalResponses = counts.positive + counts.negative;
  if (totalResponses === 0) return 'Neutral';
  
  const positivePercentage = (counts.positive / totalResponses) * 100;
  if (positivePercentage > 50) {
    return 'Positive Environmental Impact';
  } else if (counts.negative > 0) {
    return 'Negative Impact - Proceed with Care';
  }
  return 'Neutral';
}

export function calculateCarbonStandard(assessment: CarbonAssessment): CarbonStandard {
  const yesCount = [
    assessment.hasCarbonPlan,
    assessment.hasLifecycleAnalysis,
    assessment.hasCarbonImpact,
    assessment.evergreenLevel ? 'yes' : 'no'
  ].filter(answer => answer === 'yes').length;

  if (yesCount === 4) return 'Gold';
  if (yesCount >= 2) return 'Silver';
  if (yesCount === 1) return 'Bronze';
  return 'Net Zero Improvement Needed';
}