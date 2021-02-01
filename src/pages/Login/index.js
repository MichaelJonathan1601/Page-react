import Input from "../../components/Input";
import { Container, FormLogin, Header, Body, Button } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", login);

      console.log(response.data);

      //implementar a autorização

      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>BEM VINDO AO SENAIOVERFLOW</h1>
          <h2>O SEU PORTAL DE RESPOSTAS</h2>
        </Header>
        <Body>
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={login.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={login.password}
            handler={handleInput}
            required
          />
          <Button>Entrar</Button>
          <Link to="/register">Ou clique aqui para se cadastrar</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;