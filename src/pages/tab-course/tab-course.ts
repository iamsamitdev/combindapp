import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { CoursedetailPage } from '../coursedetail/coursedetail';

@IonicPage()
@Component({
  selector: 'page-tab-course',
  templateUrl: 'tab-course.html',
})
export class TabCoursePage {

  responseData:any;
  responseNotfound:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webService: WebapiServiceProvider) {
  }

  ionViewDidLoad() {
    this.webService.getData("feed_course.php").then((result) => {
      console.log(result);
      this.responseData = result;
    }, (error) => {
      this.responseNotfound = "มีบางอย่างผิดพลาดในการดึงข้อมูลจาก Server"; 
      console.log(error);
    });
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
  courseDetail(cid)
  {
    this.navCtrl.push(CoursedetailPage,{
      cid:cid
    });
  }

}
