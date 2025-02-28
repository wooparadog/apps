// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';

import Collection, { CollectionProps, CollectionState, collectionStyles } from './Collection';

import translate from './translate';

type Props = CollectionProps;

type State = CollectionState;

class CardGrid extends Collection<Props, State> {
  public static getDerivedStateFromProps (props: Props): State {
    const state = super.getDerivedStateFromProps(props);

    return {
      ...state,
      showHeader: !state.isEmpty || !!props.headerText
    };
  }

  protected renderEmpty (): React.ReactNode {
    const { buttons, emptyText, headerText, t } = this.props;

    if (headerText) {
      return super.renderEmpty();
    }

    return (
      <div className='ui--CardGrid-empty'>
        <h2>{emptyText || t('No items')}</h2>
        {buttons && (
          <div className='ui--CardGrid-buttons'>
            {buttons}
          </div>
        )}
        <div className='ui--CardGrid-spacer' />
      </div>
    );
  }

  public renderCollection (): React.ReactNode {
    const { children } = this.props;

    return (
      <div className='ui--CardGrid-grid'>
        {children}
        <div className='ui--CardGrid-spacer' />
        <div className='ui--CardGrid-spacer' />
        <div className='ui--CardGrid-spacer' />
      </div>
    );
  }
}

export default translate(
  styled(CardGrid as React.ComponentClass<Props, State>)`
    ${collectionStyles}

    .ui--CardGrid-grid {
      display: flex;
      flex-wrap: wrap;

      > .ui--CardGrid-spacer {
        flex: 1 1;
        margin: 0.25rem;
        padding: 0 1.5rem;
      }
    }

    .ui--CardGrid-lowercase {
      text-transform: lowercase;
    }

    .ui--Card,
    .ui--CardGrid-spacer {
      flex: 1 1;
      min-width: 35rem;
      max-width: 71rem;
    }

    .ui--CardGrid-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 6rem 0;

      > h2 {
        margin-bottom: 2rem;
      }
    }
  `);
