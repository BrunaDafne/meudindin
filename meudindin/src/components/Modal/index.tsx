import { DatePicker } from "@mui/x-date-pickers";
import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, Select, SelectOption, TitleModal } from "./styles";
import { colors } from "../../styles/colors";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function Modal({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;

    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <TitleModal>{title}</TitleModal>
          <Label>Descrição</Label>
          <Input placeholder="Descrição"/>
          <Label>Valor</Label>
          <Input placeholder="Digite apenas números" />
          <Label>Data</Label>
          <DatePicker 
            sx={{backgroundColor: colors.input }} 
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
          {/* <Label>Categoria</Label>
          <Input placeholder="Categoria" /> */}
          <Label>Categoria</Label>
          <Select>
            <SelectOption value="">Selecione uma opção</SelectOption>
            <SelectOption value="opcao1">Opção 1</SelectOption>
            <SelectOption value="opcao2">Opção 2</SelectOption>
            <SelectOption value="opcao3">Opção 3</SelectOption>
          </Select>
          <ContainerButton>
            <Button onClick={onClose}>
                <LabelButton>Voltar</LabelButton>
            </Button>
            <Button>
                <LabelButton>Salvar</LabelButton>
            </Button>
          </ContainerButton>
        </ModalContent>
      </ModalOverlay>
    );
  };