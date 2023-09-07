import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { KeyboardAvoidingView, KeyboardAvoidingViewBase } from "react-native";

export const NewGroup = () => {
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState("");

  const handleNew = () => {
    navigation.navigate("players", { group: groupName });
  };

  return (
    <Container>
      <Header showBackButton />

      <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
