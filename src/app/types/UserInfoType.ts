export type CreateUserInfoInput = {
    id: string;
    topics: Array<TopicInput | null>;
    preferences: PreferenceInput | null;
};

export type PreferenceInput = {
    sections: Array<String>
};

export type TopicInput = {
    id?: string | null;
    isDone?: boolean | null;
};

export type UpdateUserInfoInput = {
    id: string;
    topics: Array<TopicInput | null>;
    preferences: PreferenceInput | null;
};

export type DeleteUserInfoInput = {
    id: string;
};

export type CreateUserInfoMutation = {
    // Key attributes. Changing these may result in unexpected behavior.
    id: string;
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
    preferences: PreferenceInput | null;
  };
  
  export type UpdateUserInfoMutation = {
    // Key attributes. Changing these may result in unexpected behavior.
    id: string;
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
    preferences: PreferenceInput | null;
  };
  
  export type DeleteUserInfoMutation = {
    // Key attributes. Changing these may result in unexpected behavior.
    id: string;
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
  };

  export type GetUserInfosQuery = {
    // Key attributes. Changing these may result in unexpected behavior.
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
    preferences: PreferenceInput | null;
  };
  
  export type ListUserInfosQuery = {
    items: Array<{
      __typename: "section";
      id: string;
      name: string;
      title: string;
  
    } | null> | null;
    nextToken: string | null;
  };

  export type OnCreateUserInfoSubscription = {
    // Key attributes. Changing these may result in unexpected behavior.
    id: string;
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
  };
  
  export type OnUpdateUserInfoSubscription = {
    // Key attributes. Changing these may result in unexpected behavior.
    id: string;
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
  };
  
  export type OnDeleteUserInfoSubscription = {
    // Key attributes. Changing these may result in unexpected behavior.
    id: string;
    topics: Array<{
      id: string | null;
      isDone: boolean | null;
    } | null>;
  };