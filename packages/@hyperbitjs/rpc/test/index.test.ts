import { Client, createClientFromConfig, createClientFromEnv } from '../src';

describe('Client', () => {
  describe('Defaults', () => {
    const client = new Client({
      url: 'http://127.0.0.1:9050',
      username: 'username',
      password: 'password',
    });

    it('should initialize the class', function () {
      expect(client).toBeInstanceOf(Client);
    });

    it('should expose a safe serializable config snapshot', function () {
      expect(client.toJSON()).toEqual({
        url: 'http://127.0.0.1:9050',
        timeout: 30000,
        retries: 0,
      });
    });

    it('should detect rpc errors with type guard', function () {
      expect(
        Client.isRpcError({
          code: 500,
          message: 'boom',
          name: 'RpcError',
          status: 500,
        })
      ).toBe(true);
      expect(Client.isRpcError({ message: 'not-rpc' })).toBe(false);
    });

    it('should throw when required config is missing', function () {
      expect(() => new Client({ url: '' })).toThrow();
    });

    it('should create configured client with explicit url', function () {
      const configuredClient = createClientFromConfig({
        url: 'http://127.0.0.1:9051',
        username: 'username',
        password: 'password',
      });

      expect(configuredClient.toJSON().url).toBe('http://127.0.0.1:9051');
    });

    it('should return validation error for empty method names', async function () {
      const result = await client.request('');

      expect(Client.isRpcError(result)).toBe(true);
      if (Client.isRpcError(result)) {
        expect(result.type).toBe('ValidationError');
      }
    });

    it('should create client from env url', function () {
      const envClient = createClientFromEnv({
        RPC_URL: 'http://127.0.0.1:9052',
        RPC_USER: 'rpcuser',
        RPC_PASSWORD: 'rpcpassword',
      });

      expect(envClient.toJSON().url).toBe('http://127.0.0.1:9052');
    });

    it('should require RPC_URL in env config', function () {
      expect(() =>
        createClientFromEnv({
          RPC_USER: 'rpcuser',
          RPC_PASSWORD: 'rpcpassword',
        })
      ).toThrow();
    });

    it('should use RPC_URL in env config', function () {
      const envClient = createClientFromEnv({
        RPC_URL: 'http://127.0.0.1:9999',
        RPC_USER: 'rpcuser',
        RPC_PASSWORD: 'rpcpassword',
      });

      expect(envClient.toJSON().url).toBe('http://127.0.0.1:9999');
    });

    it('should parse timeout and retries from env config', function () {
      const envClient = createClientFromEnv({
        RPC_URL: 'http://127.0.0.1:8766',
        RPC_TIMEOUT: '45000',
        RPC_RETRIES: '3',
      });

      expect(envClient.toJSON().timeout).toBe(45000);
      expect(envClient.toJSON().retries).toBe(3);
    });
  });
});
