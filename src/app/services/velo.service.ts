import {Injectable} from '@angular/core';
import {Velo} from "../model/velo-model";
import {Type} from "../model/type.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {apiURL, apiURLType} from "../config";
import {TypeWrapper} from "../model/typeWrapped.model";
import {AuthService} from "./auth.service";
import {Image} from "../model/image.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class VeloService {
  velos!: Velo[];
  velo!: Velo;
  types!: Type[];




  constructor(private http: HttpClient, private authService: AuthService) {

    /*this.mytypes = [{idType: 1, nomType: "MTB"},
      {idType: 2, nomType: "VTT"}];

    this.velos = [
      {
        idVelo: 1, modelVelo: "SC90", marqueVelo: "SCOTT", prixVelo: 1200, type: {idType: 2, nomType: "VTT"}
      },
      {
        idVelo: 2,
        modelVelo: "BETWEEN ROCK RIDER 540",
        marqueVelo: "BTWEEN",
        prixVelo: 3000,
        type: {idType: 1, nomType: "MTB"}
      },
      {
        idVelo: 3, modelVelo: "RR 4", marqueVelo: "ROCK RIDER", prixVelo: 2000, type: {idType: 1, nomType: "MTB"}
      }
    ];*/
  }

  /*listeVelo(): Velo[] {
    return this.velos;
  }*/

  listeVelo(): Observable<Velo[]> {
    return this.http.get<Velo[]>(apiURL+"/all");
  }

  /*ajouterVelo(velo: Velo) {
    this.velos.push(velo);
  }*/

  ajouterVelo(velo: Velo): Observable<Velo> {
    return this.http.post<Velo>(apiURL+"/add-velo", velo);

  }

  /*supprimerVelo(velo: Velo) {
    const index = this.velos.indexOf(velo, 0);
    if (index > -1) {
      this.velos.splice(index, 1);
    }
  }*/

  supprimerVelo(id: number) {
    return this.http.delete(`${apiURL}/delete-velo/${id}`);

  }

  /*consulterVelo(id: number): Velo {
    this.velo = this.velos.find(p => p.idVelo == id)!;
    return this.velo;
  }*/

  consulterVelo(id: number): Observable<Velo> {
    return this.http.get<Velo>(`${apiURL}/get-by-id/${id}`);

  }

  /*updateVelo(x: Velo) {
    this.supprimerVelo(x);
    this.ajouterVelo(x);
  }*/

  updateVelo(v: Velo): Observable<Velo> {
    return this.http.put<Velo>(apiURL+"/update-velo", v);
  }

  /*listeType(): Type[] {
    return this.mytypes;
  }*/

  /*listeType(): Observable<Type[]> {
    const url = apiURL + "/type"
    return this.http.get<Type[]>(apiURL + "/type");
  }*/

  listeType():Observable<TypeWrapper>{
    return this.http.get<TypeWrapper>(apiURLType)
  }

  consulterType(id: number): Type {
    console.log('/', this.types)
    return this.types.find(tp => tp.idType == id)!;
  }

  rechercherParType(idType: number): Observable<Velo[]> {
    const url = `${apiURL}/vlstype/${idType}`;
    return this.http.get<Velo[]>(url);
  }

  /*rechercherParNom(marque: string): Velo[] {
    console.log(this.velos.filter(v => v.marqueVelo!.toLowerCase().includes(marque.toLowerCase())));
    return this.velos.filter(v => v.marqueVelo!.toLowerCase().includes(marque.toLowerCase()));
  }*/

  rechercherParNom(nom: string):Observable<Velo[]> {
    const url = `${apiURL}/vlsByName/${nom}`;
    return this.http.get<Velo[]>(url);
  }


  ajouterType( typ: Type):Observable<Type>{
    return this.http.post<Type>(apiURLType, typ, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }
    loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
    }

    uploadImageVlo(file: File, filename: string, idVlo?:number): Observable<any>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${apiURL + '/image/uplaodImageVlo'}/${idVlo}`;
      return this.http.post(url, imageFormData);
      }

      supprimerImage(id : number) {
        const url = `${apiURL}/image/delete/${id}`;
        return this.http.delete(url, httpOptions);
        }

        uploadImageFS(file: File, filename: string, idVlo? : number): Observable<any>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${apiURL + '/image/uploadFS'}/${idVlo}`;
          return this.http.post(url, imageFormData);
          }
        
      

}
