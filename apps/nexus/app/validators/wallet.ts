import vine from '@vinejs/vine'

export const walletValidator = vine.compile(
  vine.object({
    externalId: vine.string(),
    label: vine.string(),
    blockchainId: vine.string(),
    favorite: vine.boolean().optional(),
    type: vine.enum(['hot', 'cold', 'custodial']).optional(),
    lockedAt: vine.date().optional(),
    archivedAt: vine.date().optional(),
    addresses: vine.array(vine.object({
      address: vine.string(),
      label: vine.string().optional(),
      path: vine.string().optional(),
    })).optional(),
    // accounts: vine
    //   .record(
    //     vine.object({
    //       external: vine.record(
    //         vine.object({
    //           address: vine.string(),
    //           path: vine.string(),
    //         })
    //       ),
    //       change: vine.record(
    //         vine.object({
    //           address: vine.string(),
    //           path: vine.string(),
    //         })
    //       ),
    //     })
    //   )
    //   .optional(),
  })
)
