import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'BizTalkFooterApplicationCustomizerStrings';
import CustomFooter from './components/CustomFooter';

const LOG_SOURCE: string = 'BizTalkFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBizTalkFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BizTalkFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IBizTalkFooterApplicationCustomizerProperties> {

  // This private member holds a reference to the page's footer
  private _bottomPlaceholder: PlaceholderContent | undefined;

  private _renderPlaceHolders(): void {

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
    this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom);

    // The extension should not assume that the expected placeholder is available.
    if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
    }

    const element: React.ReactElement<{}> = React.createElement(CustomFooter);

    ReactDom.render(element, this._bottomPlaceholder.domElement);
    }
  }

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    this._renderPlaceHolders();

    return Promise.resolve();
  }
}
