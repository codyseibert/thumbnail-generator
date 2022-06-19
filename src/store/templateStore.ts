import create from 'zustand';

const useStore = create((set: Function) => ({
  options: {},
  setOptions: (newOptions: any) => set((state: any) => 
    ({ options: {...state.options, ...newOptions}})),
}))

export const useTemplateStore = useStore