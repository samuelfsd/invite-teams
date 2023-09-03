import { Text } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Form, Content } from "./styles";

export const Players = () => {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times!!"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <Content>
        <Text>TIME A | TIME B</Text>
      </Content>
      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
};
