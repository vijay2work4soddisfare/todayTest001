import { Component, OnInit ,Input} from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapCircle, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-add-other-users',
  templateUrl: './add-other-users.component.html',
  styleUrls: ['./add-other-users.component.css']
})
export class AddOtherUsersComponent{
@Input('position') set getPos(position){
		this.lat=position[0].coords.latitude;
		this.lng=position[0].coords.longitude;
		console.log("add user component, lat: ",this.lat+" lng: ",this.lng);
	}
	lat;
	lng;
	otheruser:FirebaseListObservable<any>;
	latGreat:FirebaseListObservable<any>;
	latLess:FirebaseListObservable<any>;
	lngGreat:FirebaseListObservable<any>;
	lngLess:FirebaseListObservable<any>;
  constructor(private af:AngularFire) { 
  		this.otheruser=this.af.database.list("otherUsers/");
  }
  pos;
	markerDragEnd($event){
	  	this.pos=$event;
	}
	send(){
		this.otheruser.push({"latitude":this.pos.coords.lat,"longitude":this.pos.coords.lng});
	}
	getAllLists(){
	  	this.lngGreatMap();
	  	this.lngLessMap();
	  	this.latLessMap();
	  	this.latGreatMap();
	}
	othersList=[];
	addToOtherUser(x){
		this.othersList.push({"latitude":x.latitude,"longitude":x.longitude});
	}
	compWithLat(){
		this.getAllLists();
	 	console.log("Compare with Lat");
	  	this.latLess.subscribe(snapshot=>{
//	  		console.log("lat less",snapshot);
	  		if(snapshot.length>0) {
		  		snapshot.map(y => {
		  			//console.log(y);
		  			this.lngLess.subscribe(lngLessVal=>{
		  				lngLessVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						console.log(y);
			  						this.addToOtherUser(y);
		  						}
		  					}
		  				});
		  			});
		  			this.lngGreat.subscribe(lngGreatVal=>{
		  				lngGreatVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						this.addToOtherUser(y);
			  						console.log(y);
		  						}
		  					}
		  				});
		  			});
		  		});
	  		}
	  	});
	  	this.latGreat.subscribe(snapshot=>{
//	  		console.log("lat Great",snapshot);
	  		if(snapshot.length>0) {
		  		snapshot.map(y => {
		  			//console.log(y);
		  			this.lngLess.subscribe(lngLessVal=>{
		  				lngLessVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						this.addToOtherUser(y);
			  						console.log(y);
		  						}
		  					}
		  				});
		  			});
		  			this.lngGreat.subscribe(lngGreatVal=>{
		  				lngGreatVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						this.addToOtherUser(y);
			  						console.log(y);
		  						}
		  					}
		  				});
		  			});
		  		});
	  		}
	  	});
		
	}
	
	latLessMap(){
		console.log("latLess");
  	  	this.latLess=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'latitude',
	  		endAt: this.lat,
	  		limitToLast:5
	  	}});
	}

	latGreatMap(){
		console.log("latGreat");
	  	this.latGreat=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'latitude',
	  		startAt: this.lat,
	  		limitToFirst:5
	  	}});
	}
	lngLessMap(){
		console.log("latGreat");
	  	this.lngLess=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'longitude',
	  		endAt: this.lng,
	  		limitToLast:5
	  	}});
	}
	lngGreatMap(){
		console.log("lngGreat");
	  	this.lngGreat=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'longitude',
	  		startAt: this.lng,
	  		limitToFirst:5
	  	}});
	}
}
