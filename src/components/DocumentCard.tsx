// src/components/DocumentCard.tsx
import React, { useState } from 'react';
import ItsFrom from "./ItsFrom";
import { MenuItem, Select, Button,  Box, FormControl, InputLabel } from '@mui/material';
import PassportForm from "./PassportForm";
import UpForm from "./UpForm";
import ApplicationForm from "./ApplicationForm";
import KfipForm from './KfipForm'
import ContractForm from "./ContractForm";
import AdditionalAgreementForm from "./AdditionalAgreementForm";





const DocumentCard: React.FC = () => {
    const [documentType, setDocumentType] = useState('');
    const documentTypes = [
        'Паспорт',
        'ИТС',
        'УК',
        'Заявка для КФИП',
        'КФИП',
        'Договор',
        'Доп. соглашение',
    ];
    const [formData, setFormData] = useState<any>({});
    const handleDocumentTypeChange = (event: React.ChangeEvent<{value: unknown}>) =>{
        setDocumentType(event.target.value as string);
        setFormData({});
    }
    const handleSaveData = (data: any) =>{
        setFormData(data)
    }
    const handleExportToJson = () =>{
        const json = JSON.stringify(formData, null, 2);
        console.log(json)

        const blob = new Blob([json], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json'
        a.click()
        URL.revokeObjectURL(url);
    }


    const renderForm = () =>{
        switch (documentType){
            case 'ИТС':
                return <ItsFrom />
            case "Паспорт":
                return <PassportForm />
            case "УК":
                return <UpForm onSave={handleSaveData} />
            case "Заявка для КФИП":
                return <ApplicationForm onSave={handleSaveData} />
            case "КФИП":
                return <KfipForm onSave={handleSaveData} />
            case "Договор":
                return <ContractForm onSave = {handleSaveData} />
            case "Доп. соглашение":
                return <AdditionalAgreementForm onSave={handleSaveData}/>
        }
    }

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '500px', gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="document-type-label">Тип документа</InputLabel>
                <Select
                    labelId="document-type-label"
                    value={documentType}
                    label="Тип документа"
                    onChange={(e) => setDocumentType(e.target.value as string)}
                >
                    {documentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            {renderForm()}
            <Button variant='contained' color='secondary' onClick={handleExportToJson}>export</Button>
        </Box>
    );
};

export default DocumentCard;
