import vine from '@vinejs/vine'

export const walletValidator = vine.compile(
  vine.object({
    externalId: vine.string(),
    label: vine.string(),
    chainId: vine.string(),
    favorite: vine.boolean().optional(),
    creationType: vine.enum(['CREATE', 'IMPORT']).optional(),
    lockedAt: vine.date().optional(),
    archivedAt: vine.date().optional(),
    accounts: vine.record(
      vine.object({
        external: vine.record(
          vine.object({
            address: vine.string(),
            path: vine.string(),
          })
        ),
        change: vine.record(
          vine.object({
            address: vine.string(),
            path: vine.string(),
          })
        ),
      })
    ),
  })
)
