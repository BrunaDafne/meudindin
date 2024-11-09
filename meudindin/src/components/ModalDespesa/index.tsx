import { DatePicker } from "@mui/x-date-pickers";
import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, Select, SelectOption, TitleModal } from "./styles";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { categories } from "../../constants/categories";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { TypeTransactions } from "../../constants/typeTransactions";
import { updateWallet } from "../../features/walletSlice";
import { Transaction, addTransaction } from "../../features/transactionsSlice";
import { setValues } from "../../features/userSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function ModalDespesa({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState<number | undefined>(undefined);
    const [data, setData] = useState<Date | null>();
    const [conta, setConta] = useState<number | undefined>(undefined);
    const [categoria, setCategoria] = useState<number | undefined>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const {id, despesa} = useSelector((state: RootState) => state.user);
    const {wallets} = useSelector((state: RootState) => state.wallets);
    const [message, setMessage] = useState('');
    const [typeAlert, setTypeAlert] = useState<'success' | 'error'>('success');
    //const {transactions} = useSelector((state: RootState) => state.transactions);
    const dispatch = useDispatch<AppDispatch>();

    function salvar() {
      try {
        if (!valor || !data || !categoria || !conta) {
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

        const novaTransacao: Transaction = {
          id: 1,
          id_user: id,
          id_type: TypeTransactions.Despesa,
          title: titulo,
          value: valor,
          date: data,
          id_wallet: conta,
          id_category: categoria,
          created_date: new Date(),
        }

        dispatch(addTransaction(novaTransacao))
        const carteira = wallets.find(({id}) => id === conta);

        if (carteira?.value) {
          dispatch(updateWallet({id: conta, value: carteira.value - valor }))
        }
       
        const valoresAtualizar = {
          despesa: (despesa !== undefined && despesa !== null ? despesa + valor : valor),
        };
        dispatch(setValues(valoresAtualizar));
        
        setOpenModal(true);
        setTypeAlert('success');
        setMessage('Transação inserida com sucesso');

        setTitulo('');
        setValor(undefined);
        setData(null);
        setConta(undefined);
        setCategoria(undefined);
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
          <Label>Data</Label>
          <DatePicker 
            value={data} 
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
          <Select key={'conta'} value={conta ? conta : ''} onChange={(e) => 
            setConta(Number(e.target.value))}>
            <SelectOption value={undefined} >Selecione uma opção</SelectOption>
            {wallets.map(({title, id}) => {
              return (
                <SelectOption value={id}>{title}</SelectOption>
              )
            })}
          </Select>
          <Label>Categoria</Label>
          <Select value={categoria ? categoria : ''} onChange={(e) => 
            setCategoria(Number(e.target.value))
            }>
            <SelectOption value={undefined}>Selecione uma opção</SelectOption>
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
            disabled={!titulo || !valor || !data || !conta || !categoria}
            onClick={() => salvar()}
            >
                <LabelButton>Salvar</LabelButton>
            </Button>
          </ContainerButton>
        </ModalContent>
      </ModalOverlay>
    );
  };