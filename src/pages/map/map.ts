import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import L from "leaflet";

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: L.Map;
  center: L.PointTuple;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    //set map center
    //this.center = [48.137154, 11.576124]; //Munich
    this.center = [48.775556, 9.182778]; //Stuttgart
    
    //setup leaflet map
    this.initMap();
  }

  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
  }

}
