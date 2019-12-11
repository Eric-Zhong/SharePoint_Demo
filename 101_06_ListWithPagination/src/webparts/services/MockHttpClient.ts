import { IItem } from '../interfaces/IDataFieldInterfaces';


export default class MockHttpClient {

  private static _items: IItem[] = [
    { Id: 1, Name: 'A', Code: 'B' },
    { Id: 2, Name: 'A', Code: 'B' },
    { Id: 3, Name: 'A', Code: 'B' },
    { Id: 4, Name: 'A', Code: 'B' },
    { Id: 5, Name: 'A', Code: 'B' },
    { Id: 6, Name: 'A', Code: 'B' },
    { Id: 7, Name: 'A', Code: 'B' },
  ];

  public static get(restUrl: string): Promise<IItem[]> {
    return new Promise<IItem[]>((resolve) => {
      resolve()
    });
  }
}