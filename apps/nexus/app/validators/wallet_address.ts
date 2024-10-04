import vine from '@vinejs/vine'

export const walletAddressValidator = vine.compile(
  vine.object({
    address: vine.string(),
    label: vine.string().optional(),
    path: vine.string(),
    type: vine.enum(['EXTERNAL', 'CHANGE']),
  })
)
