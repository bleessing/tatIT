// src/components/SupplementaryAgreementForm.tsx
import React, {useEffect, useState} from 'react';
import {TextField, Box, Button, IconButton, FormControlLabel, Checkbox, InputLabel} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Stage {
    kpStage: string;
    h: boolean;
    z: boolean;
    term: string;
    cost: string;
}
interface AdditionalAgreementProps{
    onSave: (data: any) => void;
}

const AdditionalAgreementForm: React.FC<AdditionalAgreementProps> = ({onSave}) => {
    const [stages, setStages] = useState<Stage[]>([]);
    const [description, setDescription] = useState<string>('');
    const [numberKAC, setNumberKAC] = useState<string>('');
    const [kpStageNumber, setKpStageNumber] = useState<string>('');
    const [startAt, setStartAt] = useState<string>('');
    const [endAt, setEndAt] = useState<string>('');

    useEffect(() =>{
        const data = {
            numberKAC,
            kpStageNumber,
            stages,
            description,
            startAt,
            endAt
        }
        onSave(data)
    }, [numberKAC, kpStageNumber, stages, description, startAt, endAt, onSave]);

    const handleAddStage = () => {
        setStages([...stages, {kpStage: '', h: false, z: false, term: '', cost: ''}]);
    };

    const handleStageChange = (index: number, field: keyof Stage, value: any) => {
        const newStages = stages.map((stage, i) => (i === index ? {...stage, [field]: value} : stage));
        setStages(newStages);
     };



    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Номер по КАС" variant="outlined" value={numberKAC} onChange={(e) => setNumberKAC(e.target.value)} />
            <TextField label="Номер этапа КП" variant="outlined" value={kpStageNumber} onChange={(e) => setKpStageNumber(e.target.value)} />

            <Button startIcon={<AddCircleIcon />} onClick={handleAddStage} variant="contained" color="primary">
                Добавить номер
            </Button>

            {stages.map((stage, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, flexDirection: 'column',   }}>
                    <TextField
                        label="Этап КП"
                        variant="outlined"
                        value={stage.kpStage}
                        onChange={(e) => handleStageChange(index, 'kpStage', e.target.value)}
                    />
                    <FormControlLabel sx={{color: 'black'}}
                        control={
                            <Checkbox
                                checked={stage.h}
                                onChange={(e) => handleStageChange(index, 'h', e.target.checked)}
                            />
                        }
                        label="З"
                    />
                    <FormControlLabel sx={{color: 'black'}}
                        control={
                            <Checkbox
                                checked={stage.z}
                                onChange={(e) => handleStageChange(index, 'z', e.target.checked)}
                            />
                        }
                        label="H"
                    />
                    <Box component="form" sx={{display: 'flex',  gap: "15px"}}>

                        <TextField type="date" variant="outlined" value={startAt} onChange={(e)=> setStartAt(e.target.value)} />
                        <TextField type="date" variant="outlined" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
                    </Box>
                    <TextField
                        label="Стоимость этапа"
                        variant="outlined"
                        value={stage.cost}
                        onChange={(e) => handleStageChange(index, 'cost', e.target.value)}
                    />
                </Box>
            ))}

            <TextField label="Краткое Описание причин" variant="outlined" multiline rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>

            <Button variant="contained" component="label">
                Прикрепить
                <input type="file" hidden />
            </Button>

            <Button variant="contained" color="success">
                Сохранить карточку
            </Button>
            <Button variant="contained" color="success" >JSON</Button>
        </Box>
    );
};

export default AdditionalAgreementForm;
