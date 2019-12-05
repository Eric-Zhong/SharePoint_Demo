import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Welcome extends React.Component<any> {
  public render(): React.ReactElement<any> {
    return(
      <h2>欢迎使用公文列表控件，请先配置公文文档库名称，默认为“OfficialDocuments”。</h2>
      );
  }
}
