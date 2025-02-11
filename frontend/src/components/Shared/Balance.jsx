import { formatEther } from "viem"
import { useBalance } from "wagmi"

export const Balance = (props) => {
    const {data: balance} = useBalance({address:props.address, chainId:43112})

    console.log(balance)
    
    if(!balance)return null
    return (
        <>
            <div>{`Balance : ${formatEther(balance.value)} ${balance.symbol}`}</div>
        </>
    )
}