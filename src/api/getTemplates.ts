import { TEMPLATES } from "@/data/templates";
import { Editable } from "@/store/templateStore";

export type Template = {
  templateId: number;
  name: string;
  description: string;
  templateImage: string;
  template: Function;
  editables: Editable[];
  defaultOptions: { [key: string]: string };
};

export const getTemplates = async () => {
  return TEMPLATES;
}