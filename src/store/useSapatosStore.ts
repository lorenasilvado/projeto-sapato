import { create } from 'zustand';

interface Sapato{
  precoCusto: number;
  precoVenda: number;
  imagens: string[];
}

interface SapatoStore {
  sapatos: Sapato[]
  addSapatos: (novoSapato: Sapato) => void;
}

export const useSapatosStore = create<SapatoStore>()((set) => ({
    sapatos: [],
    addSapatos: (novoSapato) => set((state) => ({ sapatos: [...state.sapatos, novoSapato] })),
}));

