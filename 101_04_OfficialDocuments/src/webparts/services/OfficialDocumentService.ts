import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { stringIsNullOrEmpty } from '@pnp/common';
import { IOfficialDocumentService } from './IOfficialDocumentService';

export class OfficialDocumentService implements IOfficialDocumentService {

  private spHttpClient: SPHttpClient;

  constructor(spHttpClient?: SPHttpClient) {
    this.spHttpClient = spHttpClient;
  }

  public async readItems(site: string, library: string): Promise<any> {

    let url = "http://ericsvr/sites/develop/_api/web/lists/GetByTitle('officialdocuments')/items";
    try {
      const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        }
      );

      const jsonContext: any = await response.json();
      let result = {};
      result = jsonContext;
      return result;
    }
    catch (error) {
      return error;
    }
  }


  public async readContent(site: string, library: string, id: string): Promise<any> {
    let url = "http://ericsvr/sites/develop/_api/web/lists/GetByTitle('officialdocuments')/items(" + id + ")?$expand=file";
    try {
      const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        }
      );

      const jsonContext: any = await response.json();
      let result = {};
      result = jsonContext;
      return result;
    }
    catch (error) {
      return error;
    }
  }

}












