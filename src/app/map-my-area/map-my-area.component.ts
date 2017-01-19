import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { MdDialogRef,MdDialog } from '@angular/material';
import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapCircle, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core';
@Component({
  selector: 'app-map-my-area',
  templateUrl: './map-my-area.component.html',
  styleUrls: ['./map-my-area.component.css']
})
export class MapMyAreaComponent{
	@Input('position') set getPos(position){
		console.log(position);
		this.lat=position[0].coords.latitude;
		this.lng=position[0].coords.longitude;
	}
	@Output() onClose = new EventEmitter<boolean>();
	otherUsers=[];
	lat;
	lng;
  dialogRef: MdDialogRef<PizzaDialog>;

  constructor(public dialog: MdDialog) { }

  openDialog() {
    this.dialogRef = this.dialog.open(PizzaDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }

  	showOthers(){
		this.otherUsers.push({'lat':this.lat,'lng':(this.lng+0.0002),"name":"other user 1"});
		this.otherUsers.push({'lat':this.lat,'lng':(this.lng+0.0004),"name":"other user 2"});
		this.otherUsers.push({'lat':(this.lat+0.0002),'lng':this.lng,"name":"other user 3"});
		this.otherUsers.push({'lat':(this.lat+0.0004),'lng':this.lng,"name":"other user 4"});
		this.otherUsers.push({'lat':(this.lat+0.0002),'lng':(this.lng+0.0004),"name":"other user 5"});
		this.otherUsers.push({'lat':(this.lat+0.0004),'lng':(this.lng+0.0002),"name":"other user 6"});
		this.otherUsers.push({'lat':(this.lat+0.0004),'lng':(this.lng+0.0004),"name":"other user 7"});
		this.otherUsers.push({'lat':(this.lat+0.0002),'lng':(this.lng+0.0002),"name":"other user 8"});
	}
	send(){
		this.onClose.emit(true);
	}
}
@Component({
  selector: 'pizza-dialog',
  template: `
  	<md-card-header style="margin-left: 5px;margin-right: 5px;margin-top: 5px;margin-bottom: 5px;height: 110%;overflow-y: hidden;">
	  <div md-card-avatar style="padding: 10px;border-style: solid;border-width: 1px;border-radius: 10px;border-color: black;float: left;" ></div>
      <md-card-title md-dialog-title>User's name</md-card-title>
    </md-card-header>
	  <md-dialog-actions align="end">
	    <button (click)="dialogRef.close('yes')" md-raised-button color="primary">Add as a partner</button>
	    <button md-raised-button color="accent" md-dialog-close>Close</button>
	  </md-dialog-actions>

  `
})
export class PizzaDialog {
  constructor(public dialogRef: MdDialogRef<PizzaDialog>) { }
}