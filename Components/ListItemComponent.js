import { View } from "react-native";


export function ListItemComponent({component, editScreen, deleteScreen}){


    return(
        <View>
            <TouchableOpacity  onPress={editScreen}>
                {component}
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteScreen}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )

}