import vine from '@vinejs/vine'

export const walletAccountValidator = vine.compile(
  vine.object({
    index: vine.string(),
    label: vine.string().optional(),
    walletId: vine.string(),
  })
)
