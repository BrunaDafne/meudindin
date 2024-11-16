import { Button, CloseButton, ContainerButton, Input, Label, LabelButton, ModalContent, ModalOverlay, Select, SelectOption, TitleModal } from "./styles";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { categories } from "../../constants/categories";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { Budget, addBudget } from "../../features/budgetSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function ModalBudget({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    const [valor, setValor] = useState<number | undefined>(undefined);
    const [categoria, setCategoria] = useState<number | undefined>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const {id} = useSelector((state: RootState) => state.user);
    const [message, setMessage] = useState('');
    const [typeAlert, setTypeAlert] = useState<'success' | 'error'>('success');
    const [selectCategorias, setSelectCategorias] = useState<{ id: number; name: string; }[]>();
    const {budgets} = useSelector((state: RootState) => state.budgets);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      const idsCadastrados = budgets.map(({id_category}) => {return id_category});

      const filtrados = categories.filter(({id}) => {
        if (!idsCadastrados.includes(id)) {
          return true;
        }
      });

      setSelectCategorias(filtrados);
    }, []);

    function salvar() {
      try {
        if (!valor || !categoria) {
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

        const novoOrçamento: Budget = {
          id: budgets?.length > 0 ? budgets.length + 1 : 1,
          id_user: id,
          limit: valor,
          id_category: categoria,
          created_date: new Date(),
        }

        dispatch(addBudget(novoOrçamento))

        // Limpar o select
        const categorias = selectCategorias?.filter(({id}) => id !== categoria);
        setSelectCategorias(categorias);
        
        setOpenModal(true);
        setTypeAlert('success');
        setMessage('Orçamento inserido com sucesso');

        setValor(undefined);
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
          <Label>Categoria</Label>
          <Select value={categoria ? categoria : ''} onChange={(e) => 
            setCategoria(Number(e.target.value))
            }>
            <SelectOption value={undefined}>Selecione uma opção</SelectOption>
            {selectCategorias?.map((category) => {
              return (
                <SelectOption value={category.id}>{category.name}</SelectOption>
              )
            })}
          </Select>
          <Label>Valor</Label>
          <Input value={valor ? valor : ''} placeholder="Digite apenas números" type="number" onChange={(e) => setValor(Number(e.target.value))}/>
          <ContainerButton>
            <Button onClick={onClose}>
                <LabelButton>Voltar</LabelButton>
            </Button>
            <Button
            disabled={!valor || !categoria}
            onClick={() => salvar()}
            >
                <LabelButton>Salvar</LabelButton>
            </Button>
          </ContainerButton>
        </ModalContent>
      </ModalOverlay>
    );
  };