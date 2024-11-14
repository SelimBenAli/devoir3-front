import { Component } from '@angular/core';
import { Velo } from "../model/velo-model";
import { VeloService } from "../services/velo.service";
import { Router } from "@angular/router";
import { Type } from "../model/type.model";
import { Image } from "../model/image.model";
import { Observable } from "rxjs";
import { apiURL } from '../config';

@Component({
  selector: 'app-ajout-velo',
  templateUrl: './ajout-velo.component.html'
})
export class AjoutVeloComponent {
  newVelo = new Velo();
  message: string = "";
  types!: Type[];
  newIdType!: number;
  newType!: Type;
  uploadedImage!: File;
  imagePath: any;
  apiurl:string= apiURL;

  constructor(private veloService: VeloService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.veloService.listeType().subscribe((typs) => {
      this.types = typs._embedded.types;
      console.log(typs);
    });
  }


  /*ajoutVelo() {
    this.newVelo.type = this.types.find(
      (t) => t.idType == this.newIdType
    );
    this.veloService.ajouterVelo(this.newVelo).subscribe((velo) => {
      this.router.navigate(['velos']);
    })
    // this.message = "Velo ajouté avec succès !";

  }*/


  /*ajoutVelo() {
    this.veloService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newVelo.image = img;
        this.newVelo.type = this.types.find(typ => typ.idType == this.newIdType)!;
        this.veloService
          .ajouterVelo(this.newVelo)
          .subscribe(() => {
            this.router.navigate(['velos']);
          });
      });
  }*/

      ajoutVelo(){
        this.newVelo.type = this.types.find(typ => typ.idType
        == this.newIdType)!;
        this.veloService
        .ajouterVelo(this.newVelo)
        .subscribe((vlo) => {
        this.veloService
        .uploadImageFS(this.uploadedImage, 
        this.uploadedImage.name,vlo.idVelo)
        .subscribe((response: any) => {}
        );
        this.router.navigate(['velos']);
        });
        }



  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }


}
