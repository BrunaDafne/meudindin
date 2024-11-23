import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, Select, SelectOption, TitleModal } from "./styles";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { Wallet, addWallet } from "../../features/walletSlice";
import { bankingInstitutions } from "../../constants/bankingInstitutions";
import { setValues } from "../../features/userSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function ModalBalanceCreate({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState<number | undefined>(undefined);
    const [banking, setBanking] = useState<number | undefined>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const {id, receita} = useSelector((state: RootState) => state.user);
    const wallets = useSelector((state: RootState) => state.wallets.wallets);
    const [message, setMessage] = useState('');
    const [typeAlert, setTypeAlert] = useState<'success' | 'error'>('success');
    const dispatch = useDispatch<AppDispatch>();

    function salvar() {
      try {
        if (!valor || !titulo || !banking) {
          setOpenModal(true);
          setTypeAlert('error');
          setMessage('Preencha todos os campos');
          return;
        }

        if (!id) {
          setOpenModal(true);
          setTypeAlert('error');
          setMessage('Não foi possível inserir dados nesse usuário');
          return;
        }

        const novaCarteira: Wallet = {
          id: wallets?.length > 0 ? wallets.length + 1 : 1,
          id_user: id,
          title: titulo,
          value: valor,
          id_banking_institution: banking,
          created_at: new Date(),
        }
        dispatch(addWallet(novaCarteira))

        const valoresAtualizar = {
          receita: (receita !== null && receita !== undefined ? receita + valor : valor),
        };
        dispatch(setValues(valoresAtualizar));
        
        setOpenModal(true);
        setTypeAlert('success');
        setMessage('Transação inserida com sucesso');

        setTitulo('');
        setValor(undefined);
        setBanking(undefined);
      } catch {
        setOpenModal(true);
        setTypeAlert('error');
        setMessage('Ocorreu um erro, tente novamente');
      }
    }

    return (
      <ModalOverlay onClick={onClose}>
        <Snackbar
            open={openModal}
            autoHideDuration={3000}
            onClose={() => setOpenModal(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        <Alert severity={typeAlert} sx={{ width: '100%' }}>
        {message}
        </Alert>
        </Snackbar>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <TitleModal>{title}</TitleModal>
          <Label>Título</Label>
          <Input value={titulo} placeholder="Título" maxLength={30} onChange={(e) => setTitulo(e.target.value)}/>
          <Label>Valor</Label>
          <Input value={valor ? valor : ''} placeholder="Digite apenas números" type="number" onChange={(e) => setValor(Number(e.target.value))}/>
          <Label>Banco</Label>
          <Select key={'conta'} value={banking ? banking : ''} onChange={(e) => 
            setBanking(Number(e.target.value))}>
            <SelectOption value={undefined} >Selecione uma opção</SelectOption>
            {bankingInstitutions.map(({name, id}) => {
              return (
                <SelectOption value={id}>{name}</SelectOption>
              )
            })}
          </Select>
          <ContainerButton>
            <Button onClick={onClose}>
                <LabelButton>Voltar</LabelButton>
            </Button>
            <Button
            disabled={!titulo || !valor || !banking}
            onClick={() => salvar()}
            >
                <LabelButton>Salvar</LabelButton>
            </Button>
          </ContainerButton>
        </ModalContent>
      </ModalOverlay>
    );
  };