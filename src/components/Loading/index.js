import { Container } from "./style";

import imgLogo from "../../assets/logo.png";

function Loading() {
  return (
    <Container>
      <img src={imgLogo} />
      Carregando...
    </Container>
  );
}

export default Loading;
