import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListWithPaginationWebPartStrings';
import ListWithPagination from './components/ListWithPagination';
import { IListWithPaginationProps } from './components/IListWithPaginationProps';

export interface IListWithPaginationWebPartProps {
  description: string;
}

export default class ListWithPaginationWebPart extends BaseClientSideWebPart<IListWithPaginationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListWithPaginationProps > = React.createElement(
      ListWithPagination,
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
