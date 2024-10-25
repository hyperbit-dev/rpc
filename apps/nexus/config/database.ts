import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
        disableRollbacksInProduction: true,
      },
    },
    ravencoin: {
      client: 'mysql2',
      connection: {
        host: env.get('INDEXER_RVN_DB_HOST'),
        user: env.get('INDEXER_RVN_DB_USER'),
        password: env.get('INDEXER_RVN_DB_PASSWORD'),
        database: env.get('INDEXER_RVN_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/ravencoin'],
        disableRollbacksInProduction: true,
      },
    },
    evrmore: {
      client: 'mysql2',
      connection: {
        host: env.get('INDEXER_EVR_DB_HOST'),
        user: env.get('INDEXER_EVR_DB_USER'),
        password: env.get('INDEXER_EVR_DB_PASSWORD'),
        database: env.get('INDEXER_EVR_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/evrmore'],
        disableRollbacksInProduction: true,
      },
    },
    meowcoin: {
      client: 'mysql2',
      connection: {
        host: env.get('INDEXER_MEWC_DB_HOST'),
        user: env.get('INDEXER_MEWC_DB_USER'),
        password: env.get('INDEXER_MEWC_DB_PASSWORD'),
        database: env.get('INDEXER_MEWC_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/meowcoin'],
        disableRollbacksInProduction: true,
      },
    },
    neoxa: {
      client: 'mysql2',
      connection: {
        host: env.get('INDEXER_NEOX_DB_HOST'),
        user: env.get('INDEXER_NEOX_DB_USER'),
        password: env.get('INDEXER_NEOX_DB_PASSWORD'),
        database: env.get('INDEXER_NEOX_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/neoxa'],
        disableRollbacksInProduction: true,
      },
    },
  },
})

export default dbConfig
