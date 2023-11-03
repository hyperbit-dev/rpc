"use client";

import {
  Cell,
  ClipboardButton,
  Container,
  NextLink,
  PageHeader,
  SectionHeader,
} from "@/components";
import { Header } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { getNetwork } from "@/lib/blockchain/network";
import { GetBlockchainInfoResponse } from "@/types/api";
import { useState } from "react";

export default function Content({
  blockchain,
  masternodes,
  blockchainInfo,
}: {
  blockchain: string;
  masternodes: any;
  blockchainInfo: GetBlockchainInfoResponse;
}) {
  const [query, setQuery] = useState("");
  const [showBanned, setShowBanned] = useState(false);

  if (!Object.keys(masternodes).length) {
    return (
      <Container>
        <PageHeader>Masternodes Not Found</PageHeader>
      </Container>
    );
  }

  const nodes = Object.keys(masternodes)
    .filter((key) =>
      showBanned ? true : masternodes[key].status !== "POSE_BANNED"
    )
    .map((key) => ({ ...masternodes[key], id: key }))
    .sort((a, b) => (a.lastpaidblock > b.lastpaidblock ? 1 : -1));

  const filteredNodes = nodes.filter((node) =>
    node.address.toLowerCase().includes(query.toLowerCase())
  );
  const bannedNodes = Object.keys(masternodes).filter(
    (key) => masternodes[key].status === "POSE_BANNED"
  );

  const network = getNetwork(blockchain);

  return (
    <Container
      className="flex flex-col flex-1 overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      <SectionHeader>
        <div className="flex items-center justify-between">
          {network?.name} Masternodes
          <div className="flex items-center gap-4">
            <label htmlFor="show-banned" className="flex gap-2 text-sm">
              <input
                id="show-banned"
                type="checkbox"
                checked={showBanned}
                onChange={() => setShowBanned(!showBanned)}
              />
              <span>Show Banned ({bannedNodes.length})</span>
            </label>
            <span className="text-sm">
              Total: {Object.keys(masternodes).length}
            </span>
          </div>
        </div>
      </SectionHeader>

      <input
        type="text"
        name="query"
        placeholder="Search by address..."
        className="w-full p-3 mb-4 text-sm bg-white border border-gray-200 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <SectionCard className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-auto">
            <div className="grid grid-cols-[50px_minmax(150px,auto)_125px_150px_150px_150px_200px_150px_110px]">
              <Header></Header>
              <Header>Address</Header>
              <Header>Status</Header>
              <Header>Protx Tx Hash</Header>
              <Header>Collateral</Header>
              <Header>Payee</Header>
              <Header>Last Paid Time</Header>
              <Header>Last Paid Block</Header>
              <Header>Est. Position</Header>
            </div>
            {filteredNodes.map((node) => {
              const position = Math.abs(
                blockchainInfo.blocks - (node.lastpaidblock + nodes.length)
              );
              const positionDisplay =
                node.status === "POSE_BANNED" ? "N/A" : position;
              return (
                <div
                  key={node.id}
                  className="grid grid-cols-[50px_minmax(150px,auto)_125px_150px_150px_150px_200px_150px_110px] group"
                >
                  <Cell>
                    <ClipboardButton value={JSON.stringify(node, null, 2)} />
                  </Cell>
                  <Cell>{node.address}</Cell>
                  <Cell>{node.status}</Cell>
                  <Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/transactions/${node.proTxHash}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {node.proTxHash.slice(0, 4)}...
                      {node.proTxHash.slice(
                        node.proTxHash.length - 4,
                        node.proTxHash.length
                      )}
                    </NextLink>
                  </Cell>
                  <Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/addresses/${node.collateraladdress}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {node.collateraladdress.slice(0, 4)}...
                      {node.collateraladdress.slice(
                        node.collateraladdress.length - 4,
                        node.collateraladdress.length
                      )}
                    </NextLink>
                  </Cell>
                  <Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/addresses/${node.payee}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {node.payee.slice(0, 4)}...
                      {node.payee.slice(
                        node.payee.length - 4,
                        node.payee.length
                      )}
                    </NextLink>
                  </Cell>
                  <Cell>
                    {new Date(node.lastpaidtime * 1000).toLocaleDateString()}{" "}
                    {new Date(node.lastpaidtime * 1000).toLocaleTimeString()}
                  </Cell>
                  <Cell>{node.lastpaidblock}</Cell>
                  <Cell>{positionDisplay}</Cell>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </Container>
  );
}
