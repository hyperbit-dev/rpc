import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Form, FormFeedback, FormGroup, Input, Label } from '@hyperbit-private/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, redirect } from 'react-router-dom'
import { CreateWalletSchema } from './schema'
import { Wallet } from '@hyperbit-private/wallet'
import { chains } from '@hyperbitjs/chains'
import { useMemo } from 'react'
import clsx from 'clsx'

export function CreatePage() {
  const form = useForm({
    resolver: zodResolver(CreateWalletSchema),
    defaultValues: {
      step: 'create',
      network: 'mainnet',
    },
  })

  async function handleSubmit({
    blockchain,
    network: networkName,
    label,
    passphrase,
  }: CreateWalletSchema) {
    const network = chains[blockchain][networkName]

    const wallet = new Wallet({
      label,
      passphrase,
      network,
      database: 'hyperbit-wallet-extension',
    })
    const data = wallet.toJSON({ scrub: true })
    console.log('data', data)

    try {
      redirect('/account')
      form.reset()
    } catch (err) {
      console.log('err', err)
    }
  }

  const options = useMemo(() => {
    const options = Object.keys(chains)
      .map((chain: any) => {
        const name: string = (chains as any)[chain].mainnet.name
        return {
          label: name.match(/[A-Z][a-z]+/g)?.join(' ') ?? name,
          value: chain,
          networks: (chains as any)[chain],
        }
      })
      .filter((chain) => !!chain.networks.mainnet.messagePrefix)
    return options
  }, [])

  const passphrase = form.watch('passphrase')

  return (
    <FormProvider {...form}>
      <Form
        className="flex flex-col items-center justify-center flex-1 overflow-hidden"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col flex-1 p-4 overflow-auto">
          <FormGroup>
            <h1 className="mb-1 text-2xl">Get Started</h1>
            <p className="text-sm">
              Hyperbit is non-custodial. We cannot restore or reset your password for you. Make sure
              you remember it.
            </p>
          </FormGroup>
          <FormGroup>
            <Label>Blockchain</Label>
            <Input asChild>
              <select {...form.register('blockchain')}>
                <option value="">Select a blockchain...</option>
                {options.map((option: any) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Input>
            {form.formState?.errors?.blockchain?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.blockchain.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Network</Label>
            <Input asChild>
              <select {...form.register('network')}>
                <option value="">Select a network...</option>
                <option value="mainnet">Mainnet</option>
                <option value="testnet">Testnet</option>
              </select>
            </Input>
            {form.formState?.errors?.network?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.network.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup id="wallet-label">
            <Label>Label</Label>
            <Input type="text" {...form.register('label')} />
            {form.formState?.errors?.label?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.label.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup id="wallet-passphrase">
            <Label>Passphrase (optional)</Label>
            <Input type="password" {...form.register('passphrase')} />
            {form.formState?.errors?.passphrase?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.passphrase.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup
            id="wallet-passphrase-confirm"
            className={clsx({ hidden: !passphrase?.length })}
          >
            <Label>Confirm Passphrase</Label>

            <Input type="password" {...form.register('passphraseConfirm')} />
            {form.formState?.errors?.passphraseConfirm?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.passphraseConfirm.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Checkbox id="wallet-terms" type="checkbox" {...form.register('termsAndConditions')}>
              <span className="text-sm">I agree to the Terms & Conditions</span>
            </Checkbox>
            {form.formState?.errors?.termsAndConditions?.message ? (
              <FormFeedback className="block text-sm">
                {form.formState.errors.termsAndConditions.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
        </div>
        <div className="flex flex-row justify-between w-full gap-4 p-4 border-t border-gray-300">
          <Button type="button" fullWidth variant="link" asChild className="text-center">
            <Link to="/">Back</Link>
          </Button>
          <Button type="submit" fullWidth>
            Next
          </Button>
        </div>
      </Form>
    </FormProvider>
  )
}
