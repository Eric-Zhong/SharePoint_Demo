import { ICreateItemService } from "./ICreateItemService";
import { SPHttpClient } from "@microsoft/sp-http";

export class CreateItemService implements ICreateItemService{


  private spHttpClient: SPHttpClient;

  constructor(spHttpClient?: SPHttpClient) {
    this.spHttpClient = spHttpClient;
  }


  public async create() : Promise<any>{

    let url = "http://ericsvr/sites/develop/_api/web/lists/GetByTitle('issues')/items";
    // let url = "http://ericsvr/sites/develop/_api/web/lists/GetByTitle('officialdocuments')/items";

    let listOption = { url: `http://ericsvr/sites/develop/_api/web/lists/GetByTitle('issues')/items`, type: 'SP.Data.IssuesListItem'}

const body: string = JSON.stringify({
  '__metadata': {
    'type': listOption.type     // get type by http://ericsvr/sites/develop/_api/web/lists/GetByTitle('issues')?$select=ListItemEntityTypeFullName
  },
  'Title': `Item ${new Date()}`, // Item's properties
  'Body': `<h1>Hello world</h1>`
});

    try {

const response = await this.spHttpClient.post(listOption.url, SPHttpClient.configurations.v1,
  {
    headers: {
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'odata-version': '3.0'
    },
    body: body
  }
);

      const jsonContext: any = await response.json();
      let result = {};
      result = jsonContext;

      console.log(result);

      return result;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }
}
