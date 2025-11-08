import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState, useRef  } from "react";
import { View, ScrollView} from "react-native";
import { Alert } from "react-native";
import InputTexComponent from "../Components/InputTextComponent";
import ImageComponent from "../Components/ImageComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import AlunoModel from "../Models/AlunoModel";
import AlunoController from "../Controller/Aluno.Controller";
import ImageHelper from "../utils/ImageHelper";

export default function AlunoEditorScreen({navigation, route}){

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [imagemUri, setImagemUri] = useState(null);
    const [imagem64, setImagem64] = useState(null);
    const [loading, setLoading] = useState(false); 

    let alunoId =  route.params?.id ?? null;
    const currentImageUriRef = useRef(null);

    useFocusEffect(
        useCallback(()=>{
            setLoading(true);

            console.log("id = " + alunoId)

            async function fetchData(id) {
                if(id){
                    try{
                        

                        const aluno = await AlunoController.findOne(alunoId);
                        
                        setImagem64(aluno.imagem64);
                        
                        const newUri = await ImageHelper.convertBase64ToUri(aluno.imagem64);
                        currentImageUriRef.current = newUri;
                        setImagemUri(newUri);

                        setNome(aluno.nome);
                        setId(alunoId);
                        setRa(aluno.ra);

                    }
                    catch(Error){
                        console.log(Error.message);
                    }
                    finally{
                        setLoading(false);

                    }

                }
            }

            fetchData(alunoId);
            return () => {
                if (currentImageUriRef.current) {
                    ImageHelper.deleteUri(currentImageUriRef.current);
                    currentImageUriRef.current = null;
                }
            };

        },[alunoId])
    )



    async function saveAluno() {        
        try {
            setLoading(true);

            const alunoModel = new AlunoModel();

            if(alunoId) alunoModel.id = alunoId; 
            alunoModel.nome = nome;
            alunoModel.ra = ra;
            alunoModel.imagemFile = await ImageHelper.convertUriToFile(imagemUri);
            
            await AlunoController.saveAluno(alunoModel);

            Alert.alert("Sucesso", "Aluno salvo com sucesso!");


            navigation.goBack();
        } catch (error) {
            console.log("Erro ao salvar aluno:", error.message);
            Alert.alert("Erro", "Erro ao salvar aluno: " + error.message);
        }
        finally{
            setLoading(false); 
        }
    }

    async function setImage(img) {
        try{
            if (currentImageUriRef.current) {
                await ImageHelper.deleteUri(currentImageUriRef.current);
            }
            setImagemUri(img.uri);
            setImagem64(img.base64) 
            currentImageUriRef.current = img.uri;
                   

        }
        catch(error){
            console.log("Erro ao selecionar imagem: " + error.message);
            Alert.alert("Erro ao selecionar imagem: " + error.message);
        }

    }






    return (

        <View style={{ flex: 1 }}>
            <ScrollView>
                <ImageComponent
                    value={imagemUri}
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



            </ScrollView>

            <LoadingOverlay visible={loading} message="Salvando aluno..." />
        
        </View>
       

    )

}


