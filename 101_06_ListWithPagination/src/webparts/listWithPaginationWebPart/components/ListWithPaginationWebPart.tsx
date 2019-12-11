/** 
 * Pagination sdk: http://react-component.github.io/pagination/examples/locale.html 
 * 
 * */

import * as React from 'react';
import styles from './ListWithPaginationWebPart.module.scss';
import { IListWithPaginationWebPartProps } from './IListWithPaginationWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/zh_CN';

require('rc-pagination/assets/index.css');

export default class ListWithPaginationWebPart extends React.Component<IListWithPaginationWebPartProps, {}> {

  private onShowSizeChange(current: number, pageSize: number) {
    console.log({
      current, pageSize
    });
  }

  private onChange(current: number, pageSize: number) {
    console.log({
      current, pageSize
    });
  }

  public render(): React.ReactElement<IListWithPaginationWebPartProps> {
    return (
      <div className={styles.listWithPaginationWebPart} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Pagination
                showSizeChanger={true}
                defaultPageSize={20}
                defaultCurrent={5}
                showQuickJumper={{ goButton: true }}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                total={450}
                locale={localeInfo}
              />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
