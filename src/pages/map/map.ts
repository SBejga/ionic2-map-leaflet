import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import L from "leaflet";

//Coordinates, PositionError
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';

const GEOLOCATION_OPTIONS: GeolocationOptions = {
   maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
};

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: L.Map;
  center: L.PointTuple;
  following: Boolean;
  positionMarker: L.Marker;
  positionAccuracyCircle: L.Circle;

  private geolocationSubscription;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    //set map center
    //this.center = [48.137154, 11.576124]; //Munich
    this.center = [48.775556, 9.182778]; //Stuttgart
    
    //setup leaflet map
    this.initMap();

    //Show Toast how to enable geolocation
    let toast = this.toastCtrl.create({
      message: 'To locate your position, press icon button in top right corner ',
      position: 'middle',
      showCloseButton: true
    });
    toast.present();
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

  toggleFollow() {
    this.following = !this.following;

    if (this.following) {
      this.startFollow();
    } else {
      this.stopFollow();
    }
  }

  startFollow() {
    this.geolocationSubscription = this.geolocation.watchPosition(GEOLOCATION_OPTIONS)
      //.filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.updateGeoposition(position);
      });
  }

  stopFollow() {
    this.geolocationSubscription.unsubscribe();
  }

  updateGeoposition(position: Geoposition) {
    console.log(position.coords.longitude + ' ' + position.coords.latitude);
    
    //create Point
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude, date: new Date()};

    if (this.positionMarker) {
      this.positionMarker.setLatLng(latlng);
      this.positionAccuracyCircle.setLatLng(latlng).setRadius(position.coords.accuracy);
    } else {
      this.positionMarker = L.marker(latlng).addTo(this.map);
      this.positionAccuracyCircle = L.circle(latlng, {radius: position.coords.accuracy}).addTo(this.map);
    }

    //Set Center
    this.map.setView(latlng, 13);
  }

}
