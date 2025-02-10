import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Connector, useConnect } from "wagmi";

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({
  connector,
  onClick,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button onClick={onClick} disabled={!ready} variant="outline">{connector.name}</Button>
  );
}