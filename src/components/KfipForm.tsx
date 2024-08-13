import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

interface KfipFormProps{
    onSave: (data: any) => void;
}
const KfipForm: React.FC<KfipFormProps>= ({ onSave}) => {
    const [status, setStatus]= useState<string>('');
    const [source, setSource] = useState<string>('')
    const [limit, setLimit] = useState<string>('')
    const [numberKAC, setNumberKAC] = useState<string>('');
    const [recipient, setRecipient] = useState<string>('')
    const [financeSize, setFinanceSize] = useState<string>('')
    const [masteringSize, setMasteringSize] = useState<string>('')
    const [financeApplication, setFinanceApplication] = useState<string>('')

    const statuses = ['Доведение', 'Возврат'];
    const sources = ['Бюджет УК', 'Резерв УК']
    const limits = ['Инвестиции', 'Эксплуатационные затраты']

    useEffect(() =>{
        const data ={
            numberKAC,
            status,
            limit,
            source,
            recipient,
            financeSize,
            masteringSize,
            financeApplication,
        }
        onSave(data)
    }, [numberKAC,status, limit, recipient, source, financeSize, masteringSize, financeApplication, onSave])




    return (
        <Box component='form' sx={{display: 'flex', flexDirection: 'column', gap: 2, }}>
            <TextField label='Номер по КАС' variant='outlined' value={numberKAC} onChange={(e)=> setNumberKAC(e.target.value)}/>
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
            <FormControl fullWidth>
                <InputLabel id="source-label">
                    Источник
                </InputLabel>
                <Select
                labelId='source-label'
                label='Источник'
                value={source}
                onChange={(e) => setSource(e.target.value as string)}>
                    {sources.map((source) => (
                        <MenuItem key={source} value={source}>{source}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label='Получатель' variant='outlined' value={recipient} onChange={(e) => setRecipient(e.target.value )}/>
            <TextField label='Размер финансирования' variant='outlined' value={financeSize} onChange={(e) => setFinanceSize(e.target.value)} />
            <TextField label='Размер освоения' variant='outlined' value={masteringSize} onChange={(e) => setMasteringSize(e.target.value)} />
            <TextField label='Заявка на финансирование (номер документа)' variant='outlined' value={financeApplication} onChange={(e) => setFinanceApplication(e.target.value)}/>
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

export default KfipForm;