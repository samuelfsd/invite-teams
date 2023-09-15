import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { AppError } from "@utils/AppError";
import { groupCreate } from "@storage/group/groupCreate";

import { Container, Content, Icon } from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const NewGroup = () => {
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState("");

  const handleNew = async () => {
    try {
      if (groupName.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma. ");
      }

      await groupCreate(groupName);
      navigation.navigate("players", { group: groupName });
      Toast.show({
        type: "success",
        text1: "Sucesso ao criar uma turma!",
      });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
      }
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Content behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroupName} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
};
