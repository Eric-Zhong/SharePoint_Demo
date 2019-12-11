import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListWithPagination2WebPartStrings';
import ListWithPagination2 from './components/ListWithPagination2';
import { IListWithPagination2Props } from './components/IListWithPagination2Props';

export interface IListWithPagination2WebPartProps {
  description: string;
}

export default class ListWithPagination2WebPart extends BaseClientSideWebPart<IListWithPagination2WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListWithPagination2Props > = React.createElement(
      ListWithPagination2,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
