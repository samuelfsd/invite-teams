export type RootParamList = {
  groups: undefined;
  new: undefined;
  players: {
    group: string;
  };
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      new: undefined;
      players: {
        groups: string;
      };
    }
  }
}
