import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, Image} from "react-native";
import { TextInput } from "react-native-paper";
import { Alert } from "react-native";
import InputTexComponent from "../Components/InputTextComponent";
import ImageComponent from "../Components/ImageComponent";
import ButtonComponent from "../Components/ButtonComponent";
import ImageHelper from "../Utils/ImageHelper";

import AlunoModel from "../Models/AlunoModel";
import AlunoController from "../Controller/Aluno.Controller";


export default function AlunoEditorScreen({navigation, route}){

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
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
    async function saveAluno() {        
        try {

            alunoModel.nome = nome;
            alunoModel.ra = ra;
            alunoModel.imagemFile = await ImageHelper.convertUriToFile(imageUri);
            
            await AlunoController.saveAluno(alunoModel);

            Alert.alert("Sucesso", "Aluno salvo com sucesso!");


            navigation.goBack();
        } catch (error) {
            console.log("Erro ao salvar aluno:", error.message);
            Alert.alert("Erro", "Erro ao salvar aluno: " + error.message);
        }
    }

    async function setImage(img) {
        try{
            
            setImageUri(img.uri);
            setImagem64(img.base64)                    

        }
        catch(error){
            console.log("Erro ao selecionar imagem: " + error.message);
            Alert.alert("Erro ao selecionar imagem: " + error.message);
        }

    }






    return (

        <View>
            <ImageComponent
                value={imageUri}
                onChange={(img) => setImage(img)}
            />
        

            <InputTexComponent
                label="Nome"
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do aluno"
            />

            <InputTexComponent
                label="RA"
                value={ra}
                onChangeText={setRa}
                placeholder="Registro do aluno"
                keyboardType="numeric"
            />

            <ButtonComponent label="Salvar" pressFunction={saveAluno} />


        </View>

    )

}


