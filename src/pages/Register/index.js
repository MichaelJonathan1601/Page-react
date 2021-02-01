import Input from "../../components/Input";
import { Container, FormLogin, Header, Body, Button } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

function Register() {
  const history = useHistory();

  const [register, setRegister] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
    validPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/students", register);

      console.log(response.data);

      //implementar a autorização

      history.push("/students");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>BEM VINDO AO SENAIOVERFLOW</h1>
          <h2>INFORME OS SEUS DADOS</h2>
        </Header>
        <Body>
          <Input
            id="ra"
            label="RA"
            type="text"
            value={register.ra}
            handler={handleInput}
            required
          />
          <Input
            id="name"
            label="Nome"
            type="text"
            value={register.name}
            handler={handleInput}
            required
          />
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={register.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={register.password}
            handler={handleInput}
            required
          />
          <Input
            id="validPassword"
            label="Confirmar Senha"
            type="password"
            value={register.validPassword}
            handler={handleInput}
            required
          />
          <Button>Enviar</Button>
          <Link to="/">Ou, se já tem cadastro, clique para entrar</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
