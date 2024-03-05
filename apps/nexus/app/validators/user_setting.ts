import vine from '@vinejs/vine'
import { chains } from '@hyperbitjs/chains'

export const userSettingValidator = vine.compile(
  vine.object({
    // key: chainId
    blockchains: vine
      .record(
        vine.object({
          walletLimit: vine.unionOfTypes([vine.string(), vine.number()]),
        })
      )
      .validateKeys((keys, field) => {
        const chainIds = Object.values(chains).reduce<string[]>((chainIds, networks) => {
          const networkIds = Object.values(networks).map((n) => n.id)
          return [...chainIds, ...networkIds]
        }, [])
        const nonChainIds = keys.some((x) => !chainIds.includes(x))
        if (nonChainIds) {
          field.report('blockchain key must be a valid chain id', 'record.keys.string', field)
        }
      })
      .optional(),
  })
  // .allowUnknownProperties()
)
