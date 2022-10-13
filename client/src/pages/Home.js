import { Button } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { Header } from "../components/Header";
import { Title } from "../components/Title";

export const Home = () => {
  const refText = useRef(null);

  const handleSubmit = async () => {
    const inputText = refText.current.value;
    console.log(inputText);

    await axios.post(
      "https://api.telegram.org/bot5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA/sendMessage",
      {
        chat_id: 423724975,
        text: inputText,
      }
    );
  };
  return (
    <div className="Home">
      <Header />
      <Title value="Отправка сообщения" />
      <div className="main-container">
        <input ref={refText} />
        <Button onClick={handleSubmit} variant="contained">
          Отправить
        </Button>
      </div>
    </div>
  );
};
