import {Type} from "./type.model";
import {Image} from "./image.model";

export class Velo {
  idVelo? : number;

  modelVelo? : string;
  prixVelo? : number ;
  type?: Type;
  image! : Image;
  imageStr!:string;

  images!: Image[];

}
