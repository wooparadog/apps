/* eslint-disable @typescript-eslint/camelcase */
// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BareProps, CallProps } from '@polkadot/ui-api/types';
import { Balance } from '@polkadot/types/interfaces';

import React from 'react';
import { withCalls } from '@polkadot/ui-api';
import { formatBalance } from '@polkadot/util';

type Props = BareProps & CallProps & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  balances_totalIssuance?: Balance;
};

export class TotalIssuance extends React.PureComponent<Props> {
  public render (): React.ReactNode {
    const { children, className, label = '', style, balances_totalIssuance } = this.props;
    const value = balances_totalIssuance
      ? balances_totalIssuance.toString()
      : null;

    return (
      <div
        className={className}
        style={style}
      >
        {label}{
          value
            ? `${formatBalance(value, false)}${formatBalance.calcSi(value).value}`
            : '-'
        }{children}
      </div>
    );
  }
}

export default withCalls<Props>('query.balances.totalIssuance')(TotalIssuance);
