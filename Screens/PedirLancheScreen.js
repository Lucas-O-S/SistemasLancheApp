import { ScrollView } from "react-native";
import InputDateComponent from "../Components/InputDateComponent";
import { useState } from "react";


export default function PedirLancheScreen({navigation}){

    const [date, setDate] = useState("")

    return(
        <ScrollView>
            <InputDateComponent
                label={"Data de Liberação"}
                value={date}
                onChangeText={setDate}
                placeholder={"Escolha um data de Liberação"}
            />
        </ScrollView>
    )
}