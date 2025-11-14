import { ScrollView, View, Alert} from "react-native";
import InputDateComponent from "../Components/InputDateComponent";
import { useCallback, useState } from "react";
import { ComboBoxComponent } from "../Components/ComboBoxComponent";
import AlunoController from "../Controller/Aluno.Controller";
import InputTextComponent from "../Components/InputTextComponent";
import { useFocusEffect } from "@react-navigation/native";
import LoadingOverlay from "../Components/LoadingOverlay";
import ButtonComponent from "../Components/ButtonComponent";
import LancheModel from "../Models/LancheModel";
import { LancheController } from "../Controller/Lanche.Controller";


export default function PedirLancheScreen({navigation}){

    const [date, setDate] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [alunoId, setAlunoId] = useState(null);
    const [raList, setRaList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            async function startScreen(){
                await getAlunos();

                setTimeout(() => startScreen(), 60000)
            }

            startScreen();


        },[])
    );

    async function getAlunos() {
        
        try{
            setLoading(true)

            const alunosList = await AlunoController.findAll();
            
            let tempList = [];

            alunosList.forEach((aluno) => {
            
                tempList.push({
                    label : aluno.ra,
                    value : aluno.id
            
                })
            
            })

            setRaList(tempList);

        }
        catch(error){
            console.log("Erro ao buscar alunos: " + error.message);
            Alert.alert("Erro ao buscar alunos: " + error.message);
        }
        finally{
            setLoading(false)
        }


    }

    async function savelLanche() {
        try{
            setLoading(false)
            
            const lancheModel = new LancheModel({});
            
            lancheModel.alunoId = alunoId;
            
            lancheModel.quantidade = quantidade;
                        
            lancheModel.dataLiberacao = date;
            
            await LancheController.saveLanche(lancheModel)
        
            Alert.alert("Sucesso", "Lanche salvo com sucesso!");

            navigation.goBack();

        }
        catch(error){
            console.log("Erro ao salvar lanche: " + error.message);
            Alert.alert("Erro ao salvar lanche: " + error.message);
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <View>

            <ScrollView>

                <ComboBoxComponent
                    label={"RA do Aluno"}
                    placeHolder={{label: "Escolha o RA do Aluno", value: null}}
                    onChange={(setAlunoId)}
                    items={raList}
                />

                <InputTextComponent
                    label={"Quantidade de Lanches"}
                    onChangeText={setQuantidade}
                    value={quantidade}
                    placeholder={"digite o numero de lanches que deseja"}
                    keyboardType="numeric"
                />
                
                
                <InputDateComponent
                    label={"Data de Liberação"}
                    value={date}
                    onChangeText={setDate}
                    placeholder={"Escolha um data de Liberação"}
                />

                <ButtonComponent
                    label={"Salvar Pedido de Lanche"}
                    pressFunction={async () => await savelLanche()}
                />
                
            </ScrollView>
            
            <LoadingOverlay visible={loading} message="Carregando Dados..." />
       
        </View>    
    )
}