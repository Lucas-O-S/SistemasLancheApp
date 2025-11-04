import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function AlunoListScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate("AlunoEditorScreen")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Cadastrar Aluno</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 20 }}>Alunos Cadastrados</Text>
    </View>
  );
}
