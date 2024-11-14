import {Component} from '@angular/core';
import {Velo} from "../model/velo-model";
import {VeloService} from "../services/velo.service";
import {Type} from "../model/type.model";
import {Image} from "../model/image.model";
import {AuthService} from "../services/auth.service";
import {apiURL} from "../config";

@Component({
  selector: 'app-velos',
  templateUrl: './velos.component.html'
})
export class VelosComponent {
  velos?: Velo[];
  apiurl:string=apiURL;

  constructor(private velosService: VeloService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.chargerVelos()
  }

  /*chargerVelos() {
    this.velosService.listeVelo().subscribe(vls => {
      console.log(vls);
      this.velos = vls;
      this.velos.forEach((vlo) => {
        this.velosService
        .loadImage(vlo.image.idImage)
        .subscribe((img: Image) => {
          vlo.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
        }); 
        });
        }*/

        chargerVelos(){
          this.velosService.listeVelo().subscribe(vlos => {
          this.velos = vlos;
          });
          }
          
        

  supprimerVelo(p: Velo) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.velosService.supprimerVelo(p.idVelo!).subscribe(() => {
        console.log("produit supprimé");
        this.chargerVelos();
      });
  }
}
