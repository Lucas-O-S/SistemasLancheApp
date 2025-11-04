// utils/ImageHelper.js
import * as ImagePicker from 'expo-image-picker';

export default class ImageHelper {
  static async getImageFromLibrary() {
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) 
      return result.assets[0].uri; 
    

    return null;
  
  }

  static convertToFile(uri){
    return  {
      uri: uri,
      name: 'foto.jpg',
      type: 'image/jpeg',
    };
  }


}
