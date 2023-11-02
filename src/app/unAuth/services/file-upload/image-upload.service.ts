import { Injectable } from '@angular/core';
import {Storage, getDownloadURL, ref, uploadBytes} from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage) { }

    //convert image url into Blob
    dataURLtoBlob(dataurl:any){
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);;
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
  }

    //uploading image
    async uploadImage(blob:any, imageData:any,folderName:any) {
      try {
        const currentDate = Date.now();
        const filePath = `${folderName}/${currentDate}.${imageData.format}`;
        const filRef = ref(this.storage, filePath)
        const task = await uploadBytes(filRef, blob)
        console.log('task', task)
        const url = getDownloadURL(filRef)
        return url
         
      } catch (error) {
        throw(error)
       
      }
}


}
