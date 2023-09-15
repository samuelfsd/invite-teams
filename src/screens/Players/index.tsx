import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Text, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGroupAndTeam";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

export const Players = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const { group } = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const handleAddNewPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova pessoa", "Informe um nome válido");
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName("");
      getPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar");
      }
    }
  };

  const getPlayersByTeam = async () => {
    try {
      setLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      setLoading(false);
    } catch (error) {
      Alert.alert("Nova pessoa", "Não foi possível listar as pessoas");
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);
      getPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover pessoa", "Não foi possível remover esta pessoa");
      Toast.show({
        type: "error",
        text1: "Não foi possivel remover essa pessoa!",
      });
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover o grupo");
    }
  };

  const handleRemoveGroup = async () => {
    Alert.alert("Remover", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ]);
  };

  useEffect(() => {
    getPlayersByTeam(team);
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times!!"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddNewPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              isActive={item === team}
              title={item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há jogadores nesse time?" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};
