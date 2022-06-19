import create from 'zustand';

const useStore = create((set: Function) => ({
  options: {},
  template: () => null,
  setTemplate: (template: any) => set({template}),
  setOptions: (newOptions: any) => set((state: any) => 
    ({ options: {...state.options, ...newOptions}})),
}))

export const useTemplateStore = useStore