import AsyncStorage from '@react-native-async-storage/async-storage';

const SAPATOS_KEY = '@sapatos';

export interface Sapato {
  nome: string;
  precoCusto: number;
  precoVenda: number;
  imagens: string[];
}

export async function getSapatos(): Promise<Sapato[]> {
  const data = await AsyncStorage.getItem(SAPATOS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function addSapato(novo: Sapato): Promise<void> {
  const sapatos = await getSapatos();
  const atualizado = [...sapatos, novo];
  await AsyncStorage.setItem(SAPATOS_KEY, JSON.stringify(atualizado));
}

export async function removeSapato(index: number): Promise<void> {
  const sapatos = await getSapatos();
  sapatos.splice(index, 1);
  await AsyncStorage.setItem(SAPATOS_KEY, JSON.stringify(sapatos));
}