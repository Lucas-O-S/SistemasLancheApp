import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { TextInput } from "react-native-paper";
import AlunoModel from "../Models/AlunoModel";


export function AlunoEditorScreen({navigation, route}){

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [foto, setFoto] = useState(null);

    let alunoModel =  route.params?.aluno ?? new AlunoModel();
    
    useFocusEffect(
        useCallback(()=>{
            if(alunoModel){
                setId(alunoModel.id);
                setNome(alunoModel.nome);
                setRa(alunoModel.ra);
            }
        }, [alunoModel])
    )




    return (

        <View>
            <Text>Nome</Text>
            <TextInput />

        </View>

    )

}