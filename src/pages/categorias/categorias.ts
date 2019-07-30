import { CategoriaDTO } from './../../../../cursoSpringIonicEstudo/src/models/categoria.dto';
import { API_CONFIG } from './../../../../cursoSpringIonicEstudo/src/config/api.config';
import { CategoriaService } from './../../domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(
      response => {
        this.items = response;
      },
      error => {});
  }
}
