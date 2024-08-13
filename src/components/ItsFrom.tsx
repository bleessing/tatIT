
import React, { useState } from 'react';
import { TextField, Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';




const PassportForm: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const statuses = ['Новая работа', 'Промежуточные результаты', 'Завершенная работа'];
    const [success, setSuccess] = useState<string>('');
    const [resultTransfer, setResultTransfer] = useState<string>('');


    const renderAdditionalFields = () => {
        if (status === "Новая работа") {
            return (
                <Box>

                    <TextField label="Стоимость" variant="outlined" />

                    <TextField label="Исполнитель" variant="outlined" />
                    <Box component="form" sx={{display: 'flex',  gap: "15px"}}>
                        <TextField type="date" variant="outlined"  />
                        <TextField type="date" variant="outlined"  />
                    </Box>


                    <TextField label="Поставщик" variant="outlined" />
                </Box>
            );
        }
        if (status === "Промежуточные результаты") {
            return (
                <>

                    <TextField label="Стоимость" variant="outlined" />

                    <TextField label="Исполнитель" variant="outlined" />
                    <Box component="form" sx={{display: 'flex',  gap: "15px"}}>
                        <TextField type="date" variant="outlined"  />
                        <TextField type="date" variant="outlined"  />
                    </Box>


                    <TextField label="Поставщик" variant="outlined" />
                </>
            );
        }
        if (status === "Завершенная работа") {
            return (
                <>
                    <FormControl fullWidth>
                        <InputLabel id="success-label">Успешность</InputLabel>
                        <Select
                            labelId="success-label"
                            value={success}
                            label="Успешность"
                            onChange={(e) => setSuccess(e.target.value as string)}
                        >
                            <MenuItem value="Положительная">Положительная</MenuItem>
                            <MenuItem value="Неуспешная">Неуспешная</MenuItem>
                            <MenuItem value="Стоп-лист">Стоп-лист</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="result-transfer-label">Передача результатов</InputLabel>
                        <Select
                            labelId="result-transfer-label"
                            value={resultTransfer}
                            label="Передача результатов"
                            onChange={(e) => setResultTransfer(e.target.value as string)}
                        >
                            <MenuItem value="Лучшая практика">Лучшая практика</MenuItem>
                            <MenuItem value="Без создания ЛП">Без создания ЛП</MenuItem>
                        </Select>
                    </FormControl>
                </>
            );
        }
        return null;
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column',  gap: 2 }}>
            <TextField label="Номер по КАС" variant="outlined" />
            <FormControl fullWidth>
                <InputLabel id="status-label">Статус</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    label="Статус"
                    onChange={(e) => setStatus(e.target.value as string)}
                >
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {renderAdditionalFields()}
            <TextField label="Краткое описание" variant="outlined" multiline rows={4} />
            <Button variant="contained" component="label">
                Прикрепить
                <input type="file" hidden />
            </Button>
            <Button variant="contained" color="success">
                Сохранить карточку
            </Button>
        </Box>
    );
};

export default PassportForm;
