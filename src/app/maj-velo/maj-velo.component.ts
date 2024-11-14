import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VeloService} from "../services/velo.service";
import {Velo} from "../model/velo-model";
import {Type} from "../model/type.model";
import {Image} from "../model/image.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-maj-velo',
  templateUrl: './maj-velo.component.html',
  styles: []
})
export class MajVeloComponent {
  veloActuelle = new Velo();
  types!: Type[];
  updatedTypeId?: number;
  myImage! : string;
  uploadedImage!: File;
isImageUpdated: Boolean=false;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private veloService: VeloService
  ) {
  }


  /*ngOnInit() {
    this.mytypes = this.veloService.listeType();
    console.log(this.activatedRoute.snapshot.params['id']);
    this.veloActuelle = this.veloService.consulterVelo(this.activatedRoute.snapshot.params['id']);
    this.updatedTypeId=this.veloActuelle.type.idType;
    console.log(this.veloActuelle);
  }*/

  /*ngOnInit(): void {
    this.veloService.listeType().subscribe((typs) => {
      this.types = typs._embedded.types;
      console.log('//', typs);
    });


    this.veloService.consulterVelo(this.activatedRoute.snapshot.params['id']).subscribe(vlo => {
      this.veloActuelle = vlo;
      this.updatedTypeId = this.veloActuelle.type!.idType;

      this.veloService
.loadImage(this.veloActuelle.image.idImage)
.subscribe((img: Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
}); 

    });
  }*/

  ngOnInit(): void {
    this.veloService.listeType().
    subscribe(cats => {this.types = cats._embedded.types;
    });
    this.veloService.consulterVelo(this.activatedRoute.snapshot.params['id'])
    .subscribe( vlo =>{ this.veloActuelle = vlo;
    this.updatedTypeId = vlo.type?.idType;
    } ) ;
    }

  /*updateVelo() {
    this.veloActuelle.type = this.types.find(
      (t) => t.idType == this.updatedTypeId
    );
    this.veloService.updateVelo(this.veloActuelle).subscribe((vel) => this.router.navigate(['velos'])
  )

  }*/


  /*updateVelo() {
    this.veloActuelle.type = this.types.find(typ => typ.idType == 
    this.updatedTypeId)!;
  
    if (this.isImageUpdated)
    { 
    this.veloService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.veloActuelle.image = img;
    this.veloService
    .updateVelo(this.veloActuelle)
    .subscribe((vlo) => {
    this.router.navigate(['velos']);
    });
    });
    }
    else{ 
    this.veloService
    .updateVelo(this.veloActuelle)
    .subscribe((vlo) => {
    this.router.navigate(['velos']);
    });
    }
    }*/

    updateVelo() {
      this.veloActuelle.type = this.types.find(typ => typ.idType == 
      this.updatedTypeId)!; 
      this.veloService
      .updateVelo(this.veloActuelle)
      .subscribe((vlo) => {
      this.router.navigate(['velos']);
      });
      }
      
    


  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }

    onAddImageVelo() {
      this.veloService
      .uploadImageVlo(this.uploadedImage, this.uploadedImage.name,this.veloActuelle.idVelo)
      .subscribe( (img : Image) => {
      this.veloActuelle.images.push(img);
      });
      }

      supprimerImage(img: Image){
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.veloService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.veloActuelle.images.indexOf(img, 0);
        if (index > -1) {
        this.veloActuelle.images.splice(index, 1);
        }
        });
        }
        

}
