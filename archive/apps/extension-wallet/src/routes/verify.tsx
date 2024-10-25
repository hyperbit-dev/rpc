import { Networks, chains, ltc } from '@hyperbitjs/chains'
import { verify } from '@hyperbitjs/message'
import { Container } from '../components/container'
import { ActionFunctionArgs, Form, useActionData, useLoaderData } from 'react-router-dom'
import { Button, FormGroup, Input, Label, Textarea } from '@hyperbit-private/react'
import clsx from 'clsx'

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()

  const formToJSON: Record<string, string> = {}
  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value as string
  }

  let network

  Object.values(chains).forEach((chain) => {
    Object.values(chain).forEach((n) => {
      if (n.id === formToJSON.blockchain) {
        network = n
      }
    })
  })

  try {
    const verified = verify({
      address: formToJSON.address,
      message: formToJSON.message,
      signature: formToJSON.signature,
      network,
    })
    return verified
  } catch (error) {
    console.warn('error', error)
  }

  return null
}

type Option = {
  label: string
  value: string | null
  networks: Networks
}

export function loader(): Option[] {
  return Object.keys(chains)
    .map((chain) => {
      const name: string = chains[chain].mainnet.name
      return {
        label: name.match(/[A-Z][a-z]+/g)?.join(' ') ?? name,
        value: chains[chain].mainnet?.id ?? null,
        networks: chains[chain],
      }
    })
    .filter((chain) => !!chain.networks.mainnet.messagePrefix)
}

export default function VerifyPage() {
  const options = useLoaderData()
  const data = useActionData()
  console.log('data', data)
  return (
    <Container className="my-4">
      {data === true || data === false ? (
        <p
          className={clsx(
            'p-2 mt-2 border rounded mb-2',
            { 'bg-blue-100 border-blue-200': data === true },
            { 'bg-yellow-100 border-yellow-200': data === false },
          )}
        >
          {!!data ? 'Success!' : 'Invalid'}
        </p>
      ) : undefined}
      <p className="mb-2">
        Verify the message to ensure it was signed with the specified blockchain address.
      </p>
      <p className="mb-2">
        Enter the receiver&apos;s public address, message (ensure you copy line breaks, spaces,
        tabs, etc. exactly) and signature below to verify the message. Be careful not to read more
        into the signature than what is in the signed message itself, to avoid being tricked by a
        man-in-the-middle attack. Note that this only proves the signing party receives with the
        address, it cannot prove sendership of any transaction!
      </p>
      <Form method="post">
        <FormGroup>
          <Label htmlFor="form-blockchain">Blockchain</Label>
          <Input asChild>
            <select id="form-blockchain" name="blockchain" required>
              {(options as Option[]).map((chain) => (
                <option key={chain.label} value={chain.value ?? ''}>
                  {chain.label}
                </option>
              ))}
            </select>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="form-address">Public Address</Label>
          <Textarea name="address" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="form-message">Message</Label>
          <Textarea id="form-message" name="message" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="form-verifyature">Signature</Label>
          <Textarea id="form-verifyature" name="signature" required />
        </FormGroup>
        <div className="flex justify-end">
          <Button type="submit" fullWidth>
            Verify
          </Button>
        </div>
      </Form>
    </Container>
  )
}
