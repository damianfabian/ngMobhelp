export type CreateSectionInput = {
    name: string;
    title: string;
    pages: Array<PageInfo | null>;
    description: string;
  };

export type PageInfo = {
    label: string;
    icon?: string | null;
    id: string;
    tabs?: Array<TabInfo | null> | null;
  };
  
  export type TabInfo = {
    label: string;
    template: string;
  };
  
  export type UpdateSectionInput = {
    name: string;
    title?: string | null;
    pages?: Array<PageInfo | null> | null;
    description?: string;
  };
  
  export type DeleteSectionInput = {
    name: string;
  };

  export type TableSectionsFilterInput = {
    name?: TableStringFilterInput | null;
    title?: TableStringFilterInput | null;
  };
  
  export type TableStringFilterInput = {
    ne?: string | null;
    eq?: string | null;
    le?: string | null;
    lt?: string | null;
    ge?: string | null;
    gt?: string | null;
    contains?: string | null;
    notContains?: string | null;
    between?: Array<string | null> | null;
    beginsWith?: string | null;
  };
  
  export type CreateSectionMutation = {
    __typename: "section";
    id: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };
  
  export type UpdateSectionMutation = {
    __typename: "section";
    id: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };
  
  export type DeleteSectionMutation = {
    __typename: "section";
    id: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };

  export type GetSectionsQuery = {
    __typename: "section";
    id: string;
    description: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };
  
  export type AllSectionsQuery = Array<{
    __typename: "section";
    id: string;
    description: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
    order: number;
  }>;
  
  export type ListSectionsQuery = {
    __typename: "sectionConnection";
    items: Array<{
      __typename: "section";
      id: string;
      description: string;
      name: string;
      title: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
    nextToken: string | null;
  };

  export type OnCreateSectionSubscription = {
    __typename: "section";
    id: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };
  
  export type OnUpdateSectionSubscription = {
    __typename: "section";
    id: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };
  
  export type OnDeleteSectionSubscription = {
    __typename: "section";
    id: string;
    name: string;
    title: string;
    pages: Array<{
      __typename: "Page";
      label: string;
      icon: string | null;
      id: string;
      tabs: Array<TabInfo | null> | null;
    } | null> | null;
  };