export type IClient = {
  request(method: string, data?: any): Promise<any>;
};

export type Config = {
  url: string; // http://127.0.0.1:9050
  username: string; // rpc username
  password: string; // rpc password
  httpOptions?: any; // object
};

export type Options = {
  auth: {
    username: string;
    password: string;
  };
  [k: string]: any; // httpOptions
};
