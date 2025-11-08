import { View, TouchableOpacity, Text } from "react-native";

export function ListItemComponent({content, editScreen, deleteScreen }) {
  return (
    <View>
      <TouchableOpacity onPress={editScreen}>
        {content && content()}
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteScreen}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
