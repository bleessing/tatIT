import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const KfipApplicationForm = () => {
    const [status, setStatus]= useState<string>('');
    const statuses = ['Доведение', 'Возврат'];
    const [limit, setLimit] = useState<string>('')
    const limits = ['Инвестиции', 'Эксплуатационные затраты']
    return (
        <Box component='form' sx={{display: 'flex', flexDirection: 'column', gap: 2, }}>
            <TextField label='Номер по КАС' variant='outlined'/>
            <FormControl fullWidth>
                <InputLabel id="status-label">Статус</InputLabel>
                <Select
                labelId='status-label'
                value={status}
                label='Статус'
                onChange={(e)=> setStatus(e.target.value as string)}>
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="limit-label">
                    Тип лимитов
                </InputLabel>
                <Select
                label='Тип лимитов'
                value={limit}
                labelId="limit-label"
                onChange={(e)=> setLimit(e.target.value as string)}>
                    {limits.map((limit) =>(
                        <MenuItem key={limit} value={limit}>{limit}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label='Получатель' variant='outlined'/>
            <TextField label='Размер финансирования' variant='outlined'/>
            <TextField label='Размер освоения' variant='outlined'/>
            <TextField label='Заявка на финансирование (номер документа)' variant='outlined'/>
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

export default KfipApplicationForm;