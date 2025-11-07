import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";
import { useFocusEffect } from "@react-navigation/native";
import LoadingOverlay from "../Components/LoadingOverlay";
import AlunoController from "../Controller/Aluno.Controller";
import { ListItemComponent } from "../Components/ListItemComponent";
import { List } from "react-native-paper";
import Component from "react-native-paper/lib/typescript/components/List/ListItem";

export default function AlunoListScreen({ navigation }) {
  const [listaAlunos, setListaAlunos] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const alunos = await AlunoController.findAll();
        setListaAlunos(alunos);
      }
      loadData();
    }, [])
  );

  async function findAll() {
    setLoading(true);
    
    try {
      se

    } 
    catch (error) {

      console.log("Erro ao buscar alunos:", error);
      return [];
    
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <ButtonComponent
          label="Criar Aluno"
          pressFunction={() => navigation.navigate("AlunoEditorScreen")}
        />

        <Text style={{ fontSize: 20, marginTop: 20 }}>Alunos Cadastrados</Text>

        {listaAlunos.length > 0 ? (
          listaAlunos.map((aluno) => (
            <ListItemComponent key={aluno.id}>
              <Text>Nome: {aluno.nome}</Text>
              <Text>RA: {aluno.ra}</Text>
            </ListItemComponent>
          ))
        ) : (
          !loading && <Text style={{ marginTop: 20 }}>Nenhum aluno encontrado.</Text>
        )}
      </ScrollView>

      <LoadingOverlay visible={loading} message="Buscando alunos..." />
    </View>
  );
}
