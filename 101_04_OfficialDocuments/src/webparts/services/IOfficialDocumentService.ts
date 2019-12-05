export interface IOfficialDocumentService{
  readItems: (site: string, library: string) => Promise<any>
}
