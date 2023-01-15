interface Props {
  headers: {
    key: string;
    value: string;
  }[];
}

function setUserAgent(props: Props) {
  const { headers } = props;
  for (let index = 0; index < headers.length; index++) {
    const header = headers[index];

    Object.defineProperty(navigator, header.key, {
      get: () => header.value,
    });
  }
}
export default setUserAgent;
