import { Networks, chains, ltc } from '@hyperbitjs/chains'
import { sign } from '@hyperbitjs/message'
import { Container } from '../components/container'
import { ActionFunctionArgs, Form, useActionData, useLoaderData } from 'react-router-dom'
import { Button, FormGroup, Input, Label, Textarea } from '@hyperbitui/react'

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
    const signature = sign({
      privateKey: formToJSON.privateKey,
      message: formToJSON.message,
      network,
    })
    return signature
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

export default function SignPage() {
  const options = useLoaderData()
  const data = useActionData()
  return (
    <Container className="my-4">
      <p className="mb-2">
        You can sign messages/agreements with your addresses to prove you can receive cryptocurrency
        sent to them. Be careful not to sign anything vague or random, as phishing attacks may try
        to trick you into signing your identity over to them. Only sign fully-detailed statements
        you agree to.
      </p>
      <ul className="flex items-center my-2 list-none border-b border-gray-300">
        <li>
          <button className="block p-2 border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-md">
            Form
          </button>
        </li>
        <li>
          <button className="block p-2 border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-md">
            JSON
          </button>
        </li>
      </ul>
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
          <Label htmlFor="form-privateKey">Private Key WIF</Label>
          <Textarea name="privateKey" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="form-message">Message</Label>
          <Textarea id="form-message" name="message" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="form-signature">Signature</Label>
          <Textarea id="form-signature" disabled value={data} />
        </FormGroup>
        <div className="flex justify-end">
          <Button type="submit" fullWidth>
            Sign
          </Button>
        </div>
      </Form>
    </Container>
  )
}
