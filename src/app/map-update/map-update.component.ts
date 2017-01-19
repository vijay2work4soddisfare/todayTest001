import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapCircle, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core';
@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.css']
})
export class MapUpdateComponent implements OnInit {
	@Input('position') set getPos(position){
		this.lat=position[0].coords.latitude;
		this.lng=position[0].coords.longitude;
	}
	@Output() onClose = new EventEmitter<any>();
	lat;
	lng;
  constructor() { }
  coords;
  markerDragEnd($event){
  	console.log($event);

  	this.coords=$event;
  }
  send(){
  	//console.log("inside update emit fn : ",this.coords.coords.lat);
  	this.onClose.emit({"coords":{"latitude":this.coords.coords.lat,"longitude":this.coords.coords.lng}});
  }
  ngOnInit() {
  }

}
