import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { CoursedetailPage } from '../coursedetail/coursedetail';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-tab-course',
  templateUrl: 'tab-course.html',
})
export class TabCoursePage {

  responseData: any;
  responseNotfound: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webService: WebapiServiceProvider,
    public network: Network,
    public toast: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    // เช็คว่าเครื่องมีการเชื่อมต่อ network
    if (this.network.type !== 'none') { // ถ้าต่อ network ไว้ว
        this.webService.getData("feed_course.php").then((result) => {
          console.log(result);
          this.responseData = result;
        }, (error) => {
          if (error.status == 0) {
            // this.toast.create({
            //   message: 'มีบางอย่างผิดพลาดในการดึงข้อมูลจาก Server',
            //   duration: 3000
            // }).present();

            this.alertCtrl.create({
              title: 'มีข้อผิดพลาด',
              subTitle: 'มีบางอย่างผิดพลาดในการดึงข้อมูลจาก Server',
              buttons: ['Dismiss']
            }).present();

          }
        });
    }else{ // ถ้าไม่ได้ต่อ network
        // แสดง message แจ้งว่าไม่ได้เชื่อมต่อ network
        this.toast.create({
          message:"โปรดเช็คการเชื่อมต่อ Internet ก่อน",
          duration:3000
        }).present();
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.webService.getData("feed_course.php").then((result) => {
        console.log(result);
        this.responseData = result;
      }, (error) => {
        this.responseNotfound = "มีบางอย่างผิดพลาดในการดึงข้อมูลจาก Server";
        console.log(error);
      });
      refresher.complete();
    }, 2000);
  }


  // เขียนฟังก์ชันรับ event courseDetail
  courseDetail(cid) {
    this.navCtrl.push(CoursedetailPage, {
      cid: cid
    });
  }

}
