import Link from 'next/link';

import { useMoralis, useWeb3Contract, useChain } from 'react-moralis';
import { abi } from '../../constants/abi';
import { contractAddress } from '../../constants/contract';
import { useEffect } from 'react';
import { Moralis } from 'moralis-v1';
import { useState } from 'react';
import { whitelistedAddresses } from '../../constants/whitelist';

const HomeOneCta = () => {

    const { enableWeb3, isWeb3Enabled, account, chainId } = useMoralis();
    const { switchNetwork } = useChain();
    const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract();
    let [mintAmount, setMintAmount] = useState(1);
    let [claimable, setClaimable] = useState(false);
    let [totalSupply, setTotalSupply] = useState(0);
    const mainnetChainId = '0x1e14';
    const testnetChainId = '0x2e4'
    const mintFee = chainId === testnetChainId ? 1 : 12; // If not Testnet, 12
    const maxSupply = 3333;

    useEffect(() => {
        if (account) {
            whitelistedAddresses.forEach((address) => {
                if (account.toLowerCase().localeCompare(address.toLowerCase()) === 0) {
                    setClaimable(true);
                }
            })
        }
    }, [account])

    const decrementMintAmount = () => {
        if (mintAmount > 1) {
            setMintAmount(mintAmount - 1);
        }
    }

    const incrementMintAmount = () => {
        setMintAmount(mintAmount + 1);
    }

    const mintOptions = {
        abi,
        contractAddress,
        functionName: 'mint',
        params: {
            _mintAmount: mintAmount,
        },
        msgValue: Moralis.Units.Token(mintFee * mintAmount, 18)
    };

    const claimOptions = {
        abi,
        contractAddress,
        functionName: 'claim'
    };

    const totalSupplyOptions = {
        abi,
        contractAddress,
        functionName: 'totalSupply'
    }

    useEffect(() => {
        if (chainId && chainId !== mainnetChainId) { //Should be 0x1e14, hex of 7700
            // console.log('CHAINID: ', chainId);
            switchNetwork(mainnetChainId)
        }
    }, [chainId]);

    useEffect(() => {
        runContractFunction({ params: totalSupplyOptions })
            .then((result) => {
                setTotalSupply(parseInt(result?._hex, 16))
            })
    }, [isWeb3Enabled])

    return (
        <>
            <div id="uni_minting" className="uni-cta uk-section uk-section-2xlarge@m uk-panel uk-overflow-hidden">
                <div className="uk-container">
                    <div className="uk-card uk-flex-center uk-text-center">
                        <div className="uk-panel uk-width-xlarge@m uk-position-z-index" data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;">
                            <h2 className="uk-h3 uk-heading-d1@m">Mint Your Pal</h2>
                            {isWeb3Enabled ?
                                <>
                                    <div>
                                        <button onClick={() => decrementMintAmount()} className="uk-button uk-button-small uk-button-large@m uk-button-gradient uk-margin-small-top uk-margin-large-top@m">-</button>
                                        <span disabled={true} className="uk-button uk-button-small uk-button-large@m uk-button-gradient uk-margin-small-top uk-margin-large-top@m mintAmount">{mintAmount}</span>
                                        <button onClick={() => incrementMintAmount()} className="uk-button uk-button-small uk-button-large@m uk-button-gradient uk-margin-small-top uk-margin-large-top@m">+</button>
                                    </div>
                                    <button onClick={() => runContractFunction({ params: mintOptions })} disabled={isFetching} className="uk-button uk-button-small uk-button-large@m uk-button-gradient uk-margin-small-top uk-margin-large-top@m mintButton">Mint</button>
                                    <p>{`${totalSupply} / ${maxSupply} NFTs have been minted so far.`}</p>
                                    {claimable &&
                                        <button onClick={() => runContractFunction({ params: claimOptions })} disabled={isFetching} className="uk-button uk-button-small uk-button-large@m uk-button-gradient uk-margin-small-top uk-margin-large-top@m">Claim</button>
                                    }
                                </> :
                                <button onClick={() => enableWeb3()} className="uk-button uk-button-small uk-button-large@m uk-button-gradient uk-margin-small-top uk-margin-large-top@m">Connect Wallet</button>
                            }
                        </div>
                    </div>
                    {error?.data?.message &&
                        <div className="uk-panel uk-margin-medium-top uk-margin-2xlarge-top@m">
                            <ul className="uk-card uk-card-small uk-card-large@m uk-radius uk-radius-large@m uk-width-2xlarge@m uk-margin-auto uk-box-shadow-xsmall dark:uk-background-white-5" data-uk-accordion="collapsible: false" data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;">
                                <li>
                                    <div className="uk-accordion-content uk-padding-small-bottom">
                                        <p className="uk-text-small uk-text-large@m uk-text-muted">Insufficient Balance. Require {mintFee * mintAmount} CANTOs (plus gas) to mint.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    }
                    {data && data?.hash && !isLoading &&
                        <div className="uk-panel uk-margin-medium-top uk-margin-2xlarge-top@m">
                            <ul className="uk-card uk-card-small uk-card-large@m uk-radius uk-radius-large@m uk-width-2xlarge@m uk-margin-auto uk-box-shadow-xsmall dark:uk-background-white-5" data-uk-accordion="collapsible: false" data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;">
                                <li>
                                    <div className="uk-accordion-content uk-padding-small-bottom">
                                        <p className="uk-text-small uk-text-large@m uk-text-muted">Transaction Successful. <Link href={`https://${chainId === testnetChainId ? 'testnet-explorer.canto.neobase.one' : 'evm.explorer.canto.io'}/tx/${data?.hash}`} target={'_blank'}>Check Block Explorer.</Link> (It may take a few minutes for the Transaction to get confirm though.)</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    }
                    {isLoading &&
                        <div className="uk-panel uk-margin-medium-top uk-margin-2xlarge-top@m">
                            <ul className="uk-card uk-card-small uk-card-large@m uk-radius uk-radius-large@m uk-width-2xlarge@m uk-margin-auto uk-box-shadow-xsmall dark:uk-background-white-5" data-uk-accordion="collapsible: false" data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;">
                                <li>
                                    <div className="uk-accordion-content uk-padding-small-bottom">
                                        <p className="uk-text-small uk-text-large@m uk-text-muted">Your Transaction is being processed. Please wait!</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default HomeOneCta;