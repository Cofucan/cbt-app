import { create } from "zustand";

const useImageStore = create((set) => ({
  questions: null,
  zipfile: null,
  setQuestion: (data: Record<string, string>) => set(() => ({ questions: data })),
  setZipFile: (data: Record<string, string>) => set(() => ({ zipfile: data })),
}));

export default useImageStore;
