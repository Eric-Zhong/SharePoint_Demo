/**
 * demo code from https://blog.kloud.com.au/2019/05/15/apply-custom-css-to-sharepoint-modern-pages-using-spfx-webpart/
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import CsutomerizedStyle from './components/CsutomerizedStyle';
import { ICsutomerizedStyleProps } from './components/ICsutomerizedStyleProps';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ICsutomerizedStyleWebPartProps {
  CssFilePath: string;
}

export default class CsutomerizedStyleWebPart extends BaseClientSideWebPart<ICsutomerizedStyleWebPartProps> {

  public render(): void {

    if( this.properties.CssFilePath && this.properties.CssFilePath !== ""){
      SPComponentLoader.loadCss(this.properties.CssFilePath);
    }

    const element: React.ReactElement<ICsutomerizedStyleProps > = React.createElement(
      CsutomerizedStyle,
      {
        CssFilePath: this.properties.CssFilePath
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

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "添加需要自定义CSS样式的文件路径"
          },
          groups: [
            {
              groupName: "配置",
              groupFields: [
                PropertyPaneTextField('CssFilePath', {
                  label: "CSS URL"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
