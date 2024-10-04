import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    // .unique(async (db: any, value: any) => {
    //   const user = await db.from('users').where('email', value).first()
    //   return !user
    // }),
    password: vine.string().minLength(8).maxLength(32).confirmed({
      confirmationField: 'passwordConfirmation',
    }),
  })
)
