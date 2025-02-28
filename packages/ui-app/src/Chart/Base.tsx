// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BareProps } from '../types';

import React from 'react';
import styled from 'styled-components';

import { classes } from '../util';

interface Props extends BareProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 1em 1em 0;
  height: 15vw;
  width: 15vw;
`;

export default class BaseChart extends React.PureComponent<Props> {
  public render (): React.ReactNode {
    const { children, className, style } = this.props;

    return (
      <Wrapper
        className={classes('ui--Chart', className)}
        style={style}
      >
        {children}
      </Wrapper>
    );
  }
}
