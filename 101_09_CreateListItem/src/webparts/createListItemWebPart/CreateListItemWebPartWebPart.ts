import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CreateListItemWebPartWebPartStrings';
import CreateListItemWebPart from './components/CreateListItemWebPart';
import { ICreateListItemWebPartProps } from './components/ICreateListItemWebPartProps';

import { sp } from '@pnp/sp';
import { baseElementEvents } from '@uifabric/utilities/lib';

export interface ICreateListItemWebPartWebPartProps {
  description: string;
}

export default class CreateListItemWebPartWebPart extends BaseClientSideWebPart<ICreateListItemWebPartWebPartProps> {

  protected async onInit(): Promise<void> {
    const _ = await super.onInit();
    sp.setup({
      spfxContext: this.context.spHttpClient
    })
  }


  public render(): void {
    const element: React.ReactElement<ICreateListItemWebPartProps > = React.createElement(
      CreateListItemWebPart,
      {
        description: this.properties.description,
        context: this.context
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
