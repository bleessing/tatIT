import React, {useEffect, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
interface Work {
    workNumber: string;
    totalCoast: string;
    limitPeriod: string;
}
interface UpFormProps{
    onSave: (data: any) => void;
}
const UpForm: React.FC<UpFormProps> = ({onSave}) => {
    const [numberKAC, setNumberKAC] = useState<string>('');
    const [works,  setWorks] = useState<Work[]>([])
    const handleAddWork = () =>{
        setWorks([...works, {workNumber: '', limitPeriod: '', totalCoast: ''}])
    }
    const handleWorkChange = (index: number, field: keyof Work, value: string)=> {
        const newWorks = works.map((work, i) =>(i === index ? {...work, [field]: value } : work));
        setWorks(newWorks);
    }
    useEffect(() => {
        const data = {
            numberKAC,
        }
        onSave(data)
    }, [numberKAC]);
    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', width: '100%', gap: 2, }}>
            <TextField label="Номе по КАС" variant="outlined" value={numberKAC} onChange={(e) => setNumberKAC(e.target.value)}  />
            <Button startIcon={<AddCircleIcon/>} onClick={handleAddWork}  variant="contained" color="primary">
                Добавить номер</Button>
            {works.map((work, index) =>(
                <Box key={index} sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <TextField label="Работа ОПР"
                    variant='outlined'
                    value={work.workNumber}
                    onChange={(e) => handleWorkChange(index, 'workNumber', e.target.value)}/>
                    <TextField label="Общая стоимость работы, тыс.руб"
                               variant='outlined'
                               value={work.totalCoast}
                               onChange={(e) => handleWorkChange(index, 'totalCoast', e.target.value)}/>
                    <TextField label="Лимиты на отчетный период, тыс.руб"
                               variant='outlined'
                               value={work.limitPeriod}
                               onChange={(e) => handleWorkChange(index, 'limitPeriod', e.target.value)}/>
                </Box>
            ))}
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

export default UpForm;