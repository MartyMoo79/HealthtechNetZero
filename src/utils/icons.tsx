import React from 'react';
import {
  Home,
  Car,
  Recycle,
  Server,
  Leaf,
  Users,
  Cloud,
  BarChart,
  Heart,
  HomeIcon,
  ArrowDownCircle,
  Building2,
  Video,
  CarFront,
  Truck,
  Bus,
  Fuel,
  PackageX,
  Repeat,
  Pill,
  Box,
  MonitorSmartphone,
  Trash2,
  PackageMinus,
  AlertTriangle,
  Sun,
  Lightbulb,
  Brain,
  TreePine,
  Shield,
  Syringe,
  UserCheck,
  Umbrella,
  Search,
  Calculator,
  HeartHandshake,
  Wind,
  Briefcase,
  Scale,
  Store,
  ShoppingCart
} from 'lucide-react';

export const domainIcons: Record<string, React.ReactNode> = {
  'models-of-care': <Building2 className="w-6 h-6 text-blue-600" />,
  'travel': <Car className="w-6 h-6 text-green-600" />,
  'consumables': <Recycle className="w-6 h-6 text-yellow-600" />,
  'it-digital': <Server className="w-6 h-6 text-purple-600" />,
  'resource-use': <Leaf className="w-6 h-6 text-emerald-600" />,
  'workforce': <Users className="w-6 h-6 text-indigo-600" />,
  'adaptation': <Cloud className="w-6 h-6 text-cyan-600" />,
  'carbon-benefit': <BarChart className="w-6 h-6 text-orange-600" />,
  'social-value': <Heart className="w-6 h-6 text-red-600" />
};

const questionIconMap: Record<string, Record<string, React.ReactNode>> = {
  'models-of-care': {
    'moc-1': <HomeIcon className="w-5 h-5 text-gray-600" />,
    'moc-2': <Home className="w-5 h-5 text-gray-600" />,
    'moc-3': <Building2 className="w-5 h-5 text-gray-600" />,
    'moc-4': <Video className="w-5 h-5 text-gray-600" />
  },
  'travel': {
    'travel-1': <CarFront className="w-5 h-5 text-gray-600" />,
    'travel-2': <Truck className="w-5 h-5 text-gray-600" />,
    'travel-3': <Bus className="w-5 h-5 text-gray-600" />,
    'travel-4': <Fuel className="w-5 h-5 text-gray-600" />
  },
  'consumables': {
    'cons-1': <PackageX className="w-5 h-5 text-gray-600" />,
    'cons-2': <Repeat className="w-5 h-5 text-gray-600" />,
    'cons-3': <Pill className="w-5 h-5 text-gray-600" />,
    'cons-4': <Box className="w-5 h-5 text-gray-600" />
  },
  'it-digital': {
    'it-1': <MonitorSmartphone className="w-5 h-5 text-gray-600" />,
    'it-2': <Server className="w-5 h-5 text-gray-600" />
  },
  'resource-use': {
    'res-1': <Trash2 className="w-5 h-5 text-gray-600" />,
    'res-2': <PackageMinus className="w-5 h-5 text-gray-600" />,
    'res-3': <AlertTriangle className="w-5 h-5 text-gray-600" />,
    'res-4': <Sun className="w-5 h-5 text-gray-600" />,
    'res-5': <Lightbulb className="w-5 h-5 text-gray-600" />
  },
  'workforce': {
    'work-1': <Brain className="w-5 h-5 text-gray-600" />,
    'work-2': <Users className="w-5 h-5 text-gray-600" />
  },
  'adaptation': {
    'adapt-1': <TreePine className="w-5 h-5 text-gray-600" />,
    'adapt-2': <Shield className="w-5 h-5 text-gray-600" />,
    'adapt-3': <Syringe className="w-5 h-5 text-gray-600" />,
    'adapt-4': <UserCheck className="w-5 h-5 text-gray-600" />,
    'adapt-5': <Umbrella className="w-5 h-5 text-gray-600" />
  },
  'carbon-benefit': {
    'carbon-1': <Search className="w-5 h-5 text-gray-600" />,
    'carbon-2': <Calculator className="w-5 h-5 text-gray-600" />
  },
  'social-value': {
    'social-1': <HeartHandshake className="w-5 h-5 text-gray-600" />,
    'social-2': <Wind className="w-5 h-5 text-gray-600" />,
    'social-3': <Briefcase className="w-5 h-5 text-gray-600" />,
    'social-4': <Scale className="w-5 h-5 text-gray-600" />,
    'social-5': <Store className="w-5 h-5 text-gray-600" />,
    'social-6': <ShoppingCart className="w-5 h-5 text-gray-600" />
  }
};

export const getQuestionIcon = (domainId: string, questionId: string): React.ReactNode => {
  return questionIconMap[domainId]?.[questionId] || <ArrowDownCircle className="w-5 h-5 text-gray-600" />;
};

interface QuestionIconProps {
  domainId: string;
  questionId: string;
}

export const QuestionIcon: React.FC<QuestionIconProps> = ({ domainId, questionId }) => {
  return getQuestionIcon(domainId, questionId);
};