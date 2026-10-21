import { Component, inject } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { PhotoService } from '../services/photo';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false
})
export class TabsPage {
  private readonly photoService = inject(PhotoService);
  private readonly navCtrl = inject(NavController);
  private readonly alertController = inject(AlertController);

  async openCamera(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.navCtrl.navigateRoot('/tabs/tab1');
    await this.photoService.addNewToGallery();
  }

  async confirmExit(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const alert = await this.alertController.create({
      header: 'Cerrar aplicación',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          role: 'destructive',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}