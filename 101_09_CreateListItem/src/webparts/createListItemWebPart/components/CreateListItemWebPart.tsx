import * as React from 'react';
import styles from './CreateListItemWebPart.module.scss';
import { ICreateListItemWebPartProps } from './ICreateListItemWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { ICreateItemService } from '../../services/ICreateItemService';
import { CreateItemService } from '../../services/CreateItemService';

export default class CreateListItemWebPart extends React.Component<ICreateListItemWebPartProps, {}> {

  private _service: ICreateItemService;

  constructor(props: ICreateListItemWebPartProps) {
    super(props);
    this._service = new CreateItemService(this.props.context.spHttpClient);
  }

  onClickCreateItem = () => {
    this._service.create();
  }


  public render(): React.ReactElement<ICreateListItemWebPartProps> {
    return (
      <div className={styles.createListItemWebPart} >
        <div className={styles.container}>
          <div className={styles.row}>
          <div className={styles.column}>
            <Button onClick={this.onClickCreateItem}>Create Item</Button>
            </div>
          <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href='https://aka.ms/spfx' className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
