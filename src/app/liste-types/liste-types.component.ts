import {Component, OnInit} from '@angular/core';
import {Type} from "../model/type.model";
import {VeloService} from "../services/velo.service";

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: []
})
export class ListeTypesComponent implements OnInit {
  types!: Type[];
  ajout: boolean = true;
  updatedType: Type = {"idType": 0, "nomType": ""};

  constructor(private veloService: VeloService) {
  }

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.veloService.listeType().subscribe(typs => {
      this.types = typs._embedded.types;
      console.log(typs);
    });
  }

  typeUpdated(typ: Type) {
    console.log("typeUpdated ", typ);
    this.veloService.ajouterType(typ).subscribe(() => this.chargerTypes());
  }

  updateType(typ: Type) {
    this.updatedType = typ;
    this.ajout = false;
  }
}
