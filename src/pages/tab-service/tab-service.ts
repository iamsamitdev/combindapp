import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import สำหรับการสร้างตัวแปรแบบ storage
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tab-service',
  templateUrl: 'tab-service.html',
})
export class TabServicePage {

  email:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage) {

       // การเรียกตัวแปร storage มาใช้งาน
       this.storage.get('myemail').then((result) =>{
        this.email = result;
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabServicePage');
  }

}
