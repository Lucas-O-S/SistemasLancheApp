import React, { useCallback, useState } from "react";
import ButtonComponent from "../Components/ButtonComponent";
import { useFocusEffect } from "@react-navigation/native";
import LoadingOverlay from "../Components/LoadingOverlay";
import AlunoController from "../Controller/Aluno.Controller";
import { ListItemComponent } from "../Components/ListItemComponent";
import { View, Text , StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";

export default function AlunoListScreen({ navigation }) {
  const [listaAlunos, setListaAlunos] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      
      let timeout;

      async function loadData() {
        await findAll();
        timeout = setTimeout(loadData, 60000);
      }

      loadData();

      return () => {
        clearTimeout(timeout);
      };

    }, [])
  );

  async function findAll() {
    
    try {
        setLoading(true);
        const alunos = await AlunoController.findAll();
        setListaAlunos(alunos);
    } 
    catch (error) {

      console.log("Erro ao buscar alunos:", error);

    
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
           
            <ListItemComponent
           
            key = {aluno.id}
           
            content={() => (
           
            <>
        
              <Text>Nome: {aluno.nome}</Text>
              <Text>RA: {aluno.ra}</Text>
           
            </>
            
          )}
              editFunction={() => navigation.navigate("AlunoEditorScreen", {id : aluno.id})}
              
              deleteFunction={() => AlunoController.delete(aluno.id)}
            
              deleteButtomLabel={"Deletar"}

            /> 
          
          ))
        ) : (

          
          !loading && <Text style={{ marginTop: 20 }}>Nenhum aluno encontrado.</Text>
        
        )}
      </ScrollView>

      <LoadingOverlay visible={loading} message="Buscando alunos..." />
    </View>
  );
}
