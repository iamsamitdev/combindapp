import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SideSchedulePage } from '../pages/side-schedule/side-schedule';
import { SidePortfolioPage } from '../pages/side-portfolio/side-portfolio';
import { SidePaymentPage } from '../pages/side-payment/side-payment';
import { SideSettingPage } from '../pages/side-setting/side-setting';

/**  Push Notification */
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fcm: FCM,
    public alertCtrl: AlertController) {
    this.initializeApp();

    // เมนูด้านข้าง
    this.pages = [
      { title: 'ตารางอบรม', component: SideSchedulePage, icon: 'calendar' },
      { title: 'ผลงาน', component: SidePortfolioPage, icon: 'albums' },
      { title: 'ช่องทางชำระเงิน', component: SidePaymentPage, icon: 'logo-bitcoin' },
      { title: 'ตั้งค่า', component: SideSettingPage, icon: 'settings' }
    ];

  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // ทำการลงทะเบียนเครื่องที่ติดตั้ง app เพื่อส่ง pushnotification
      this.fcm.subscribeToTopic('all');
        this.fcm.getToken().then(token => {
      });

      // เช็คว่าเป็น device จริงเท่านั้น    
      if (!this.platform.is('core')) {
        // รับข้อมูลการ Pushnotification
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            alert('Recieve in background');
            this.nav.push('SideSchedulePage', { sid: data.pid });
          } else {
            //alert('Recieve in foreground');
            //alert(JSON.stringify(data));
            let alertdig = this.alertCtrl.create({
              title: data.title,
              subTitle: data.body,
              message: 'pid=' + data.pid + 'groub=' + data.groub,
              buttons: [
                {
                  text: 'ดูรายละเอียด',
                  handler: () => {
                    this.nav.push('SideSchedulePage', { sid: data.pid });
                  }
                }
              ],
              enableBackdropDismiss: false
            });

            alertdig.present();
          }
        });

        // อัพเดท Token
        this.fcm.onTokenRefresh().subscribe(token => {
          //alert(token);
        });
      }
  });
}

openPage(page) {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.nav.push(page.component);
}
}
