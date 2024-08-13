// src/components/PassportForm.tsx
import React, {useEffect, useState} from 'react';
import { TextField, Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Stage {
    kpStage: string;
    performer: string;
    term: Date | null;
    cost: string;
}

const PassportForm: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [stages, setStages] = useState<Stage[]>([]);
    const statuses = ['Новая работа', 'Промежуточные результаты', 'Завершенная работа'];
    const [success, setSuccess] = useState<string>('');
    const [resultTransfer, setResultTransfer] = useState<string>('');

    const handleAddStage = () => {
        setStages([...stages, { kpStage: '', performer: '', term: null, cost: '' }]);
    };

    const handleStageChange = (index: number, field: keyof Stage, value: any) => {
        const newStages = stages.map((stage, i) => (i === index ? { ...stage, [field]: value } : stage));
        setStages(newStages);
    };
    useEffect(() => {
        const data ={
            status,

        }

    }, []);

    const renderAdditionalFields = () => {
        if (status === 'Новая работа') {
            return (
                <>
                    <TextField label="Стоимость" variant="outlined" value={status} />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <DatePicker
                            label="Срок выполнения"
                            value={date}
                            onChange={(newValue: Date | null) => setDate(newValue)}
                            renderInput={(params:any )=> <TextField {...params} />}
                            inputFormat="dd.MM.yyyy"
                        />
                    </LocalizationProvider>
                    <TextField label="Исполнитель" variant="outlined" />
                    <TextField label="Поставщик" variant="outlined" />
                    <TextField label="Номер этапа КП" variant="outlined" />
                    <TextField label="Название этапа КП" variant="outlined" />
                    {stages.map((stage, index) => (
                        <Box key={index} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <TextField
                                label="Этап КП"
                                variant="outlined"
                                value={stage.kpStage}
                                onChange={(e) => handleStageChange(index, 'kpStage', e.target.value)}
                            />
                            <TextField
                                label="Исполнитель"
                                variant="outlined"
                                value={stage.performer}
                                onChange={(e) => handleStageChange(index, 'performer', e.target.value)}
                            />
                            <Box component="form" sx={{display: 'flex', gap: "15px"}}>
                                <TextField type="date" variant="outlined"/>
                                <TextField type="date" variant="outlined"/>
                            </Box>


                            <TextField
                                label="Стоимость этапа"
                                variant="outlined"
                                value={stage.cost}
                                onChange={(e) => handleStageChange(index, 'cost', e.target.value)}
                            />
                            <hr/>
                        </Box>

                    ))}
                    <Button startIcon={<AddCircleIcon />} onClick={handleAddStage} variant="outlined" color="primary">
                        Добавить этап
                    </Button>
                </>
            );
        }
        if (status === "Промежуточные результаты"){
            return(
                <>
                    <TextField label="Краткое описание" variant="outlined" multiline rows={4} />
                </>
            )
        }
        if (status === "Завершенная работа"){
            return(
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
                    <TextField variant="outlined" label="Номер ЛП"/>
                </>
            )
        }
        return null;
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
