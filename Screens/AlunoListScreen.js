import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";

export default function AlunoListScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
 

      <ButtonComponent
        label="Criar Aluno"
        pressFunction={() => navigation.navigate("AlunoEditorScreen")}
      />      

      <Text style={{ fontSize: 20 }}>Alunos Cadastrados</Text>
    </View>
  );
}
