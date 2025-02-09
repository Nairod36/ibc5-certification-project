import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Balance } from "./Balance";
import { Button } from "react-bootstrap";

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      {address && <Balance address={address}/>}
      <Button onClick={() => disconnect()} variant={"destructive"}>Disconnect</Button>
    </div>
  );
}