// utils/ImageHelper.js
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system/legacy";
import { File } from "expo-file-system";


export default class ImageHelper {
  static async getImageFromLibrary() {
    
    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) 
      return result.assets[0].uri; 
    

    return null;
  
  }

  static mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp'
  };

  static convertUriToFile(uri){
   
    const filename = uri.split('/').pop();
    const extension = filename.split('.').pop().toLowerCase();
    const type  = ImageHelper.mimeTypes[extension];
    
    return {
      uri: uri,
      name: filename,
      type: type
    };

  }

  static async convertUriToBase64(uri){

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    return `data:image/jpeg;base64,${base64}`;
  }

  static async convertFileToBase64(file){
    
    return await file.text();
  }


}
