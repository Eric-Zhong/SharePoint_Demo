import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'OfficialDocumentListWebPartStrings';
import OfficialDocumentList from './components/OfficialDocumentList';
import { IOfficialDocumentListProps } from './components/IOfficialDocumentListProps';

import { objectDefinedNotNull, stringIsNullOrEmpty } from '@pnp/common'
// 0000600: 引用制作好的一个Welcome组件
import Welcome from './components/Welcome';

// 0000900: 添加一些引用
import { IOfficialDocumentListState } from './interfaces/IOfficialDocumentListState';
import { sp } from '@pnp/sp';

export interface IOfficialDocumentListWebPartProps {
  description: string;
  // 0000100: 定义WebPart的自定义属性
  officialDocumentName: string;
}

export default class OfficialDocumentListWebPart
  extends BaseClientSideWebPart<IOfficialDocumentListWebPartProps> {

  // 0000200: 定义本WebPart所需要的局部变量
  private _documentLibraryName: string;

  // 0000300: 在WebPart被初始化时，添加一些初始化的代码
  protected async onInit(): Promise<void>{
    const _ = await super.onInit();

    // 0000400: 对变更赋初值
    this._documentLibraryName = "OfficialDocuments";  // 这是个默认值

    // 0001000: 初始化 @pnp/sp 组件
    sp.setup({
      spfxContext: this.context
    });
  }

  // 0000700: 为了避免当WebPart属性在修改时，可能会不停的重新Render，在这里增加这个配置项
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {
    // 0000500: 根据是否配置了WebPart参数，来判断应该显示什么样的显示效果
    let element: React.ReactElement<any>;
    if(stringIsNullOrEmpty(this.properties.officialDocumentName)){
      // 显示欢迎页面
      element = React.createElement(Welcome,{
        webPartContext: this.context
      });
    }
    else {
      // 显示文档库控件
      element = React.createElement(
          OfficialDocumentList,
          {
            context: this.context,
            libraryName: this.properties.officialDocumentName,
            description: this.properties.description
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
            description: "公文列表组件，用于显示当前网站下所录入的公文信息。公文数据的录入，请跳转到本网站的\"网站内容\"下的\"公文\"文档库中进行公文数据的管理。"
          },
          groups: [
            {
              groupName: "配置",
              groupFields: [
                PropertyPaneTextField('officialDocumentName', {
                  label: "公文文档库名称（默认值：OfficialDocuments)",
                  value: this._documentLibraryName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
