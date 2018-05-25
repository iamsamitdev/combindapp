import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userData = {
    "fullname":"",
    "email":"",
    "password":"",
    "tel":"",
    "profile":""
  };

  ResponseData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webService: WebapiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
     this.webService.postData(this.userData,"signup.php").then((result) => {
      this.ResponseData = result;
      if(this.ResponseData.success){
        alert("ลงทะเบียนเรียบร้อย");
      }else{
        alert("มีข้อผิดพลาดบางอย่าง ลงทะเบียนไม่สำเร็จ");
      }
     });
  }

}
