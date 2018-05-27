import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { CoursedetailPage } from '../coursedetail/coursedetail';
import { Network } from '@ionic-native/network';

// import สำหรับการสร้างตัวแปรแบบ storage
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tab-course',
  templateUrl: 'tab-course.html',
})
export class TabCoursePage {

  responseData: any;
  responseNotfound: any;
  key: string = "items";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webService: WebapiServiceProvider,
    public network: Network,
    public toast: ToastController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public app: App) {
  }

  ionViewDidLoad() {
    // เช็คว่าเครื่องมีการเชื่อมต่อ network
    if (this.network.type !== 'none') { // ถ้าต่อ network ไว้
      this.webService.getData("feed_course.php").then((result) => {
        //console.log(result);

        this.responseData = result;
        // Keep data to storage for offline app
        this.storage.set(this.key, JSON.stringify(result));

      }, (error) => {
        if (error.status == 0) {

          // ดึงข้อมูลจาก data storage มาแสดงแทน
          this.storage.get(this.key).then((val) => {
            if (val != null && val != undefined) {
              this.responseData = JSON.parse(val);
            }
          });

          this.alertCtrl.create({
            title: 'มีข้อผิดพลาด',
            subTitle: 'มีบางอย่างผิดพลาดในการดึงข้อมูลจาก Server',
            buttons: ['Dismiss']
          }).present();

        }
      });
    } else { // ถ้าไม่ได้ต่อ network
      // แสดง message แจ้งว่าไม่ได้เชื่อมต่อ network
      this.toast.create({
        message: "โปรดเช็คการเชื่อมต่อ Internet ก่อน",
        duration: 5000,
        showCloseButton: true,
        closeButtonText: 'close',
        dismissOnPageChange: true,
        cssClass: "toaststyle",
      }).present();

      // ดึงข้อมูลจาก data storage มาแสดงแทน
      this.storage.get(this.key).then((val) => {
        if (val != null && val != undefined) {
          this.responseData = JSON.parse(val);
        }
      });
    }
  }

  doRefresh(refresher) {

    console.log('Begin async operation', refresher);
    setTimeout(() => {
      // เช็คว่าเครื่องมีการเชื่อมต่อ network
      if (this.network.type !== 'none') { // ถ้าต่อ network ไว้
        this.webService.getData("feed_course.php").then((result) => {
          console.log(result);
          this.responseData = result;
        }, (error) => {
          if (error.status == 0) {
            this.alertCtrl.create({
              title: 'มีข้อผิดพลาด',
              subTitle: 'มีบางอย่างผิดพลาดในการดึงข้อมูลจาก Server',
              buttons: ['Dismiss']
            }).present();
          }
        });

      } else {
        // แสดง message แจ้งว่าไม่ได้เชื่อมต่อ network
        this.toast.create({
          message: "โปรดเช็คการเชื่อมต่อ Internet ก่อน",
          duration: 5000,
          showCloseButton: true,
          closeButtonText: 'close',
          dismissOnPageChange: true,
          cssClass: "toaststyle",
        }).present();
      }

      refresher.complete();
    }, 2000);
  }


  // เขียนฟังก์ชันรับ event courseDetail
  courseDetail(cid) {
    this.app.getRootNav().push(CoursedetailPage, {
      cid: cid
    });
  }

}
