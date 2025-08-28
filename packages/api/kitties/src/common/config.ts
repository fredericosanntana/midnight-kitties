/**
 * @file config.ts
 * @author Ricardo Rius
 * @license GPL-3.0
 *
 * Copyright (C) 2025 Ricardo Rius
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * DISCLAIMER: This software is provided "as is" without any warranty.
 * Use at your own risk. The author assumes no responsibility for any
 * damages or losses arising from the use of this software.
 */

import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

// Browser-compatible configuration interface
export interface BrowserConfig {
  readonly indexer: string;
  readonly indexerWS: string;
  readonly proofServer: string;
  readonly networkId: NetworkId;
  readonly loggingLevel: string;
}

// Browser-compatible configuration classes
export class BrowserTestnetLocalConfig implements BrowserConfig {
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  proofServer = 'http://127.0.0.1:6300';
  networkId = NetworkId.TestNet;
  loggingLevel = 'info';
  constructor() {
    setNetworkId(NetworkId.TestNet);
  }
}

export class BrowserStandaloneConfig implements BrowserConfig {
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  proofServer = 'http://127.0.0.1:6300';
  networkId = NetworkId.Undeployed;
  loggingLevel = 'info';
  constructor() {
    setNetworkId(NetworkId.Undeployed);
  }
}

export class BrowserTestnetRemoteConfig implements BrowserConfig {
  indexer = 'https://indexer.testnet-02.midnight.network/api/v1/graphql';
  indexerWS = 'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws';
  proofServer = 'http://127.0.0.1:6300';
  networkId = NetworkId.TestNet;
  loggingLevel = 'trace';
  constructor() {
    setNetworkId(NetworkId.TestNet);
  }
}

// Configuration factory for browser environments
export type ConfigEnvironment = 'standalone' | 'testnet-local' | 'testnet-remote';

export function createBrowserConfig(environment: ConfigEnvironment = 'testnet-remote'): BrowserConfig {
  switch (environment) {
    case 'standalone':
      return new BrowserStandaloneConfig();
    case 'testnet-local':
      return new BrowserTestnetLocalConfig();
    case 'testnet-remote':
      return new BrowserTestnetRemoteConfig();
    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
}

// Default browser configuration (mirrors current config.json values)
export function getDefaultBrowserConfig(): BrowserConfig {
  return createBrowserConfig('testnet-remote');
}

// Contract configuration for browser environments
export const contractConfig = {
  privateStateStoreName: 'kitties-private-state',
};
