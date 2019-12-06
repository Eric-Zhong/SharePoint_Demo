import * as React from 'react';
import { IOfficialDocumentDetailProps } from './IOfficialDocumentDetailProps';
import { OfficialDocumentService } from '../../services/OfficialDocumentService';
import { IOfficialDocumentService } from '../../services/IOfficialDocumentService';
import { css, classNamesFunction, IStyleFunction } from '@uifabric/utilities/lib';
import styles from './OfficialDocumentDetail.module.scss';

export interface IOfficialDocumentDetailState {
  record: any;
}

export default class OfficialDocumentDetail extends React.Component<IOfficialDocumentDetailProps, IOfficialDocumentDetailState> {

  private _service: IOfficialDocumentService;

  constructor(props: IOfficialDocumentDetailProps) {
    super(props);
    this.state = {
      record: null
    };
    this._service = new OfficialDocumentService(this.props.context.spHttpClient);
  }

  public async componentDidMount() {
    const record = await this._service.readContent(this.props.siteUri, this.props.libraryTitle, this.props.id);
    this.setState({
      record: record
    })
    console.log(record);
  }

  public render(): React.ReactElement<IOfficialDocumentDetailProps> {

    console.log(this.state.record);

    if (this.state.record) {
      return (
        <div className="ms-Grid">
          <div className={styles.row}>
            <div className={css(styles.column, styles.subject)}>深圳中原第 {this.state.record.Id} 号公文</div>
            <div className={styles.column}>网站：{this.props.siteUri}</div>
            <div className={styles.column}>文档库：{this.props.libraryTitle}</div>
            <div className={styles.column}>ID：{this.props.id}</div>
            <div className={styles.column}><h1>标题：{this.state.record.Subject}</h1></div>
            <div className={styles.column}>时间：{this.state.record.Modified}</div>
            <div className={styles.column} dangerouslySetInnerHTML={{__html: this.state.record.Summary}}></div>
            <div className={styles.column}><h2>文件名：{this.state.record.File.Name}</h2></div>
            <div className={styles.column}>文件原始名称：{this.state.record.File.Title}</div>
            <div className={styles.column}>文件路径：{this.state.record.File.ServerRelativeUrl}</div>
            <div className={styles.column}>置顶：{this.state.record.IsTop}</div>
            <div className={styles.column}>优先级：{this.state.record.Priority}</div>
            <div className={styles.column}>ID：{this.state.record.Id}</div>
            <div className={styles.column}>
              <img src="/sites/develop/Images1/Centaline_Property.jpg"></img>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className={styles.column}>{this.props.siteUri}</div>
            <div className={styles.column}>{this.props.libraryTitle}</div>
            <div className={styles.column}>{this.props.id}</div>
            <div className={styles.column}>没有获取到数据</div>
          </div>
        </div>
      );
    }

  }
}
