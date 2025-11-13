import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import CustomAlert from "./CustomAlert";

export function ListItemComponent({ content, editFunction, deleteFunction }) {
  const [alertVisible, setAlertVisible] = useState(false);

  function callDelete() {
    setAlertVisible(true);
  }

  return (
    <View>
      <TouchableOpacity onPress={editFunction}>
        {content && content()}
      </TouchableOpacity>

    {
      deleteFunction && 

      <TouchableOpacity onPress={callDelete}>
        <Text>Deletar</Text>
      </TouchableOpacity>

    }

      <CustomAlert
        visible={alertVisible}
        title="Confirmar exclusão"
        message="Deseja realmente excluir?"
        onCancel={() => setAlertVisible(false)}
        onConfirm={async () => {
          await deleteFunction();
          setAlertVisible(false);
        }}
      />
    </View>
  );
}
