declare interface IListWithPaginationWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ListWithPaginationWebPartStrings' {
  const strings: IListWithPaginationWebPartStrings;
  export = strings;
}
