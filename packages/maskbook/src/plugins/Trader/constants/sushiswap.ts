import { ChainId } from '@masknet/web3-shared'
import { DAI, MSKA, MSKB, MSKC, RUNE, SUSHI, USDC, USDT, WBTC, WETH, WETH_ONLY, YAM } from './trader'
import type { ERC20AgainstToken, ERC20TokenCustomizedBase } from './types'

/**
 * Some tokens can only be swapped via certain pairs,
 * so we override the list of bases that are considered for these tokens.
 */
export const SUSHISWAP_CUSTOM_BASES: ERC20TokenCustomizedBase = {}

export const SUSHISWAP_BASE_AGAINST_TOKENS: ERC20AgainstToken = {
    ...WETH_ONLY,
    [ChainId.Mainnet]: [WETH, DAI, USDC, USDT, SUSHI, YAM, WBTC, RUNE].map((x) => x[ChainId.Mainnet]),
    [ChainId.Rinkeby]: [WETH, MSKA, MSKB, MSKC].map((x) => x[ChainId.Rinkeby]),
}
