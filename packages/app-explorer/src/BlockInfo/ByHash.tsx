/* eslint-disable @typescript-eslint/camelcase */
// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EventRecord, SignedBlock } from '@polkadot/types/interfaces';
import { I18nProps } from '@polkadot/ui-app/types';
import { ApiProps } from '@polkadot/ui-api/types';

import React from 'react';
import { HeaderExtended } from '@polkadot/api-derive';
import { withCalls } from '@polkadot/ui-api';
import { Columar } from '@polkadot/ui-app';

import BlockHeader from '../BlockHeader';
import translate from '../translate';
import Events from './Events';
import Extrinsics from './Extrinsics';
import Logs from './Logs';

type Props = ApiProps & I18nProps & {
  system_events?: EventRecord[];
  chain_getBlock?: SignedBlock;
  chain_getHeader?: HeaderExtended;
  value: string;
};

class BlockByHash extends React.PureComponent<Props> {
  public render (): React.ReactNode {
    const { system_events, chain_getBlock, chain_getHeader } = this.props;

    if (!chain_getBlock || chain_getBlock.isEmpty || !chain_getHeader || chain_getHeader.isEmpty) {
      return null;
    }

    return (
      <>
        <header>
          <BlockHeader
            value={chain_getHeader}
            withExplorer
          />
        </header>
        <Columar>
          <Extrinsics
            blockNumber={chain_getHeader.number.unwrap()}
            value={chain_getBlock.block.extrinsics}
          />
          <Events value={system_events} />
          <Logs value={chain_getHeader.digest.logs} />
        </Columar>
      </>
    );
  }
}

export default translate(
  withCalls<Props>(
    ['rpc.chain.getBlock', { paramName: 'value' }],
    ['derive.chain.getHeader', { paramName: 'value' }],
    ['query.system.events', { atProp: 'value' }]
  )(BlockByHash)
);
