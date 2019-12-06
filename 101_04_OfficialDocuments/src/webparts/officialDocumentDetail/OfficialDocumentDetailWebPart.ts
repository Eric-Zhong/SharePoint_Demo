import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'OfficialDocumentDetailWebPartStrings';
import OfficialDocumentDetail from './components/OfficialDocumentDetail';
import { IOfficialDocumentDetailProps } from './components/IOfficialDocumentDetailProps';
import { objectDefinedNotNull, stringIsNullOrEmpty} from '@pnp/common';
import Welcome from './components/Welcome';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library'

export interface IOfficialDocumentDetailWebPartProps {
}

export default class OfficialDocumentDetailWebPart extends BaseClientSideWebPart<IOfficialDocumentDetailWebPartProps> {

  public render(): void {

    let element: React.ReactElement<any>;   // 因为也不知道要 render 哪个，所以用 any

    // 需要获取 URL 输入的参数
    let siteUri: string, libraryTitle: string, id: string;

    let queryParameters = new UrlQueryParameterCollection(window.location.href);

    siteUri = queryParameters.getValue("p_site");
    libraryTitle = queryParameters.getValue("p_library");
    id = queryParameters.getValue("p_id");

    if(stringIsNullOrEmpty(id)){
      element = React.createElement(Welcome);
    }
    else{
      element = React.createElement<IOfficialDocumentDetailProps>(
        OfficialDocumentDetail,
        {
          context: this.context,
          siteUri: siteUri,
          libraryTitle: libraryTitle,
          id: id
        }
      );
    }

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
