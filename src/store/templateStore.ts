import create from 'zustand';

const useStore = create<any>((set: Function) => ({
  options: {},
  setOptions: (newOptions: any) => set((state: any) => {
    console.log('here', newOptions)
    return { options: {...state.options, ...newOptions} };
  })
}))

export const useTemplateStore = useStore