import {Component} from '@angular/core';
import {Velo} from "../model/velo-model";
import {VeloService} from "../services/velo.service";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: []
})
export class RechercheParNomComponent {

  modelVelo!: string;
  velos!: Velo[];
  allVelos!: Velo[];
  searchTerm!: string;


  constructor(private veloService: VeloService, public authService: AuthService) {
  }

  /*ngOnInit(): void {
    //this.allVelos = this.veloService.listeVelo();
    this.velos = this.veloService.listeVelo();
  }*/

  ngOnInit(): void {
    this.veloService.listeVelo().subscribe(vls => {
      console.log(vls);
      this.velos = vls;
    });

  }

  rechercherVelos() {
    this.veloService.rechercherParNom(this.modelVelo).subscribe(prods => {
      console.log(prods);
      this.velos = prods;
    });
  }


  /*rechercherVelos(){
    this.velos = this.veloService.rechercherParNom(this.nomVelo);
  }*/

  /*onKeyUp(filterText: string) {
    this.velos = this.allVelos.filter(item => item.marqueVelo!.toLowerCase().includes(filterText));
  }*/

  onKeyUp(filterText: string) {
    this.velos = this.allVelos.filter(item =>
      item.modelVelo!.toLowerCase().includes(filterText));
  }


  supprimerVelo(p: Velo) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.veloService.supprimerVelo(p.idVelo!).subscribe(() => {
        console.log("produit supprimé");
      });
  }

}
