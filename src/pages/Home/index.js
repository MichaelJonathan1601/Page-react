import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
  Logo,
  IconSignOut,
} from "./styles";

import { FaSignOutAlt } from "react-icons/fa";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";

function Profile() {
  return (
    <>
      <section>
        <img src={imgProfile} />
        <a href="#">Editar Foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>Fulano de tal</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>1234567</p>
      </section>
      <section>
        <strong>E-MAIL:</strong>
        <p>fulano@gmail.com</p>
      </section>
    </>
  );
}

function Home() {
  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <IconSignOut />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>por Ciclano da Silva</strong>
              <p>em 12/12/2012 as 12:12</p>
            </header>
            <section>
              <strong>Titulo </strong>
              <p>Descrição</p>
              <img src="https://raddevon.com/wp-content/uploads/2018/10/react.jpg" />
            </section>
            <footer>
              <h1>11 Resposta</h1>
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>por Fulano</strong>
                  <p> 12/12/2012 as 12:12</p>
                </header>
                <p>Resposta para a pergunta.</p>
              </section>
              <form>
                <textarea
                  placeholder="Responda essa dúvida!"
                  required
                ></textarea>
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCard>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>por Ciclano da Silva</strong>
              <p>em 12/12/2012 as 12:12</p>
            </header>
            <section>
              <strong>Titulo </strong>
              <p>Descrição</p>
              <img src="https://raddevon.com/wp-content/uploads/2018/10/react.jpg" />
            </section>
            <footer>
              <h1>11 Resposta</h1>
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>por Fulano</strong>
                  <p> 12/12/2012 as 12:12</p>
                </header>
                <p>Resposta para a pergunta.</p>
              </section>
              <form>
                <textarea
                  placeholder="Responda essa dúvida!"
                  required
                ></textarea>
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCard>
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma pergunta</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
