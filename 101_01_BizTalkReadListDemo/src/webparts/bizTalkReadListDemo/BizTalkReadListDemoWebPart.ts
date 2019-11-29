import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './BizTalkReadListDemoWebPart.module.scss';
import * as strings from 'BizTalkReadListDemoWebPartStrings';

// import mock data generator
import MockHttpClient from './MockHttpClient';

// import SharePoint Framework Library
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

// import SharePoint Library
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';


export interface IHelloWorld191129WebPartProps {
  description: string;
}


export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}


export interface IBizTalkReadListDemoWebPartProps {
  description: string;
}

export default class BizTalkReadListDemoWebPart extends BaseClientSideWebPart<IBizTalkReadListDemoWebPartProps> {

  // Get mock list data for demo
  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  // Get realized list data by SPFx
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // After get list data, render the html for display them
  private _renderList(items: ISPList[]): void {
    let html: string = '';
    items.forEach((item: ISPList) => {
      html += `
    <ul class="${styles.list}">
      <li class="${styles.listItem}">
        <span class="ms-font-l">${item.Title}</span>
      </li>
    </ul>`;
    });

    // call html DOM select and set the data to the DIV tag.
    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }


  private _renderListAsync(): void {
    // Local environment
    // If you add this webpart by "localhost/workbench.aspx", get the data from mock function.
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    }
    // if you add this webpart by "http://server/_layouts/15/workbench.aspx", query the list from the SharePoint API
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
  }





  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.bizTalkReadListDemo}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle}">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description}">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button}">
                <span class="${ styles.label}">Learn more</span>
              </a>
            </div>
          </div>
          <div id="spListContainer" />
          </div>
      </div>`;
    this._renderListAsync();

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
