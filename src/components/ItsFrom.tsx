import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";



const PassportForm: React.FC = () => {
    const [status, setStatus] = useState('');
    const statuses = ['Новая работа', 'Промежуточные результаты', 'Завершенная работа']


    const renderAdditionalFiels = () =>{
        if (status === 'Новая работа'){
            return (
                <>
                    <TextField label="Стоимость" variant="outlined" />
                    <TextField label="Исполнитель" variant="outlined" />
                    <TextField type="date" variant="outlined" />

                    <TextField label="Поставщик" variant="outlined" />
                </>
            )
        }
        return null;
    }

    return (
        <Box component='form' sx={{display: 'flex', flexDirection: 'column', width: '300px', gap: 2}}>
            <TextField label="Номер по КАС" variant="outlined"/>
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
            {renderAdditionalFiels()}
            <TextField label="Краткое описание" variant="outlined" multiline rows={4}/>
            <Button variant="contained" component="div" >
                <input type="file"/>
            </Button>

            <Button variant="contained" color="success">Сохранить карточку</Button>

        </Box>
    );
};

export default PassportForm;