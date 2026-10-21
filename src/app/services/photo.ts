import { Injectable, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public readonly photos = signal<UserPhoto[]>([]);

  async addNewToGallery(): Promise<UserPhoto | null> {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 90,
        saveToGallery: true // Guarda automáticamente en el carrete del dispositivo
      });

      if (!capturedPhoto.webPath) return null;

      const newPhoto: UserPhoto = {
        filepath: capturedPhoto.path || '',
        webviewPath: capturedPhoto.webPath,
        date: new Date()
      };

      this.photos.update(photos => [newPhoto, ...photos]);
      return newPhoto;
    } catch (error) {
      console.warn('Captura cancelada o error:', error);
      return null;
    }
  }
}