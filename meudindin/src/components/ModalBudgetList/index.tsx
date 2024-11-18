import { CloseButton, ContainerTable, LabelButton, ModalContent, ModalOverlay, TitleModal } from "./styles";
import { useMemo, useState } from "react";
import { Alert, Box, IconButton, Snackbar, Tooltip } from "@mui/material";
import { AppDispatch, RootState } from "../../app/store";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { OrcamentoCard } from "../../pages/Budget";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { setBudgets } from "../../features/budgetSlice";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    budgetsParams?: OrcamentoCard[];
}

export function ModalBudgetList({ isOpen, onClose, title, budgetsParams }: ModalProps) {
    if (!isOpen) return null;
    console.log('orçamentos listagem passados por parametro: ', budgetsParams);
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState('');
    const [typeAlert, setTypeAlert] = useState<'success' | 'error'>('success');
    const {budgets} = useSelector((state: RootState) => state.budgets);
    console.log('listagem de orçamentos STORE: ', budgets);
    const [orcamentos, setOrcamentos] = useState(budgetsParams);
    const dispatch = useDispatch<AppDispatch>();

  function deleteBudget(idDelete: number) {
    const orcamentosFiltrados = orcamentos?.filter(({id}) => id !== idDelete);
    setOrcamentos(orcamentosFiltrados);
    dispatch(setBudgets(orcamentosFiltrados));
  }

  // Deletar
  const openDeleteConfirmModal = (row: MRT_Row<OrcamentoCard>) => {
    if (window.confirm('Deseja deletar esse orçamento? ação não poderá ser desfeita')) {
      deleteBudget(row.original.id);
    }
  };

  const columns = useMemo<MRT_ColumnDef<OrcamentoCard>[]>(
      () => [
        {
          enableClickToCopy: true,
          accessorKey: 'name_category',
          header: 'Categoria',
        },
        {
          enableClickToCopy: true,
          accessorKey: 'limit',
          header: 'Meta',
          size: 150, 
        },
        {
          enableClickToCopy: true,
          accessorKey: 'value',
          header: 'Gasto',
          size: 150,
        },
      ],
      [],
    );

    const table = useMaterialReactTable<OrcamentoCard>({
      columns,
      data: orcamentos ? orcamentos : [],
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
        sorting: [{ id: 'dateLabel', desc: true }],
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