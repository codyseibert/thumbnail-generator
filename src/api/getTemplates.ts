import { TEMPLATES } from '@/data/templates';
import { Editable } from '@/store/templateStore';

export type Template = {
  templateId: string;
  name: string;
  description: string;
  templateImage: string;
  template: any;
  editables: Editable[];
  isPremium: boolean;
  defaultOptions: { [key: string]: string };
};

export const getTemplates = async () => {
  return TEMPLATES;
};