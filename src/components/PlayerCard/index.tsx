import { ButtonIcon } from "@components/ButtonIcon";

type Props = {
  name: string;
  onRemove: () => void;
};

import { Container, Icon, Title } from "./styles";

export const PlayerCard = ({ name, onRemove }: Props) => {
  return (
    <Container>
      <Icon name="person" />
      <Title>{name}</Title>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
};
