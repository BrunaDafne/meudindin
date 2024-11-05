import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, TitleModal } from "./styles";

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
          <Input placeholder="Valor"/>
          <Label>Data</Label>
          <Input />
          <Label>Conta</Label>
          <Input />
          <Label>Categoria</Label>
          <Input />
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