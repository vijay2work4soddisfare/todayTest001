import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseObjectObservable} from 'angularfire2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  position=[];
  gotPosition=false;
  tempPos;
  mySavedLocation:FirebaseObjectObservable<any>;
  otherUsers:FirebaseObjectObservable<any>;
  setposition(latitude,longitude){
    //console.log("inside set position : ",latitude,longitude);
    if(this.position.length==0) {
      //console.log("added new pos.",this.position);
      this.position.push({"coords":{"latitude":latitude,"longitude":longitude}});
      this.gotPosition=true;
    }else if(this.position.length>0){
      //console.log("Removed old pos.",this.position);
      this.gotPosition=false;
      this.position.pop();
      this.setposition(latitude,longitude);
    }
  }
  constructor(private http:Http , private af:AngularFire){
    this.mySavedLocation=af.database.object("myLocation/", { preserveSnapshot: true });
    this.otherUsers=af.database.object("otherUsers/", { preserveSnapshot: true });
    this.mySavedLocation.subscribe(value=>{
      if(value.exists()) {
        this.setposition(value.val().latitude,value.val().longitude);
      }else{
    
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
              //console.log(position.coords);
              this.mySavedLocation.update({"latitude":position.coords.latitude,"longitude":position.coords.longitude});
              this.setposition(position.coords.latitude,position.coords.longitude);
            },(err)=>{
              //console.log(err);console.log("Navigator error fn");
                this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCtZWZg-3JTjGkryJCnP71WADnmdDMV2d8",{"considerIp": "true"},{})
                  .subscribe((response)=>{
                    //console.log("goog map api"); console.log(response);
                    this.tempPos=response;
                    this.position=[];
                    var tres=JSON.parse(this.tempPos._body);
                    //var position=tres.loc.split(",");
                    this.setposition(tres.location.lat,tres.location.lng);
                    //console.log("position");
                    //console.log(this.position);
                      this.gotPosition=true;
                });
              },
              { enableHighAccuracy: false, timeout: 3000, maximumAge: 0 }
            );
          }else{
            //console.log("location not available");
          }
      }
    });
    setInterval(()=>{
      //console.log("gotPosition : "+this.gotPosition+" lat : "+this.position.coords.latitude+" lng : "+this.position.coords.longitude);
      //console.log("gotPosition : "+this.gotPosition);
    },1000);
  }
  correct=true;
  send($event){
    this.correct=false;
  }
  updatePos(temp){
    //console.log("type is : ",typeof(coords));
    //var temp=JSON.parse(coords);
    //console.log("inside update pos.",temp);
    this.mySavedLocation.update({"latitude":temp.coords.latitude,"longitude":temp.coords.longitude});
    this.gotPosition=false;
    this.correct=true;
    this.setposition(temp.coords.latitude,temp.coords.longitude);
  }
}
