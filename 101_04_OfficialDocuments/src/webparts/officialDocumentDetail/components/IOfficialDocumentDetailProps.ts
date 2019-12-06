import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IOfficialDocumentDetailProps {
  context: IWebPartContext;
  siteUri: string;
  libraryTitle: string;
  id: string;
}
