import { Button } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import { Title } from "../components/Title";
import { fetchCommands, fetchMe, fetchSetCommands } from "../redux/slices/bot";
import { selectBotData, selectCommands } from "../redux/slices/bot";

export const Home = () => {
  const refText = useRef(null);
  const refCommand = useRef(null);
  const refCommandDesc = useRef(null);
  const dispatch = useDispatch();
  const dataInfo = useSelector(selectBotData);
  const commands = useSelector(selectCommands);

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

  const handleGetMe = () => {
    dispatch(fetchMe());
    if (dataInfo) console.log(dataInfo);
  };

  const handleGetCommnads = () => {
    dispatch(fetchCommands());
    if (commands) console.log(commands);
  };

  const handleSetCommnads = () => {
    dispatch(
      fetchSetCommands({
        params: {
          command: "/sadf",
          description: "sadfsdf",
        },
      })
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
      <Title value="Статистика" />
      <div className="main-container">
        <Button onClick={handleGetMe} variant="contained">
          Получить
        </Button>
      </div>
      <Title value="Команды" />
      <div className="main-container">
        <Button onClick={handleGetCommnads} variant="contained">
          Получить
        </Button>
      </div>
      <Title value="Создание команды" />
      <div className="main-container">
        <input ref={refCommand} />
        <input ref={refCommandDesc} />
        <Button onClick={handleSetCommnads} variant="contained">
          Отправить
        </Button>
      </div>
    </div>
  );
};
