import { CloseButton, ContainerTable, ModalContent, ModalOverlay, TitleModal } from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { RootState } from "../../app/store";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useSelector } from "react-redux";
import { Wallet } from "../../features/walletSlice";
import { BankingInstitutions } from "../../constants/bankingInstitutions";

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

  useEffect(() => {
    setCarteiras(wallets.map((wallet) => {
      return {
        ...wallet,
        banking: BankingInstitutions[wallet.id_banking_institution],
      }
    }));
  }, []);

  const columns = useMemo<MRT_ColumnDef<Carteira>[]>(
      () => [
        {
          enableClickToCopy: true,
          accessorKey: 'title',
          header: 'Nome',
          size: 200, 
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