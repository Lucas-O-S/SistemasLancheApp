import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, Image} from "react-native";
import { TextInput } from "react-native-paper";

import AlunoModel from "../Models/AlunoModel";
import ImageHelper from "../utils/ImageHelper";


export default function AlunoEditorScreen({navigation, route}){

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [foto, setFoto] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [image64, setImage64] = useState(null);

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
        
        const uriResult = await ImageHelper.getImageFromLibrary();
        
        console.log(uriResult);
        
        if(uriResult != null){
            
            setImageUri(uriResult);
            
            alunoModel.imagem64 = await ImageHelper.convertUriToString(uriResult);
            
            console.log("Entrou no uri to string");
            setImage64(alunoModel.imagem64);
            console.log("imagem64: " + alunoModel.image64);
        } 


    }






    return (

        <View>


        
            <TouchableOpacity style={styles.imageBox} onPress={async () => await setImage()} >
                {imageUri ? (
                <Image style={styles.image} />
                ) : (
                <Text style={styles.placeholderText}>Toque para selecionar imagem</Text>
                )}
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
                onChangeText={setNome}
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
