import { useNavigation } from "@react-navigation/native";

import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export const Header = ({ showBackButton = false }: Props) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('groups');
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
};
