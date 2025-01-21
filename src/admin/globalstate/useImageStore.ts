import { create } from "zustand";

const useImageStore = create((set) => ({
  questions: null,
  zipfile: null,
  setQuestion: (data) => set(() => ({ questions: data })),
  setZipFile: (data) => set(() => ({ zipfile: data })),
}));

export default useImageStore;
