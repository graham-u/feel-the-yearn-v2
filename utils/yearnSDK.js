import { JsonRpcProvider } from "@ethersproject/providers";

// Setting addresses to WEB3 endpoint causes fall back to hardcoded config in SDK
// which is what we want when not developing for SDK backend.
export const Addresses = process.env.NEXT_PUBLIC_WEB3_PROVIDER;

import { Yearn } from "@yfi/sdk";

const url = process.env.NEXT_PUBLIC_WEB3_PROVIDER;
const provider = new JsonRpcProvider(url);

const yearn = new Yearn(1, {
  provider,
  addresses: Addresses,
});

export default yearn;
