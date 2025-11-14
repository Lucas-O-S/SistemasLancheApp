import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Text} from "react-native"
import { LancheController } from "../Controller/Lanche.Controller";
import InputDateComponent from "../Components/InputDateComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { ListItemComponent } from "../Components/ListItemComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import { Alert } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';


export default function ListaLancheNaoEntregueScreen({navigation}){

    const [lancheList,setLancheList] = useState([])
    const [dataLiberacao,setDataLiberacao] = useState([])
    const [buscado, setBuscado] = useState(false)
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

            return () => {
                ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            };
        }, [])
    );

    useEffect(() => {

        let timeout

        async function feachData(){
            if (buscado){
               await getLanches();

            }

            timeout = setTimeout(() =>{
                feachData()
            },60000)

        }
        
        feachData()

        return () => clearTimeout(timeout);

    },[dataLiberacao])

    async function getLanches(){
        try{
            setLoading(true)

            const tempLancheList = await LancheController.findAllByFilter(false, dataLiberacao );

            setLancheList(tempLancheList);

            setBuscado(true);

        }
        catch(error){
           
            setBuscado(false);
            
            console.log("Erro ao buscar lanche: " + error.message);
            Alert.alert("Erro ao buscar lanche: " + error.message);
        
        }
        finally{
            setLoading(false)
        }
        
    }


    return (
        <View>
            <ScrollView>

                <InputDateComponent
                    label={"Data de Liberação"}
                    value={dataLiberacao}
                    onChangeText={setDataLiberacao}
                    placeholder={"Escolha uma Data"}
                />

                <ButtonComponent
                    pressFunction={async () => getLanches() }
                    label={"BUSCAR"}
                />
                
                {
                    (buscado && lancheList.length > 0) ? 

                        lancheList.map((lanche,index) => (
                            
                            <ListItemComponent
                                key={index}
                                content={() =>(
                                    <>
                                        <Text>{lanche.alunoModel.nome} - {lanche.alunoModel.ra} - {lanche.dataLiberacao} </Text>
                                    </>
                                )}
                                deleteFunction={() => LancheController.lancheEntregue(lanche.id)}
                                confirmationMessage="Deseja confirmar a entrega?"
                                confirmationMessageTitle="Confirmar Entrega"
                                deleteButtomLabel={"Entregar Lanche"}
                            />

                        )) :

                        <Text>Nada foi Encontrado</Text>

                }

            </ScrollView>
            
            <LoadingOverlay visible={loading} message="Carregando Dados..." />
            
        </View>
    )
}

