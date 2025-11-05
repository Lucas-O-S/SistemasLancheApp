// utils/ImageHelper.js
import * as ImagePicker from 'expo-image-picker';

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

  static convertUriToString(uri){
   
    const filename = uri.split('/').pop();
    const extension = filename.split('.').pop().toLowerCase();
    const type  = ImageHelper.mimeTypes[extension];
    
    const file = {
      uri: uri,
      name: filename,
      type: type
    };

    const formData = new FormData();
    formData.append('file', file);

    console.log("resultado em file" + JSON.stringify(formData));

    return formData;
  }

  static async convertUriToString(uri){
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }


}
