interface Props {
  URI: string;
  APIKey?: string;
}

const Get = async (props: Props) => {
  try {
    const response = await fetch(props.URI, {
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
