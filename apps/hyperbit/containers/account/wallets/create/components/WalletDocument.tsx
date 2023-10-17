"use client";
import { Wallet } from "@/services/wallet";
import { Page, Text, View, Document, Image, Link } from "@react-pdf/renderer";
import React from "react";

export function WalletDocument({
  wallet,
  passphrase,
  network,
}: {
  passphrase: string;
  network: string;
  wallet?: Wallet;
}) {
  const coinKey = wallet.mnemonic?.getCoinKey();
  const hdPrivateKey = wallet.mnemonic?.getHDPrivateKey();
  const walletWordsDataUrl = document
    .getElementById("wallet-words")
    ?.toDataURL();
  const walletXprivDataUrl = document
    .getElementById("wallet-xpriv")
    ?.toDataURL();
  const walletXpubDataUrl = document.getElementById("wallet-xpub")?.toDataURL();
  const coinkeyPrivateKey = document
    .getElementById("wallet-coinkey-privatekey")
    ?.toDataURL();
  const coinkeyPublicAddress = document
    .getElementById("wallet-coinkey-publicaddress")
    ?.toDataURL();
  const coinkeyPrivateWIF = document
    .getElementById("wallet-coinkey-privatewif")
    ?.toDataURL();

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: "20px",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: "5px",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginBottom: "5px" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              <View
                style={{ width: "40px", height: "40px", paddingRight: "10px" }}
              >
                <Image src="/pdf-logo.png" />
              </View>
              <Text style={{ fontSize: "30px", marginTop: "-10px" }}>
                Hyperbit
              </Text>
            </View>
            <Link
              style={{
                fontSize: "10px",
                color: "#000000",
                textDecoration: "none",
              }}
              src="https://hyperbit.app"
            >
              https://hyperbit.app
            </Link>
          </View>
          <View style={{ alignItems: "flex-end", fontSize: "12px" }}>
            <Text>Wallet Name: {wallet.name}</Text>
            <Text>{wallet?.network.name}</Text>
            <Text style={{ fontSize: "10px" }}>{network}</Text>
          </View>
        </View>
        <View style={{ marginBottom: "5px" }}>
          <Text style={{ fontSize: "12px" }}>
            Your seed (words) and/or passphrase is a unique secret that only you
            know. Store it in a safe location. If you ever forgot your seed,
            this document will be the only way for you to regain access to your
            wallet. If you used a passphrase, this document will NOT show it.
            Never share this document with anyone.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <View style={{ width: "80px", height: "80px" }}>
            <Image src={walletWordsDataUrl} />
          </View>
          <View style={{ paddingLeft: "10px", paddingTop: "5px", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  paddingRight: "10px",
                }}
              >
                Words
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  marginTop: "1px",
                }}
              >
                Passphrase Used: {passphrase ? "Yes" : "No"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                fontSize: "10px",
              }}
            >
              {wallet?.mnemonic?.words.map((word, i) => (
                <Text
                  key={word}
                  style={{
                    width: "70px",
                    marginBottom: "5px",
                  }}
                >
                  {i + 1}. {word}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginBottom: "5px",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <View style={{ width: "80px", height: "80px" }}></View>
          <View style={{ paddingLeft: "10px", paddingTop: "5px", flex: 1 }}>
            <Text style={{ fontSize: "14px" }}>HD Private Key</Text>
            <Text style={{ fontSize: "9px", marginBottom: "5px" }}>
              (Remove any hyphens)
            </Text>
            <Text style={{ fontSize: "10px", flexWrap: "wrap" }}>
              {hdPrivateKey.toJSON().xpriv}
            </Text>
          </View>
          <View style={{ width: "80px", height: "80px" }}>
            <Image src={walletXprivDataUrl} />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginBottom: "5px",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <View style={{ width: "80px", height: "80px" }}>
            <Image src={walletXpubDataUrl} />
          </View>
          <View style={{ paddingLeft: "10px", paddingTop: "5px", flex: 1 }}>
            <Text style={{ fontSize: "14px" }}>HD Public Key</Text>
            <Text style={{ fontSize: "9px", marginBottom: "5px" }}>
              (Remove any hyphens)
            </Text>
            <Text style={{ fontSize: "10px", flexWrap: "wrap" }}>
              {hdPrivateKey.toJSON().xpub}
            </Text>
          </View>
          <View style={{ width: "80px", height: "80px" }}></View>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginBottom: "5px",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <View style={{ width: "80px", height: "80px" }}></View>
          <View style={{ paddingLeft: "10px", paddingTop: "5px", flex: 1 }}>
            <Text style={{ fontSize: "14px" }}>Private Key</Text>
            <Text style={{ fontSize: "9px", marginBottom: "5px" }}>
              (Remove any hyphens)
            </Text>
            <Text style={{ fontSize: "10px", flexWrap: "wrap" }}>
              {coinKey.privateKey.toString("hex")}
            </Text>
          </View>
          <View style={{ width: "80px", height: "80px" }}>
            <Image src={coinkeyPrivateKey} />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginBottom: "5px",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <View style={{ width: "80px", height: "80px" }}>
            <Image src={coinkeyPublicAddress} />
          </View>
          <View style={{ paddingLeft: "10px", paddingTop: "5px", flex: 1 }}>
            <Text style={{ fontSize: "14px" }}>Public Address</Text>
            <Text style={{ fontSize: "9px", marginBottom: "5px" }}>
              (Remove any hyphens)
            </Text>
            <Text style={{ fontSize: "10px", flexWrap: "wrap" }}>
              {coinKey.publicAddress}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginBottom: "5px",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <View style={{ width: "80px", height: "80px" }}></View>
          <View style={{ paddingLeft: "10px", paddingTop: "5px", flex: 1 }}>
            <Text style={{ fontSize: "14px", marginBottom: "5px" }}>
              Private WIF
            </Text>
            <Text style={{ fontSize: "10px", flexWrap: "wrap" }}>
              {coinKey.privateWif}
            </Text>
          </View>
          <View style={{ width: "80px", height: "80px" }}>
            <Image src={coinkeyPrivateWIF} />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px dashed #cccccc",
            marginBottom: "5px",
          }}
        ></View>
      </Page>
    </Document>
  );
}
