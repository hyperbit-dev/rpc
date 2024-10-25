#!/bin/bash
set -e

CONFIG_DIR="/root/.neoxa"
CONFIG_FILE="$CONFIG_DIR/neoxa.conf"

# Create the configuration directory if it doesn't exist
mkdir -p "$CONFIG_DIR"
chmod 700 "$CONFIG_DIR"

# Check if the configuration file already exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Creating default configuration file at $CONFIG_FILE"
    
    # Create the initial configuration
    cat <<EOF > "$CONFIG_FILE"
printtoconsole=1
EOF

    # Append RPCUSER and RPCPASSWORD only if both are defined
    if [ -n "$RPCUSER" ] && [ -n "$RPCPASSWORD" ]; then
        echo "rpcuser=${RPCUSER}" >> "$CONFIG_FILE"
        echo "rpcpassword=${RPCPASSWORD}" >> "$CONFIG_FILE"
        echo "rpcbind=127.0.0.1" >> "$CONFIG_FILE"
        echo "rpcallowip=::/0" >> "$CONFIG_FILE"
        echo "rpcallowip=127.0.0.1" >> "$CONFIG_FILE"
        echo "server=1" >> "$CONFIG_FILE"
        echo "listen=1" >> "$CONFIG_FILE"
    fi

    # Add TESTNET configuration if set
    if [ "$TESTNET" = "1" ]; then
        echo "testnet=1" >> "$CONFIG_FILE"
        echo "port=4572" >> "$CONFIG_FILE"
        echo "rpcport=15425" >> "$CONFIG_FILE"
    else
        echo "port=8788" >> "$CONFIG_FILE"
        echo "rpcport=15419" >> "$CONFIG_FILE"
    fi

    # Check for FULLNODE environment variable
    if [ "$FULLNODE" = "1" ]; then
        cat <<EOF >> "$CONFIG_FILE"
addressindex=1
txindex=1
assetindex=1
spentindex=1
timestampindex=1
EOF
    fi

    # Set permissions for the configuration file
    chmod 600 "$CONFIG_FILE"
fi

echo "Configuration file complete. Starting daemon..."

# Start the daemon with the specified configuration
exec "$@" -conf="$CONFIG_FILE" -datadir="$CONFIG_DIR"