import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 32px 16px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
