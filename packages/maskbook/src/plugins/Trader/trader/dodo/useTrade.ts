import {
    FungibleTokenDetailed,
    getRPCConstants,
    isNative,
    useAccount,
    useBlockNumber,
    useTokenConstants,
    useTraderConstants,
} from '@masknet/web3-shared'
import { useAsyncRetry } from 'react-use'
import { PluginTraderRPC } from '../../messages'
import type { TradeStrategy } from '../../types'
import { useSlippageTolerance } from './useSlippageTolerance'
import { currentChainIdSettings } from '../../../Wallet/settings'
import { first } from 'lodash-es'

export function useTrade(
    strategy: TradeStrategy,
    inputAmount: string,
    outputAmount: string,
    inputToken?: FungibleTokenDetailed,
    outputToken?: FungibleTokenDetailed,
) {
    const { NATIVE_TOKEN_ADDRESS } = useTokenConstants()
    const blockNumber = useBlockNumber()
    const slippage = useSlippageTolerance()
    const chainId = currentChainIdSettings.value
    const { RPC } = getRPCConstants(chainId)
    const provderURL = first(RPC)
    const { DODO_ETH_ADDRESS } = useTraderConstants(chainId)
    const account = useAccount()
    return useAsyncRetry(async () => {
        if (!inputToken || !outputToken) return null
        if (inputAmount === '0') return null
        const sellToken = isNative(inputToken.address) ? { ...inputToken, address: DODO_ETH_ADDRESS ?? '' } : inputToken
        const buyToken = isNative(outputToken.address)
            ? { ...outputToken, address: DODO_ETH_ADDRESS ?? '' }
            : outputToken
        return PluginTraderRPC.swapRoute({
            isNativeSellToken: isNative(inputToken.address),
            fromToken: sellToken,
            toToken: buyToken,
            fromAmount: inputAmount,
            slippage: slippage / 100,
            userAddr: account,
            rpc: provderURL,
            chainId,
        })
    }, [
        NATIVE_TOKEN_ADDRESS,
        strategy,
        inputAmount,
        outputAmount,
        inputToken?.address,
        outputToken?.address,
        slippage,
        blockNumber, // refresh api each block
        account,
        provderURL,
        chainId,
    ])
}
