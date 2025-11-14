import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, ScrollView, Text} from "react-native"
import { LancheController } from "../Controller/Lanche.Controller";
import InputDateComponent from "../Components/InputDateComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { ListItemComponent } from "../Components/ListItemComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import { Alert } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';



export function ListaLancheEntregueScreen({navigation}){

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

    useState(() => {
        let timeout;
        async function feachData(){
            if (buscado){
               await getLanches();

            }

            timeout = setTimeout(() =>{
                feachData()
            },60000)

        }

        return () => clearTimeout(timeout);
    },[dataLiberacao])

    async function getLanches(){
        try{
            setLoading(true)

            const tempLancheList = await LancheController.findAllByFilter(true, dataLiberacao );

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
                            />

                        )) :

                        <Text>Nada foi Encontrado</Text>

                }

            </ScrollView>
            
            <LoadingOverlay visible={loading} message="Carregando Dados..." />
            
        </View>
    )
}

