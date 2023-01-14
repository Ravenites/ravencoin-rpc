import {
  Assets,
  Blockchain,
  Messages,
  Mining,
  Misc,
  Net,
  RawTransactions,
  Rewards,
  Wallet,
} from './methods';
import { Config, IClient, Options, RpcError } from './types';
import axios, { Axios } from 'axios';

/**
 * Create a RPC Client to connect to a Ravencoin node.
 * @class Client
 * @category Client
 * @param config
 * @param {string} config.url Url endpoint to connect to node server
 * @param {string} config.username RPC username
 * @param {string} config.password RPC password
 * @param {Objct=} config.httpOptions HTTP options object of values to add to request headers
 * @example
 *  import Client from '@ravenite/ravencoin-rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

client.assets.listAssets().then(assets => {
  console.log('assets', assets);
});
 */
export class Client implements IClient {
  /** @type {Assets} */
  public assets: Assets;
  /** @type {Blockchain} */
  public blockchain: Blockchain;
  /** @type {Messages} */
  public messages: Messages;
  /** @type {Mining} */
  public mining: Mining;
  /** @type {Misc} */
  public misc: Misc;
  /** @type {Net} */
  public net: Net;
  /** @type {RawTransactions} */
  public rawTransactions: RawTransactions;
  /** @type {Rewards} */
  public rewards: Rewards;
  /** @type {Wallet} */
  public wallet: Wallet;
  private _url: string;
  private _options: Options;
  private _instance: Axios = axios.create();

  constructor(config: Config) {
    this._instance.defaults.validateStatus = status => {
      return status >= 200 && status < 400;
    };

    this._instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this._url = config.url;
    this._options = {
      auth: {
        username: config.username,
        password: config.password,
      },
    };

    if (config.httpOptions) {
      for (let k in config.httpOptions) {
        this._options[k] = config.httpOptions[k];
      }
    }

    this.assets = new Assets(this);
    this.blockchain = new Blockchain(this);
    this.messages = new Messages(this);
    this.mining = new Mining(this);
    this.misc = new Misc(this);
    this.net = new Net(this);
    this.rawTransactions = new RawTransactions(this);
    this.rewards = new Rewards(this);
    this.wallet = new Wallet(this);
  }

  /**
   * Make a RPC request with a method command and payload
   * @param {string} method Name of rpc command.
   * @param {(Object|Array)=} params Data required by rpc command. Typically an object or an array.
   * @returns {Promise}
   */
  request(method: string, params: any = []): Promise<any | RpcError> {
    const data: any = {
      jsonrpc: '2.0',
      id: Math.random(),
      method,
      params,
    };

    return this._instance
      .post(this._url, data, this._options)
      .then(res => {
        return res.data?.result ? res.data.result : res.data;
      })
      .catch(err => {
        return {
          code: err.response?.status || 500,
          data: err.response?.config?.data,
          message:
            err.response?.data?.error?.message ||
            err.response?.message ||
            err?.message ||
            'Unknown request failure. Please review: rpc command, arguments and connection.',
          name: err.response?.statusText,
          status: err.response?.status || 500,
        };
      });
  }
}
