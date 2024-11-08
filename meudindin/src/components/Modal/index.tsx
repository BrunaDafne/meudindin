import { DatePicker } from "@mui/x-date-pickers";
import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, Select, SelectOption, TitleModal } from "./styles";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import { categories } from "../../constants/categories";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function Modal({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number>();
    const [data, setData] = useState<Date | null>();
    const [conta, setConta] = useState('');
    const [categoria, setCategoria] = useState<number>();
    const [openModal, setOpenModal] = useState(false);

    function salvar() {
      console.log('clicou no salvar');
    }

    return (
      <ModalOverlay onClick={onClose}>
        <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => {}}
            message="Teste"
        />
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <TitleModal>{title}</TitleModal>
          <Label>Descrição</Label>
          <Input placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)}/>
          <Label>Valor</Label>
          <Input placeholder="Digite apenas números" type="number" onChange={(e) => setValor(Number(e.target.value))}/>
          <Label>Data</Label>
          <DatePicker 
            sx={{backgroundColor: colors.input }} 
            onChange={(e) => setData(e)}
            minDate={new Date()} format="dd/MM/yyyy"  
            slotProps={{
            openPickerButton: { color: 'info' },
            popper: {
              disablePortal: true,
            },
            textField: {
              variant: 'filled',
              color: 'info',
              sx: {
                zIndex: 2,
                backgroundColor: colors.input,
                borderRadius: '8px',
                height: '40px', // Ajuste a altura desejada
                popper: {
                  sx: { backgroundColor: colors.blue }  // Ajusta o z-index do calendário
                },
                marginTop: '5px',
                '& .MuiInputBase-root': { height: '100%',  borderRadius: '8px', }, // Garante que o input preencha a altura total
              },
            },
            }}
          />
          <Label>Conta</Label>
          <Select>
            <SelectOption value="">Selecione uma opção</SelectOption>
            <SelectOption value="opcao1">Opção 1</SelectOption>
            <SelectOption value="opcao2">Opção 2</SelectOption>
            <SelectOption value="opcao3">Opção 3</SelectOption>
          </Select>
          <Label>Categoria</Label>
          <Select onChange={(e) => 
            setCategoria(Number(e.target.value))
            }>
            <SelectOption value="">Selecione uma opção</SelectOption>
            {categories.map((category) => {
              return (
                <SelectOption value={category.id}>{category.name}</SelectOption>
              )
            })}
          </Select>
          <ContainerButton>
            <Button onClick={onClose}>
                <LabelButton>Voltar</LabelButton>
            </Button>
            <Button
            disabled={!descricao || !valor || !data || !conta || !categoria}
            onClick={() => salvar()}
            >
                <LabelButton>Salvar</LabelButton>
            </Button>
          </ContainerButton>
        </ModalContent>
      </ModalOverlay>
    );
  };