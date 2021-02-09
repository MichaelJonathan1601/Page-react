import Input from "../../components/Input";
import { Container, FormLogin, Header, Body, Button } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
import { signIn } from "../../services/security";
import Loading from "../../components/Loading";
import { set } from "date-fns";

function Register() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

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
      if (register.password !== register.validPassword)
        return alert("senhas diferentes");

      const objectRegister = {
        ra: register.ra,
        name: register.name,
        email: register.email,
        password: register.password,
      };

      setLoading(true);

      const response = await api.post("/students", objectRegister);

      signIn(response.data);

      setLoading(false);

      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
  };

  const buttonDisabled = () => {
    const { ra, name, email, password, validPassword } = register;

    if (!ra || !name || !email || !password || password !== validPassword)
      return true;

    return false;
  };

  return (
    <>
      {loading && <Loading></Loading>}
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
              onBlur={(e) => {
                if (register.password !== register.validPassword)
                  alert("As senhas precisam ser iguais");
                e.target.focus();
              }}
              value={register.validPassword}
              handler={handleInput}
              required
            />

            <Button disabled={buttonDisabled()}>Enviar</Button>
            <Link to="/">Ou, se já tem cadastro, clique para entrar</Link>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Register;
