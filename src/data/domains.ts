import { Domain } from '../types';

export const domains: Domain[] = [
  {
    id: 'models-of-care',
    title: 'Models of Care',
    description: 'Assessment of care delivery models and their environmental impact',
    questions: [
      {
        id: 'moc-1',
        text: 'What will be the impact on reducing \'care miles\' by making care closer to home / reducing need for face to face appointments (patient travel)?',
        category: 'key-metric'
      },
      {
        id: 'moc-2',
        text: 'What will be the impact on reducing the need for staff to visit patients in their own home?',
        category: 'key-metric'
      },
      {
        id: 'moc-3',
        text: 'What will be the impact on reducing hospital admissions or surgical care?',
        category: 'key-metric'
      },
      {
        id: 'moc-4',
        text: 'What will be the impact on reducing unnecessary face to face appointments (e.g. first / follow up)?',
        category: 'key-metric'
      }
    ]
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Impact assessment of travel and transportation',
    questions: [
      {
        id: 'travel-1',
        text: 'What will be the impact on vehicle mileage from staff travel (commuting, business travel)?',
        category: 'key-metric'
      },
      {
        id: 'travel-2',
        text: 'What will be the impact on mileage from Facilities Management, Contractor and/or Supply Chain?',
        category: 'standard'
      },
      {
        id: 'travel-3',
        text: 'What will be the impact on green travel / alternatives to fossil fuel car/air transport (e.g. public transport, car sharing, walking, cycling, sustainable shipping)?',
        category: 'key-metric'
      },
      {
        id: 'travel-4',
        text: 'What will be the impact on supporting more efficient use of environmentally friendly fuels and technologies?',
        category: 'standard'
      }
    ]
  },
  {
    id: 'consumables',
    title: 'Consumables',
    description: 'Assessment of consumable usage and waste reduction',
    questions: [
      {
        id: 'cons-1',
        text: 'What will be the impact on reducing single use items (e.g. Equipment / plastics)?',
        category: 'standard'
      },
      {
        id: 'cons-2',
        text: 'What will be the impact on reducing use of natural resources and promoting a circular economy?',
        category: 'standard'
      },
      {
        id: 'cons-3',
        text: 'What will be the impact on decreasing use of unnecessary/carbon intensive anaesthetic gases, pharmaceuticals or medical devices?',
        category: 'key-metric'
      },
      {
        id: 'cons-4',
        text: 'What will be the impact on improving the supply chain e.g. more efficient delivery / improved storage and distribution?',
        category: 'standard'
      }
    ]
  },
  {
    id: 'it-digital',
    title: 'IT / Digital',
    description: 'Assessment of IT and digital solutions impact',
    questions: [
      {
        id: 'it-1',
        text: 'What will be the impact on using Green IT e.g. green cloud servers / refurbished equipment / sustainable asset disposal?',
        category: 'standard'
      },
      {
        id: 'it-2',
        text: 'What will be the impact of using digital solutions to replace the need for resource use / travel?',
        category: 'standard'
      }
    ]
  },
  {
    id: 'resource-use',
    title: 'Resource Use',
    description: 'Assessment of resource utilization and sustainability',
    questions: [
      {
        id: 'res-1',
        text: 'What will be the impact on reducing waste production or increasing waste recycling?',
        category: 'key-metric-un'
      },
      {
        id: 'res-2',
        text: 'What will be the impact on reducing single use plastic packaging?',
        category: 'key-metric-un'
      },
      {
        id: 'res-3',
        text: 'What will be the impact on reducing environmental hazards/pollution and/or toxic materials?',
        category: 'un-goals'
      },
      {
        id: 'res-4',
        text: 'What will be the impact on improving use of renewable energy?',
        category: 'un-goals'
      },
      {
        id: 'res-5',
        text: 'What will be the impact on decreasing usage of utilities (e.g. electricity, gas, oil, water, sewerage, etc.)?',
        category: 'key-metric-un'
      }
    ]
  },
  {
    id: 'workforce',
    title: 'Workforce',
    description: 'Assessment of workforce impact and efficiency',
    questions: [
      {
        id: 'work-1',
        text: 'What will be the impact on Net Zero/Climate change skills and competencies and/or Leadership (increasing awareness on climate change)?',
        category: 'un-goals'
      },
      {
        id: 'work-2',
        text: 'What will be the impact on staff efficiency / effectiveness (including home working)?',
        category: 'standard'
      }
    ]
  },
  {
    id: 'adaptation',
    title: 'Adaptation to Climate Change',
    description: 'Assessment of climate change adaptation measures',
    questions: [
      {
        id: 'adapt-1',
        text: 'What will be the impact on improving green space and access to green space?',
        category: 'un-goals'
      },
      {
        id: 'adapt-2',
        text: 'What will be the impact on preventing risks to business continuity during extreme weather (failed infrastructure e.g. transport, buildings, IT, utilities) or failures to Supply Chain?',
        category: 'standard'
      },
      {
        id: 'adapt-3',
        text: 'What will be the impact on preventing risks to business continuity due to resource availability (e.g. pharmaceutical products, medical devices, fuel shortages)?',
        category: 'standard'
      },
      {
        id: 'adapt-4',
        text: 'What will be the impact on preventing risks to business continuity due to lack of staff (e.g. critical staffing levels)?',
        category: 'standard'
      },
      {
        id: 'adapt-5',
        text: 'What will be the impact on supporting mitigation of the likely effects of climate change (e.g. identifying proactive and community support for vulnerable groups; contingency planning for flood, heatwave and other weather extremes)?',
        category: 'un-goals'
      }
    ]
  },
  {
    id: 'social-value',
    title: 'Social Value',
    description: 'Assessment of social impact and community benefits',
    questions: [
      {
        id: 'soc-1',
        text: 'What will be the impact on reducing inequalities in health and access to services?',
        category: 'standard'
      },
      {
        id: 'soc-2',
        text: 'What will be the impact on improving Air Quality?',
        category: 'un-goals'
      },
      {
        id: 'soc-3',
        text: 'What will be the impact on offering employment opportunities to disadvantaged groups / paying above living wage and/or offering opportunities and skills to local people?',
        category: 'standard'
      },
      {
        id: 'soc-4',
        text: 'What will be the impact on promoting well-being / mental health / healthy working lives (e.g. work-life/home-life balance, family friendly policies)?',
        category: 'standard'
      },
      {
        id: 'soc-5',
        text: 'What will be the impact on supporting the local economy through local suppliers, SMEs or engaging with third sector or community groups?',
        category: 'standard'
      },
      {
        id: 'soc-6',
        text: 'What will be the impact on promoting ethical purchasing of goods or services e.g. increasing transparency of modern slavery in the supply chain globally?',
        category: 'standard'
      }
    ]
  }
];