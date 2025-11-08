// utils/ImageHelper.js
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system/legacy";
import { File } from "expo-file-system";
import { Buffer } from 'buffer';

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


  static convertByteToBase64(imagemByte){
   
    const buffer = Buffer.from(imagemByte.data);    
    return buffer.toString("base64");

  }

  static convertByteToFile(imagemByte){
    const byteArray = Uint8Array.from(imagemByte.data);

    return {
      uri: `data:image/jpeg;base64,${Buffer.from(byteArray).toString("base64")}`,
      name: "imagem.jpg",
      type: "image/jpeg"
    }


  }

  static async convertBase64ToUri(base64){
    
    const fileUri = FileSystem.cacheDirectory + `${Date.now()}.jpg`;

    try {
      const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
      
      await FileSystem.writeAsStringAsync(fileUri, cleanBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileUri;
    } catch (error) {
      console.error('Erro ao converter base64 para URI:', error);
      return null;
    }
  }

  static async deleteUri(uri) {
    if (!uri) return;
    
    try {
      await FileSystem.deleteAsync(uri, { idempotent: true });
      console.log('URI deletado com sucesso:', uri);
    } catch (error) {
      console.log('Erro ao deletar URI:', error);
    }
  }

  static async clearTempImages() {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);
      const tempFiles = files.filter(file => file.startsWith('temp_'));
      
      for (const file of tempFiles) {
        await FileSystem.deleteAsync(FileSystem.cacheDirectory + file);
      }
    } catch (error) {
      console.error('Erro ao limpar imagens temporárias:', error);
    }
  }


}
