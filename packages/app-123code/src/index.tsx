// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// some types, AppProps for the app and I18nProps to indicate
// translatable strings. Generally the latter is quite "light",
// `t` is inject into props (see the HOC export) and `t('any text')
// does the translation
import { AppProps, I18nProps } from '@polkadot/ui-app/types';

// external imports (including those found in the packages/*
// of this repo)
import React from 'react';

// local imports and components
import AccountSelector from './AccountSelector';
import SummaryBar from './SummaryBar';
import Transfer from './Transfer';
import translate from './translate';

// define out internal types
type Props = AppProps & I18nProps;
interface State {
  accountId?: string;
}

class App extends React.PureComponent<Props, State> {
  public state: State = {};

  public render (): React.ReactNode {
    const { accountId } = this.state;

    return (
      // in all apps, the main wrapper is setup to allow the padding
      // and margins inside the application. (Just from a consistent pov)
      <main>
        <SummaryBar />
        <AccountSelector onChange={this.onAccountChange} />
        <Transfer accountId={accountId} />
      </main>
    );
  }

  private onAccountChange = (accountId?: string): void => {
    this.setState({ accountId });
  }
}

export default translate(App);
