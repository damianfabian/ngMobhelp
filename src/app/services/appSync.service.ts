/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import PubSub from '@aws-amplify/pubsub';
import * as Observable from "zen-observable";
import { GetSectionsQuery, AllSectionsQuery, OnCreateSectionSubscription, CreateSectionInput, CreateSectionMutation, UpdateSectionInput, UpdateSectionMutation, DeleteSectionInput, DeleteSectionMutation, TableSectionsFilterInput, ListSectionsQuery, OnUpdateSectionSubscription, OnDeleteSectionSubscription } from '../types/SectionType';
import { GetUserInfosQuery, CreateUserInfoInput, CreateUserInfoMutation, UpdateUserInfoInput, UpdateUserInfoMutation, DeleteUserInfoInput, DeleteUserInfoMutation, ListUserInfosQuery, OnCreateUserInfoSubscription, OnUpdateUserInfoSubscription, OnDeleteUserInfoSubscription } from '../types/UserInfoType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class AppSyncService {
  configure(accessToken){
    const awsConfig = Object.assign({}, environment, { graphql_headers: async () => ({ 'Authorization': accessToken }) });
    API.configure(awsConfig);
    PubSub.configure(awsConfig);
  }
  async CreateSection(
    input: CreateSectionInput
  ): Promise<CreateSectionMutation> {
    const statement = `mutation CreateSection($input: CreateSectionInput!) {
        createSection(input: $input) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateSectionMutation>response.data.createSection;
  }
  async UpdateSection(
    input: UpdateSectionInput
  ): Promise<UpdateSectionMutation> {
    const statement = `mutation UpdateSection($input: UpdateSectionInput!) {
        updateSection(input: $input) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateSectionMutation>response.data.updateSection;
  }
  async DeleteSection(
    input: DeleteSectionInput
  ): Promise<DeleteSectionMutation> {
    const statement = `mutation DeleteSection($input: DeleteSectionInput!) {
        deleteSection(input: $input) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteSectionMutation>response.data.deleteSection;
  }
  async CreateUserInfo(
    input: CreateUserInfoInput
  ): Promise<CreateUserInfoMutation> {
    const statement = `mutation CreateUserInfo($input: CreateUserInfoInput!) {
        createUserInfo(input: $input) {
          id
          topics {
            id
            isDone
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserInfoMutation>response.data.createUserInfo;
  }
  async UpdateUserInfo(
    input: UpdateUserInfoInput
  ): Promise<UpdateUserInfoMutation> {
    const statement = `mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
        updateUserInfo(input: $input) {
          id
          topics {
            id
            isDone
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserInfoMutation>response.data.updateUserInfo;
  }
  async DeleteUserInfo(
    input: DeleteUserInfoInput
  ): Promise<DeleteUserInfoMutation> {
    const statement = `mutation DeleteUserInfo($input: DeleteUserInfoInput!) {
        deleteUserInfo(input: $input) {
          id
          topics {
            id
            isDone
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserInfoMutation>response.data.deleteUserInfo;
  }
  async GetSections(name: string): Promise<GetSectionsQuery> {
    const statement = `query GetSections($name: String!) {
        getSections(name: $name) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      name
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSectionsQuery>response.data.getSections;
  }
  async AllSections(): Promise<AllSectionsQuery> {
    const statement = `query AllSections {
        allSections {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <AllSectionsQuery>response.data.allSections;
  }
  async ListSections(
    filter?: TableSectionsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSectionsQuery> {
    const statement = `query ListSections($filter: TableSectionsFilterInput, $limit: Int, $nextToken: String) {
        listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            name
            title
            tabs {
              label
              template
            }
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListSectionsQuery>response.data.listSections;
  }
  async GetUserInfos(id: string): Promise<GetUserInfosQuery> {
    const statement = `query GetUserInfos($id: String!) {
        getUserInfos(id: $id) {
          id
          topics {
            id
            isDone
          }
          preferences {
            sections
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserInfosQuery>response.data.getUserInfos;
  }
  async ListUserInfos(
    filter?: TableSectionsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUserInfosQuery> {
    const statement = `query ListUserInfos($filter: TableSectionsFilterInput, $limit: Int, $nextToken: String) {
        listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            topics {
              id
              isDone
            }
            preferences {
              sections
            }
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUserInfosQuery>response.data.listUserInfos;
  }
  OnCreateSectionListener: Observable<
    OnCreateSectionSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateSection($name: String, $title: String, $pages: PageInfo) {
        onCreateSection(name: $name, title: $title, pages: $pages) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`
    )
  ) as Observable<OnCreateSectionSubscription>;

  OnUpdateSectionListener: Observable<
    OnUpdateSectionSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateSection($name: String, $title: String, $pages: PageInfo) {
        onUpdateSection(name: $name, title: $title, pages: $pages) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`
    )
  ) as Observable<OnUpdateSectionSubscription>;

  OnDeleteSectionListener: Observable<
    OnDeleteSectionSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteSection($name: String, $title: String, $pages: PageInfo) {
        onDeleteSection(name: $name, title: $title, pages: $pages) {
          id
          name
          title
          pages {
            label
            icon
            id
            tabs {
              label
              template
            }
          }
        }
      }`
    )
  ) as Observable<OnDeleteSectionSubscription>;

  OnCreateUserInfoListener: Observable<
    OnCreateUserInfoSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUserInfo($id: String, $topics: [TopicInput]) {
        onCreateUserInfo(id: $id, topics: $topics) {
          id
          topics {
            id
            isDone
          }
        }
      }`
    )
  ) as Observable<OnCreateUserInfoSubscription>;

  OnUpdateUserInfoListener: Observable<
    OnUpdateUserInfoSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUserInfo($id: String, $topics: [TopicInput]) {
        onUpdateUserInfo(id: $id, topics: $topics) {
          id
          topics {
            id
            isDone
          }
        }
      }`
    )
  ) as Observable<OnUpdateUserInfoSubscription>;

  OnDeleteUserInfoListener: Observable<
    OnDeleteUserInfoSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUserInfo($id: String, $topics: [TopicInput]) {
        onDeleteUserInfo(id: $id, topics: $topics) {
          id
          topics {
            id
            isDone
          }
        }
      }`
    )
  ) as Observable<OnDeleteUserInfoSubscription>;
}
