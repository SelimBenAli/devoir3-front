import {Component, OnInit} from '@angular/core';
import {Velo} from "../model/velo-model";
import {Type} from "../model/type.model";
import {VeloService} from "../services/velo.service";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',
  styles: []
})
export class RechercheParTypeComponent implements OnInit {
  velos!: Velo[];
  IdType!: number;
  types!: Type[];

  constructor(private veloService: VeloService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.veloService.listeType().subscribe((typs) => {
      this.types = typs._embedded.types;
      console.log(typs);
    });

  }

  onChange() {
    this.veloService.rechercherParType(this.IdType).subscribe(prods => {
      this.velos = prods
    });

  }

  supprimerVelo(p: Velo) {
    //console.log(p);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.veloService.supprimerVelo(p.idVelo!);
  }

}
