# Ravencoin Docker Setup

This directory contains the Docker setup for running a Ravencoin node.

## Building the Docker Image

To build the Docker image, navigate to this directory and run the following command:

```sh
docker build -t <image-name> .
# docker build -t ravencoin .
```

| Variable    | Definition                                                                                                              | Default Value |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- | ------------- |
| RPCUSER     | The RPC username for the Ravencoin node.                                                                                | undefined     |
| RPCPASSWORD | The RPC password for the Ravencoin node.                                                                                | undefined     |
| TESTNET     | Set to 1 to run the node in testnet mode. Automatically sets the port and rpc ports for all networks (mainnet/testnet). | 0             |
| FULLNODE    | Set to 1 to run the node as an archival node.                                                                           | 0             |

Run the node container

```sh
docker run -d \
  --name <container-name> \
  -e RPCUSER=myrpcuser \
  -e RPCPASSWORD=myrpcpassword \
  -e TESTNET=1 \
  -e FULLNODE=1 \
  <image-name>
```
