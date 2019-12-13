import * as React from 'react';
import { ICsutomerizedStyleProps } from './ICsutomerizedStyleProps';

export default class CsutomerizedStyle extends React.Component < ICsutomerizedStyleProps, {} > {
  public render(): React.ReactElement<ICsutomerizedStyleProps> {
    return(
      <div>CSS was installed. ({this.props.CssFilePath})</div >
    );
  }
}
