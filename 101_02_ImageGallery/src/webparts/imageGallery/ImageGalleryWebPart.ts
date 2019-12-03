import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'ImageGalleryWebPartStrings';
import ImageGallery from './components/ImageGallery';
import { IImageGalleryProps } from './components/IImageGalleryProps';

import { sp } from '@pnp/sp';
import { ListService } from '../../Services/ListService';
import ConfigureWebPart from './components/ConfigureWebPart/ConfigureWebPart';

/**
 * 定义WebPart可以使用的自定义属性
 */
export interface IImageGalleryWebPartProps {
  imageLibrary: string;
  pageSize: number;
  MyLink: string;
}

export default class ImageGalleryWebPart extends BaseClientSideWebPart<IImageGalleryWebPartProps> {

  private listService: ListService
  private defaultPageSize: number

  protected async onInit(): Promise<void>{
    const _ = await super.onInit();
    this.defaultPageSize = 5;
    this.listService = new ListService(this.context.spHttpClient);
    sp.setup({
      spfxContext: this.context
    });
  }

  public render(): void {
    let element: any;
    // 如果 WebPart 已经配置了这两个参数，那么就要渲染这个 ImageGallery 控件
    if (this.properties.imageLibrary && this.properties.pageSize) {

      // 构建 ImageGallery 的 element 实体对象
      element = React.createElement<IImageGalleryProps>(
        ImageGallery,
        {
          listName: this.properties.imageLibrary,
          context: this.context,
          siteUrl: this.context.pageContext.site.absoluteUrl,
          pageSize: this.properties.pageSize? this.properties.pageSize: this.defaultPageSize
        }
      );
    }
    else {
      // show configure web part react component，显示用于初始化配置的 ConfigureWebPart 控件
      element = React.createElement(
        ConfigureWebPart,
        {
          listName: this.properties.imageLibrary,
          webPartContext: this.context,
          title: strings.ConfigureWebPartTitle,
          description: strings.MissingListConfiguration,
          buttonText: strings.ConfigureWebpartButtonText
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


  /**
   * 此属性用于将 web 部件的属性窗格交互从 "被动" 更改为 "非反应"。
   */
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // Input
                PropertyPaneTextField('imageLibrary', {
                  label: strings.ImageLibraryFieldLabel
                }),
                PropertyPaneTextField('MyLink', {
                  label: "My Link"
                }),
                // Slider
                PropertyPaneSlider('pageSize', {
                  label: strings.ImageLibrarySizeLabel,
                  min: 2,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
