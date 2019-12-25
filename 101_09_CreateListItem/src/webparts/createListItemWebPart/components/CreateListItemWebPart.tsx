import * as React from 'react';
import styles from './CreateListItemWebPart.module.scss';
import { ICreateListItemWebPartProps } from './ICreateListItemWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { ICreateItemService } from '../../services/ICreateItemService';
import { CreateItemService } from '../../services/CreateItemService';

import { sp } from '@pnp/sp';

export default class CreateListItemWebPart extends React.Component<ICreateListItemWebPartProps, {}> {

  private _service: ICreateItemService;

  constructor(props: ICreateListItemWebPartProps) {
    super(props);
    this._service = new CreateItemService(this.props.context.spHttpClient);

    sp.setup({
      spfxContext: this.props.context
    });

  }

  onClickCreateItemByRest = () => {
    this._service.create();
  }

  onClickCreateItemByPnP = () => {
    const web = sp.web.get();

    web.then((response) => {
      const resp = response;
      console.log(resp);
    });

    sp.web.lists.getByTitle('issues').items.add({
      Title: 'Created by PnP',
      Body: `<h2>I like PnP</h2>`
    })

  }


  public render(): React.ReactElement<ICreateListItemWebPartProps> {
    return (
      <div className={styles.createListItemWebPart} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Button onClick={this.onClickCreateItemByRest}>Create Item By REST</Button>
              <Button onClick={this.onClickCreateItemByPnP}>Create Item By PnP</Button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
