export interface IOfficialDocumentService{
  readItems: (site: string, library: string) => Promise<any>;
  readContent: (site: string, library: string, id: string) => Promise<any>;
}
