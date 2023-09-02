import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";

import { Container, Content, Icon } from "./styles";

export const NewGroup = () => {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma turma para adicionar as pessoas"
        />

        <Button title="Criar" />
      </Content>
    </Container>
  );
};
