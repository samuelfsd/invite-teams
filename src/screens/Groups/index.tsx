import { Container, Text } from "./styles";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";

export const Groups = () => {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma!" />
    </Container>
  );
};
