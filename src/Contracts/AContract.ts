
import Web3 from 'web3'
import {Contract as Web3Contract} from 'web3-eth-contract'
import {AbiItem} from 'web3-utils';

import Account from '../Account'

export default abstract class AContract {

    private name: string
    private web3: Web3
    private abi: AbiItem[]
    private address: string
    protected contract: Web3Contract
    

    constructor(name: string) {
        this.name = name
    }

    load(web3: Web3, abi?:AbiItem[], address?: string) {
        this.web3= web3
        this.abi = abi
        this.address = address
        if ( abi && address ) {
            this.contract = new web3.eth.Contract(abi, address)
        }
    }

    getAccountAddress(accountAddress: string | Account): string {
        let address = <string>accountAddress
        if (typeof accountAddress  === 'object' && accountAddress.constructor.name === 'Account') {
            address = (<Account>accountAddress).getAddress()
        }
        return address
    }
    toEther(amountWei: string): string {
        return this.web3.utils.fromWei(amountWei, 'ether')
    }
    getName(): string {
        return this.name
    }
    getWeb3(): Web3 {
        return this.web3
    }
    getAbi(): AbiItem[] {
        return this.abi
    }
    getAddress(): string {
        return this.address
    }
    getWeb3Contract(): Web3Contract {
        return this.contract
    }
}
