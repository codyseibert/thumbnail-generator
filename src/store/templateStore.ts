import create from 'zustand';

const useStore = create((set: Function) => ({
  options: {},
  editables : [
    { 
      key : 1,
      label : 'Line 1 Text',
      optionKey : 'line1Text',
      type : 'text'
    },
    {
      key : 2,
      label : 'Line 2 Text',
      optionKey : 'line2Text',
      type : 'text'
    },
    {
      key : 3,
      label : 'Line 3 Text',
      optionKey : 'line3Text',
      type : 'text'
    },
    {
      key : 4,
      label : 'Background Color',
      optionKey : 'bgColor',
      type : 'colorPicker'
    },
    {
      key : 5,
      label : 'Text Color',
      optionKey : 'txtColor',
      type : 'colorPicker'
    }
  ],
  template: () => null,
  setTemplate: (template: any) => set({template}),
  setOptions: (newOptions: any) => set((state: any) => 
    ({ options: {...state.options, ...newOptions}})),

  setEditables : (newEditables: any) => set((state: any) => 
    ({ editables: {...state.editables, ...newEditables}})),
} ))
 
export const useTemplateStore = useStore