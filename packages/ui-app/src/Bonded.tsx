// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import { BareProps } from './types';

import BN from 'bn.js';
import React from 'react';
import { formatBalance } from '@polkadot/util';
import { Bonded } from '@polkadot/ui-reactive';

import { classes } from './util';

export interface Props extends BareProps {
  bonded?: BN | BN[];
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
  withLabel?: boolean;
}

export default class BondedDisplay extends React.PureComponent<Props> {
  public render (): React.ReactNode {
    const { bonded, params, className, label, style } = this.props;

    if (!params) {
      return null;
    }

    return bonded
      ? this.renderProvided()
      : (
        <Bonded
          className={classes('ui--Bonded', className)}
          label={label}
          params={params}
          style={style}
        />
      );
  }

  private renderProvided (): React.ReactNode {
    const { bonded, className, label, style } = this.props;
    let value = `${formatBalance(Array.isArray(bonded) ? bonded[0] : bonded)}`;

    if (Array.isArray(bonded)) {
      const totals = bonded.filter((value, index): boolean => index !== 0);
      const total = totals.reduce((total, value): BN => total.add(value), new BN(0)).gtn(0)
        ? `(+${totals.map((bonded): string => formatBalance(bonded)).join(', ')})`
        : '';

      value = `${value}  ${total}`;
    }

    return (
      <div
        className={classes('ui--Bonded', className)}
        style={style}
      >
        {label}{value}
      </div>
    );
  }
}
