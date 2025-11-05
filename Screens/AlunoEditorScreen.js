import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, Image} from "react-native";
import { TextInput } from "react-native-paper";
import { Alert } from "react-native";


import AlunoModel from "../Models/AlunoModel";
import ImageHelper from "../Utils/ImageHelper";


export default function AlunoEditorScreen({navigation, route}){

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [foto, setFoto] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [image64, setImagem64] = useState(null);

    let alunoModel =  route.params?.aluno ?? new AlunoModel();
    
    useFocusEffect(
        useCallback(()=>{
            if(alunoModel){
                setId(alunoModel.id);
                setNome(alunoModel.nome);
                setRa(alunoModel.ra);
            }
        },[])
    )

    async function saveAluno () {

        alunoModel.nome = nome;
        alunoModel.ra = ra;
        alunoModel.foto = foto;
        
        try{
            
            
        }
        catch(Error){
            Alert.Alert("Erro ao salvar " + Error.message);
        }
        
    }

    async function setImage() {
        try{
            const uriResult = await ImageHelper.getImageFromLibrary();
                    
            console.log(uriResult);
            
            alunoModel.imagemFile = ImageHelper.convertUriToForm(uriResult);
            if(uriResult){
                console.log("Passou no if uriResulti");

                setImageUri(uriResult);
                
                setImagem64(await ImageHelper.convertUriToBase64(uriResult));

            } 
        }
        catch(error){
            console.log("Erro ao selecionar imagem: " + error.message);
            Alert.alert("Erro ao selecionar imagem: " + error.message);
        }
        


    }






    return (

        <View>

        
            <TouchableOpacity style={styles.imageBox} onPress={async () => await setImage()} >
                {image64 ? (
                        <Image style={styles.image} source={{ uri: image64 }} />
                    ) : (
                    
                        <Text style={styles.placeholderText}>Toque para selecionar imagem</Text>
                    )
                }
            </TouchableOpacity>
        

            <Text>Nome</Text>
            <TextInput 
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do Aluno"
            />
            <Text>RA</Text>
            <TextInput 
                value={ra}
                onChangeText={setRa}
                placeholder="RA do Aluno"
            />

            <TouchableOpacity onPress={() => saveAluno()}>
                <Text>Salvar</Text>
            </TouchableOpacity>

        </View>

    )

}



const styles = StyleSheet.create({
  imageBox: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#999",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
