import { Client } from '../src';

describe('Client', () => {
  describe('Defaults', () => {
    const client = new Client({
      url: 'http://127.0.0.1:9050',
      username: 'username',
      password: 'password',
    });

    it('should initialize the class', function() {
      expect(client).toBeInstanceOf(Client);
    });
  });
});
