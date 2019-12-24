import * as React from 'react';
import { ICsutomerizedStyleProps } from './ICsutomerizedStyleProps';

export default class CsutomerizedStyle extends React.Component < ICsutomerizedStyleProps, {} > {
  public render(): React.ReactElement<ICsutomerizedStyleProps> {
    if(this.props.CssFilePath){
      return (
        <div></div>
      );
    }
    else {
      return(
        <div>
          <h2>需要先配置默认的CSS文件路径</h2>
          <h3>最好将CSS放在站点资源库中</h3>
        </div >
      );
    }
  }
}
