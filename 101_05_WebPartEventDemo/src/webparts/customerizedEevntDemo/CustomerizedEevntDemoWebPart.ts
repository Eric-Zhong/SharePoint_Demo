import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
} from '@microsoft/sp-webpart-base';

import * as strings from 'CustomerizedEevntDemoWebPartStrings';
import CustomerizedEevntDemo from './components/CustomerizedEevntDemo';
import { ICustomerizedEevntDemoProps } from './components/ICustomerizedEevntDemoProps';

export interface ICustomerizedEevntDemoWebPartProps {
  description: string;
  listItem: string;
}

export default class CustomerizedEevntDemoWebPart extends BaseClientSideWebPart<ICustomerizedEevntDemoWebPartProps> {

  private _dropdownOption: IPropertyPaneDropdownOption[] = [];


  public render(): void {
    const element: React.ReactElement<ICustomerizedEevntDemoProps > = React.createElement(
      CustomerizedEevntDemo,
      {
        description: this.properties.description,
        item: this.properties.listItem
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {


    this._dropdownOption = [
      { key: 'ID', text: 'A' },
      { key: 'Title', text: 'B' },
      { key: 'Created', text: 'C' },
      { key: 'Modified', text: 'D' },
      { key: 'ImageWidth', text: 'E' },
      { key: 'ImageHeight', text: 'F' }
    ]

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
                }),
                PropertyPaneDropdown('listItem',{
                  label: "List",
                  options: this._dropdownOption
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
