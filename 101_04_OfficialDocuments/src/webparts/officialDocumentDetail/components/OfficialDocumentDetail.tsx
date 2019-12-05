import * as React from 'react';
import styles from './OfficialDocumentDetail.module.scss';
import { IOfficialDocumentDetailProps } from './IOfficialDocumentDetailProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class OfficialDocumentDetail extends React.Component < IOfficialDocumentDetailProps, {} > {
  public render(): React.ReactElement<IOfficialDocumentDetailProps> {
    return(
      <div>这里要显示一个List控件({this.props.description})</div>
    );
  }
}
