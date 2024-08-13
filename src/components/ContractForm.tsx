import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

interface ContractFormProps{
    onSave: (data: any) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({onSave}) => {

    const contracts = ["Заказ - наряд", "Договор поставки", "Выполнение услуг", "Безвозмездная передача", "НТУ"]

    const [numberKAC, setNumberKAC] = useState<string>('');
    const [contractType, setContractType] = useState<string>('')
    const [contractNumber, setContractNumber] = useState<string>('');
    const [executor, setExecutor] = useState<string>('')
    const [provider, setProvider] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [startAt, setStartAt] = useState<string>('');
    const [endAt, setEndAt] = useState<string>('');

    useEffect(() =>{
        const data = {
            numberKAC,
            contractType,
            contractNumber,
            executor,
            provider,
            price,
            startAt,
            endAt
        }
        onSave(data)
    }, [numberKAC, executor, contractNumber, contractType, provider, price, startAt, endAt, onSave]);





    return (
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2  }}>
            <TextField label="Номер по КАС" variant="outlined" value={numberKAC} onChange={(e) => setNumberKAC(e.target.value)} />
            <FormControl fullWidth>
                <InputLabel id="contract-label">
                    Тип договора
                </InputLabel>
                <Select
                labelId="contract-label"
                label='Тип договора'
                value={contractType}
                onChange={(e) => setContractType(e.target.value as string)}>
                    {contracts.map((contract) => (
                        <MenuItem key={contract} value={contract}>{contract}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label="Номер договора" variant="outlined" value={contractNumber} onChange={(e) => setContractNumber(e.target.value)} />
            <TextField label="Исполнитель" variant="outlined" value={executor} onChange={(e) => setExecutor(e.target.value)} />
            <TextField label="Поставщик" variant="outlined" value={provider} onChange={(e) => setProvider(e.target.value)} />
            <TextField label="Стоимость" variant="outlined"  value={price} onChange={(e) => setPrice(e.target.value)} />
            <Box component="form" sx={{display: 'flex',   justifyContent: "space-between", }}>
                <TextField type="date" variant="outlined" value={startAt} onChange={(e)=> setStartAt(e.target.value)} />
                <TextField type="date" variant="outlined"  value={endAt} onChange={(e) => setEndAt(e.target.value)}/>
            </Box>
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

export default ContractForm;