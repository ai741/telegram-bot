import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import { Title } from "../components/Title";
import {
  fetchCommands,
  fetchSetCommands,
  fetchDeleteCommands,
} from "../redux/slices/bot";
import { selectCommands } from "../redux/slices/bot";

export const Commands = () => {
  //Ссылки  с полей создания
  const refCommand = useRef(null);
  const refCommandDesc = useRef(null);
  //Ссылки для полей измений
  const refChangeCommand = useRef(null)
  const refChangeDesc = useRef(null)
  //Стейт для полей изменения
  const [changeIndex, setChangeIndex] = useState(0);


  const commands = useSelector(selectCommands);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  //Нижние функции для  открытия и закрытия окна изменения
  const handleClickOpen = (e) => {
    setChangeIndex(e.target.closest("[data-index]").dataset.index);
    console.log(changeIndex);
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    window.location.reload();
    alert("Добавлена новая команда");
    window.location.reload()
  };

  const handleDeleteCommand = (e) => {
    const index = e.target.closest("[data-index]").dataset.index;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Удалить")) {
      let arr = [];
      commands.result.map((obj) => {
        arr.push(obj);
      });
      if (index !== -1) {
        arr.splice(index, 1);
      }
      console.log(arr);
      dispatch(fetchDeleteCommands());
      dispatch(
        fetchSetCommands({
          commands: arr,
        })
      );
      // window.location.reload();
      dispatch(fetchCommands());
    }
  };

  const handlePatchCommand = () => {
    const command = refChangeCommand.current.value;
    const description = refChangeDesc.current.value;
    const elem = {command: command, description: description}
    console.log(command, description);
    let arr = [];
    // eslint-disable-next-line array-callback-return
    commands.result.map((obj) => {
      arr.push(obj);
    });
    if (changeIndex !== -1) {
      arr.splice(changeIndex, 1, elem);
    }
    console.log(arr);
    dispatch(fetchDeleteCommands());
    dispatch(
      fetchSetCommands({
        commands: arr,
      })
    );
    window.location.reload();
    // dispatch(fetchCommands());

    handleClose();

  };

  return (
    <div className="Home">
      <Header />

      <Title value="Создание команды" />
      <div className="main-container">
        <div className="form-container">
          <input
            placeholder="Название"
            className="command-input"
            variant="outlined"
            ref={refCommand}
          />
          <input
            placeholder="Текст"
            className="command-input"
            variant="outlined"
            ref={refCommandDesc}
          />
          <Button onClick={handleSetCommnads} variant="contained">
            Создать
          </Button>
        </div>
      </div>
      <Title value="Команды" />
      <div className="main-container">
        <div className="commands-container">
          {commands?.result.map((obj, index) => {
            return (
              <Paper elevation={6} sx={{ p: 4, m: 4 }}>
                <div className="commands-item">
                  <span>{obj.command}</span>
                  <div className="commands-btn">
                    {/* Кнопка изменения */}
                    <Button
                      variant="contained"
                      onClick={handleClickOpen}
                      color="secondary"
                      data-index={index}
                    >
                      Изменить
                    </Button>

                    {/* Диалоговое окно */}
                    {open ? (
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Изменение</DialogTitle>
                        <DialogContent>
                          <div className="dialog-inputs">
                            <input
                              placeholder="Название"
                              className="command-input"
                              variant="outlined"
                              ref={refChangeCommand}
                            />
                            <input
                              placeholder="Текст"
                              className="command-input"
                              variant="outlined"
                              ref={refChangeDesc}
                            />
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Отменить</Button>
                          <Button
                            variant="contained"
                            onClick={handlePatchCommand}
                          >
                            Изменить
                          </Button>
                        </DialogActions>
                      </Dialog>
                    ) : null}

                    {/* Кнопка удаления */}
                    <Button
                      onClick={handleDeleteCommand}
                      data-index={index}
                      variant="contained"
                      color="error"
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </Paper>
            );
          })}
        </div>
      </div>
    </div>
  );
};
