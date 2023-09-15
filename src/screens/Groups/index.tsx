import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { groupsGetAll } from "@storage/group/groupsGetAll";

import { ButtonContainer, Container, Text } from "./styles";
import { Loading } from "@components/Loading";

export const Groups = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const getGroupsByStorage = async () => {
    try {
      setLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas");
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

      {loading ? (
        <Loading />
      ) : (
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
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
