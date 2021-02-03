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

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { signOut, getUser } from "../../services/security";
import { useHistory } from "react-router";

function Profile() {
  return (
    <>
      <section>
        <img src={imgProfile} alt="Imagem de perfil" />
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

function Answer({ answer }) {
  return (
    <section>
      <header>
        <img src={imgProfile} />
        <strong>por {answer.Student.name}</strong>
        <p> {answer.created_at}</p>
      </header>
      <p>{answer.description}</p>
    </section>
  );
}

function Question({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState(question.Answers);

  const qtdAnswers = answers.length;

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    if (newAnswer.length < 10) return alert("Minimo de caracteres: 10");

    try {
      const response = await api.post(`/questions/${question.id}/answers`, {
        description: newAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.student.id,
          name: aluno.name,
        },
      };

      setAnswers([...answers, answerAdded]);

      setNewAnswer("");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} />
        <strong>por {question.Student.name}</strong>
        <p>em {question.created_at}</p>
      </header>
      <section>
        <strong>{question.title} </strong>
        <p>{question.description}</p>
        <img src={question.image} />
      </section>
      <footer>
        <h1 onClick={() => setShowAnswers(!showAnswers)}>
          {qtdAnswers === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdAnswers}
              {qtdAnswers > 1 ? " Respostas " : " Resposta "}
            </>
          )}
        </h1>
        {showAnswers && (
          <>
            {" "}
            {answers.map((answer) => (
              <Answer answer={answer} />
            ))}
          </>
        )}
        <form onSubmit={handleAddAnswer}>
          <textarea
            placeholder="Responda essa dúvida!"
            onChange={(e) => setNewAnswer(e.target.value)}
            required
          >
            {" "}
            {newAnswer}
          </textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");

      setQuestions(response.data);
    };

    loadQuestions();
  }, []);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <IconSignOut onClick={handleSignOut} />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          {questions.map((q) => (
            <Question question={q} />
          ))}
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma pergunta</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
