import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'RichEditorWebPartWebPartStrings';
import RichEditorWebPart from './components/RichEditorWebPart';
import { IRichEditorWebPartProps } from './components/IRichEditorWebPartProps';

export interface IRichEditorWebPartWebPartProps {
  description: string;
}

export default class RichEditorWebPartWebPart extends BaseClientSideWebPart<IRichEditorWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRichEditorWebPartProps > = React.createElement(
      RichEditorWebPart,
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
