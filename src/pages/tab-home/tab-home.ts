import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { RegisterPage } from '../register/register';

// import สำหรับการสร้างตัวแปรแบบ storage
import { Storage } from '@ionic/storage';

/** Device */
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {

  email:any;
  uuid:any;
  model:any;
  platform:any;
  version:any;
  serial:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public device:Device,
    public alertCtrl:AlertController) {

      this.uuid = this.device.uuid
      this.model = this.device.model;
      this.platform = this.device.platform;
      this.version = this.device.version;
      this.serial = this.device.serial;

      // สร้างตัวแปรเก็บลง storage
      this.storage.set('myemail','samitkoyom@gmail.com');
      
      // การเรียกตัวแปร storage มาใช้งาน
      this.storage.get('myemail').then((result) =>{
        this.email = result;
      });
  }

  ionViewDidLoad() {
    this.alertCtrl.create({
      title: 'ข้อมูลเครื่อง',
      subTitle: 'uuid: '+this.uuid+'<br>'+
                     'model: '+this.model+'<br>'+
                     'platform: '+this.platform+'<br>'+
                     'version: '+this.version+'<br>'+
                     'serial: '+this.serial,
      buttons: ['Dismiss']
    }).present();
  }

  register()
  {
    this.navCtrl.push(RegisterPage);
  }

}
