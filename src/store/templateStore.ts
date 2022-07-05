import { boolean } from 'zod';
import create from 'zustand';

export type Editable = {
  label: string;
  optionKey: string;
  type: string;
}

interface TemplateStoreState {
  template: any;
  options: any;
  editables: Editable[];
  setTemplate: (template: any) => void;
  setOptions: (options: any) => void;
  setEditables: (editables: Editable[]) => void;
  isSelected: () => boolean;
  showModal : boolean;
  setShowModal : any;
  
}

const useStore = create<TemplateStoreState>((set: any, get: any) => ({
  options: {},
  editables: [],
  showModal : false,
  template: () => null,
  setTemplate: (template: any) => {
    set({template});
  },
  setOptions: (newOptions: any) => {
    set((state: any) => ({ options: {...state.options, ...newOptions}}));
  },
  setEditables : (newEditables: Editable[]) => {
    set({ editables: newEditables});
  },
  isSelected: () => {
    return Object.keys(get().options).length > 0;
  },
  setShowModal : (isPremium : boolean) => {
    set((state:any)=>state.showModal = isPremium )
  },
}));
 
export const useTemplateStore = useStore;