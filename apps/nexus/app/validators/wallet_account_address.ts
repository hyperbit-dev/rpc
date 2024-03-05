import vine from '@vinejs/vine'

export const walletAccountAddressValidator = vine.compile(
  vine.object({
    address: vine.string(),
    label: vine.string().optional(),
    path: vine.string(),
    type: vine.enum(['EXTERNAL', 'CHANGE']),
    walletAccountId: vine.string(),
  })
)
