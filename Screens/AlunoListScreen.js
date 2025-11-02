import { TouchableOpacity } from "react-native";
import { View } from "react-native/types_generated/index";



export default function AlunoListScreen({navigation}) {


    return (
        <View>
            <TouchableOpacity onPress={navigation.navigate("AlunoEditorScreen")}>
                <Text>Cadastrar Aluno</Text>
            </TouchableOpacity>
            <Text>Alunos Cadastrados</Text>



        </View>
    );


}