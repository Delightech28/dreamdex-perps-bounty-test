import {
  SOMNIA_HIDEKI_TESTNET_ADDRESSES,
  SomniaMarkets,
} from "@somnia-chain/markets-sdk";
import { hidekiTestnet } from "@somnia-chain/markets-sdk/chains";

async function main() {
  // Read-only connection (no private key needed for this proof)
  const markets = new SomniaMarkets({
    chain: hidekiTestnet,
    indexerUrl: "https://hideki-dev.smk.somnia.host/v1/graphql",
    addresses: SOMNIA_HIDEKI_TESTNET_ADDRESSES,
  });

  console.log("Connected to Somnia Tokyo (Hideki) testnet");

  // List available Perp markets
  const perps = await markets.client.listPerpMarkets();
  console.log(`Found ${perps.length} perp markets:`);

  perps.forEach((m) => {
    console.log(`- ${m.baseSymbol}-PERP | Pool: ${m.poolAddress}`);
  });

  // Optional: show BTC market details
  const btc = perps.find((m) => m.baseSymbol === "BTC");
  if (btc) {
    console.log("\nBTC-PERP details:");
    console.log(btc);
  }

  console.log("\n✅ Successfully used @somnia-chain/markets-sdk on Tokyo testnet");
}

main().catch(console.error);