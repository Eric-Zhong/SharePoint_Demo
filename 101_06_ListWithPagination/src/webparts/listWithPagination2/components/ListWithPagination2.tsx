import * as React from 'react';
import styles from './ListWithPagination2.module.scss';
import { IListWithPagination2Props } from './IListWithPagination2Props';
import { escape } from '@microsoft/sp-lodash-subset';

import Pagination from 'office-ui-fabric-react-pagination';

export default class ListWithPagination2 extends React.Component<IListWithPagination2Props, {}> {
  public render(): React.ReactElement<IListWithPagination2Props> {
    return (
      <div className={styles.listWithPagination2} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Pagination
                currentPage={1}
                totalPages={10}
              />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
