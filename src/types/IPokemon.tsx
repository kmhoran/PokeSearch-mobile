import { IType } from "./IType";

export interface IPokemon {
  name: string;
  imageUrl: string;
  types: IType[];
  description: string;
}
