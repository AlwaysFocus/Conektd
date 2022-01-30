import { Endpoint } from "../Interfaces/Endpoint";

interface Props {
  endpoint: Endpoint
}

const Get = async (props: Props) => {
  try {
    const response = await fetch(props.endpoint.URI, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    return json;

  } catch {
    return null;
  }
};

export default Get;
