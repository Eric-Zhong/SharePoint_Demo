import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { reject } from 'lodash';
import { IListService, IImage } from '../Interfaces';
import { sp, spODataEntityArray, Item } from "@pnp/sp";
import Constants from '../Common/constants';
import { stringIsNullOrEmpty } from '@pnp/common';

/**
 * 定义获取List数据的Service
 */
export class ListService implements IListService {

    private spHttpClient: SPHttpClient;

    /**
     * 构造函数
     * @param spHttpClient SPHttpClient对象
     */
    constructor(spHttpClient?: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }

    /**
     * 读取List下Item数据
     * @param url List列表的URL
     */
    public async readItems(url: string): Promise<any> {
        try {

            // 通过 Get 请求，获取数据
            const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1,
                {
                    headers: {
                        'Accept': 'application/json;odata=nometadata',
                        'odata-version': ''
                    }
                }
            );

            // 从 Response 中获取 JSON 数据
            const items: any = await response.json();

            let result = {};

            // 如果获取到了数据，就对result进行初始化赋值
            if (items.value.length) {
                result = {
                    items: items.value,
                    nextLink: items["odata.nextLink"]
                }

            }
            else {
                result = null;
            }
            return result;

        }
        catch (error) {
            return error;
        }

        // return new Promise<any>(async (resolve) => {

        //     this.spHttpClient.get(url, SPHttpClient.configurations.v1,
        //         {
        //           headers: {
        //             'Accept': 'application/json;odata=nometadata',
        //             'odata-version': ''
        //           }
        //         }).then((response: SPHttpClientResponse): Promise<{ value: number }> => {
        //           return response.json();
        //         }).then((response: { value: number }): void => {

        //             resolve(response.value);
        //         });

        //     });

    }

    /**
     * 获取 List 中 Item 的数量
     * @param url List的URL
     */
    public async getListItemsCount(url: string): Promise<any> {
        try {

            const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1,
                {
                    headers: {
                        'Accept': 'application/json;odata=nometadata',
                        'odata-version': ''
                    }
                });

            const result: any = await response.json();

            return result.value;


        }
        catch (error) {
            return error;
        }

        // return new Promise<any>(async (resolve) => {

        //     this.spHttpClient.get(url, SPHttpClient.configurations.v1,
        //         {
        //           headers: {
        //             'Accept': 'application/json;odata=nometadata',
        //             'odata-version': ''
        //           }
        //         }).then((response: SPHttpClientResponse): Promise<{ value: number }> => {
        //           return response.json();
        //         }).then((response: { value: number }): void => {

        //             resolve(response.value);
        //         });

        //     });

    }

}












