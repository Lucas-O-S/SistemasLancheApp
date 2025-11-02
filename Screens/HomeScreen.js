import { TouchableOpacity } from "react-native";
import { View } from "react-native/types_generated/index";


export default function HomeScreen ({navigation}) {


    return (

        <View>

            <Text>Home Screen</Text>
            
            <View>
                <TouchableOpacity onPress={navigation.navigate("AlunoListScreen") }>
                    <Text>Alunos</Text>
                </TouchableOpacity>
            </View>
        
        </View>




    );
}
