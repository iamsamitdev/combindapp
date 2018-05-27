import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-coursedetail',
  templateUrl: 'coursedetail.html',
})
export class CoursedetailPage {

  getcid: number; // รับค่าตัวแปร cid
  cdetail: any; // เก็บข้อมูลที่ได้จาก json

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webService: WebapiServiceProvider,
    public network: Network,
    public toast: ToastController,
    public alertCtrl: AlertController, ) {
    this.getcid = navParams.get('cid');
  }

  ionViewDidLoad() {
    // เช็คว่าเครื่องมีการเชื่อมต่อ network
    if (this.network.type !== 'none') { // ถ้าต่อ network ไว้
      this.webService.getData("feed_course_detail.php?cid=" + this.getcid).then((result) => {
        console.log(result);
        this.cdetail = result;
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
        duration: 3000
      }).present();
    }
  }

}
