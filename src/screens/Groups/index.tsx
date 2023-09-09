import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { groupsGetAll } from "@storage/group/groupsGetAll";

import { ButtonContainer, Container, Text } from "./styles";

export const Groups = () => {
  const navigation = useNavigation();

  const [groups, setGroups] = useState<string[]>([]);

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const getGroupsByStorage = async () => {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      getGroupsByStorage();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma!" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há nenhuma turma cadastrada, que tal cadastrar uma?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
