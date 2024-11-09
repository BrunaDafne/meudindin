import { DatePicker } from "@mui/x-date-pickers";
import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, Select, SelectOption, TitleModal } from "./styles";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import { categories } from "../../constants/categories";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { TypeTransactions } from "../../constants/typeTransactions";
import { updateWallet } from "../../features/walletSlice";
import { addTransaction } from "../../features/transactionsSlice";
import { setValues } from "../../features/userSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function Modal({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState<number | undefined>(undefined);
    const [data, setData] = useState<Date | null>();
    const [conta, setConta] = useState<number | undefined>(undefined);
    const [categoria, setCategoria] = useState<number | undefined>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const {id, receita, despesa} = useSelector((state: RootState) => state.user);
    console.log('ID DO USUARIO: ', id, receita, despesa);
    const wallets = useSelector((state: RootState) => state.wallets.wallets);
    const [message, setMessage] = useState('');
    const {transactions} = useSelector((state: RootState) => state.transactions);
    const dispatch = useDispatch<AppDispatch>();
    console.log('valor de transações NO MODALLL: ', transactions);
    console.log('valor de wallets NO MODALLLL: ', wallets);
    console.log('dados dos campos: ', titulo, valor, data, conta, categoria);

    function salvar() {
      try {
        if (!valor) {
          setOpenModal(true);
          setMessage('Sem valor inserido');
          return;
        }

        if (!conta) {
          setOpenModal(true);
          setMessage('Sem conta inserida');
          return;
        }

        console.log('clicou no salvar');
        const novaTransacao = {
          id: 1,
          id_user: id,
          id_type: TypeTransactions.Receita,
          title: titulo,
          value: valor,
          date: data,
          id_wallet: conta,
          id_category: categoria,
          created_date: new Date(),
        }
        console.log('valor de novaTransacao: ', novaTransacao);
        dispatch(addTransaction(novaTransacao))
        const carteira = wallets.find(({id}) => id === conta);
        // ATUALIZAR VALOR GERAL
        dispatch(updateWallet({id: conta, value: (carteira?.value ? carteira.value + valor : valor)}))
        const valoresAtualizar = {
          receita: (receita !== null && receita !== undefined ? receita + valor : valor),
        };
        console.log('valoresAtualizar: ', valoresAtualizar);
        dispatch(setValues(valoresAtualizar));
        
        setOpenModal(true);
        setMessage('Transação inserida com sucesso');

        setTitulo('');
        setValor(undefined);
        setData(null);
        setConta(undefined);
        setCategoria(undefined);
      } catch {
        setOpenModal(true);
        setMessage('Ocorreu um erro, tente novamente');
      }
    }

    // useEffect(() => {
    //   dispatch(updateWallet({id: 2, value: 3502}))
    // }, []);

    return (
      <ModalOverlay onClick={onClose}>
        <Snackbar
            open={openModal}
            autoHideDuration={5000}
            onClose={() => setOpenModal(false)}
            message={message}
        />
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <TitleModal>{title}</TitleModal>
          <Label>Título</Label>
          <Input value={titulo} placeholder="Título" maxLength={30} onChange={(e) => setTitulo(e.target.value)}/>
          <Label>Valor</Label>
          <Input value={valor} placeholder="Digite apenas números" type="number" onChange={(e) => setValor(Number(e.target.value))}/>
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
          <Select  value={conta}  onChange={(e) => 
            setConta(Number(e.target.value))}>
            <SelectOption value={undefined} >Selecione uma opção</SelectOption>
            {wallets.map(({title, id}) => {
              return (
                <SelectOption value={id}>{title}</SelectOption>
              )
            })}
          </Select>
          <Label>Categoria</Label>
          <Select value={categoria} onChange={(e) => 
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