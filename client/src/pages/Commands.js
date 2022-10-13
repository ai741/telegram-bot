import { Button, Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import { Title } from "../components/Title";
import { fetchCommands, fetchSetCommands } from "../redux/slices/bot";
import { selectCommands } from "../redux/slices/bot";

export const Commands = () => {
  const refCommand = useRef(null);
  const refCommandDesc = useRef(null);
  const commands = useSelector(selectCommands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommands());
  }, []);

  useEffect(() => {
    if (commands) console.log(commands.result);
  }, [commands]);

  const handleSetCommnads = () => {
    let arr = [];
    commands.result.map((obj) => {
      arr.push(obj);
    });

    const command = refCommand.current.value;
    const description = refCommandDesc.current.value;

    arr.push({ command: command, description: description });

    dispatch(
      fetchSetCommands({
        commands: arr,
      })
    );

    console.log(command);
  };

  return (
    <div className="Home">
      <Header />
      <Title value="Команды" />
      <div className="main-container">
        <div className="commands-container">
          {commands?.result.map((obj) => {
            return (
              <Paper elevation={6} sx={{ p: 4, m: 4 }}>
                <div className="commands-item">
                  <span>{obj.command}</span>
                  <div className="commands-btn">
                    <Button variant="contained" color="secondary">
                      Изменить
                    </Button>
                    <Button variant="contained" color="error">
                      Удалить
                    </Button>
                  </div>
                </div>
              </Paper>
            );
          })}
        </div>
      </div>
      <Title value="Создание команды" />
      <div className="main-container">
        <div className="form-container">
          <input variant="outlined" ref={refCommand} />
          <input variant="outlined" ref={refCommandDesc} />
          <Button onClick={handleSetCommnads} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};
