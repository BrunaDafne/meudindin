import { CloseButton, ContainerTable, ModalContent, ModalOverlay, TitleModal } from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Alert, Box, IconButton, Snackbar, Tooltip } from "@mui/material";
import { AppDispatch, RootState } from "../../app/store";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useDispatch, useSelector } from "react-redux";
import { Wallet, setWallets } from "../../features/walletSlice";
import { BankingInstitutions } from "../../constants/bankingInstitutions";
import { setValues } from "../../features/userSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

interface Carteira extends Wallet{
  banking: string;
}

export function ModalBalanceList({ isOpen, onClose, title }: ModalProps) {
    if (!isOpen) return null;
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState('');
    const [typeAlert, setTypeAlert] = useState<'success' | 'error'>('success');
    const {wallets} = useSelector((state: RootState) => state.wallets);
    const [carteiras, setCarteiras] = useState<Carteira[]>();
    const {receita} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    function deleteBalance(idDelete: number) {
      const carteiraDeletar = carteiras?.find(({id}) => id === idDelete);
      const carteirasFiltradas = carteiras?.filter(({id}) => id !== idDelete);

      const storeWallets = wallets?.filter(({id}) => id !== idDelete);

      if (receita && carteiraDeletar) {
        const valoresAtualizar = {
          receita: receita - carteiraDeletar?.value,
        };
        dispatch(setValues(valoresAtualizar));
      }

      setCarteiras(carteirasFiltradas);
      dispatch(setWallets(storeWallets));
    }

    const openDeleteConfirmModal = (row: MRT_Row<Carteira>) => {
      if (window.confirm('Deseja deletar essa carteira? ação não poderá ser desfeita')) {
        deleteBalance(row.original.id);
      }
    };

  useEffect(() => {
    setCarteiras(wallets.map((wallet) => {
      return {
        ...wallet,
        banking: BankingInstitutions[wallet.id_banking_institution],
      }
    }));
  }, [wallets]);

  const columns = useMemo<MRT_ColumnDef<Carteira>[]>(
      () => [
        {
          enableClickToCopy: true,
          accessorKey: 'title',
          header: 'Nome',
          size: 150, 
        },
        {
          enableClickToCopy: true,
          accessorKey: 'value',
          header: 'Valor',
          size: 150, 
        },
        {
          enableClickToCopy: true,
          accessorKey: 'banking',
          header: 'Banco',
          size: 200,
        },
      ],
      [],
    );

    const table = useMaterialReactTable<Carteira>({
      columns,
      data: carteiras ? carteiras : [],
      enableRowActions: true,
      positionActionsColumn: 'last',
      renderRowActions: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Apagar">
            <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
              <Icon icon={'line-md:close-circle-filled'} width="20" height="20" 
                            style={{marginRight: 10}}
                            />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      muiSearchTextFieldProps: {
        placeholder: 'Pesquisar',
      },
      initialState: {
        density: 'compact',
      },
      muiPaginationProps: {
        rowsPerPageOptions: [10],
      },
  });

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
          <ContainerTable>
          <MaterialReactTable 
              table={table} 
            />
          </ContainerTable>
        </ModalContent>
      </ModalOverlay>
    );
  };