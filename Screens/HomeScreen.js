import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 10,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("AlunoListScreen")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Alunos</Text>
      </TouchableOpacity>
    </View>
  );
}
