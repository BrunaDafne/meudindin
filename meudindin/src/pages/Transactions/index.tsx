import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Container, ContainerTable, TitlePage } from "./styles";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { keyBy, mapValues } from "lodash";
import { Categories } from "../../constants/categories";
import { TypeTransactions } from "../../constants/typeTransactions";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export function Transactions() {
    const {transactions} = useSelector((state: RootState) => state.transactions);
    const {wallets} = useSelector((state: RootState) => state.wallets);
    console.log('transactions na TELA DE TRANSACOES: ', transactions);

    type TransacoesListagem = {
        title: string;
        value: number;
        dateLabel: string;
        date: Date;
        type: string;
        category: string;
        wallet: string;
    };

    const transacoes: TransacoesListagem[] = useMemo(() => {
        const carteiras = mapValues(keyBy(wallets, 'id'), 'title');

        return transactions.map((data) => {
            return {
                title: data.title ? data.title : '',
                value: data.value,
                dateLabel: format(data.date, "dd/MM/yyyy"),
                date: data.date,
                type: TypeTransactions[data.id_type],
                category: Categories[data.id_category],
                wallet: data?.id_wallet ? carteiras[data?.id_wallet] : '',
            };
        })
    }, [transactions, wallets]);

    const columns = useMemo<MRT_ColumnDef<TransacoesListagem>[]>(
        () => [
          {
            enableClickToCopy: true,
            accessorKey: 'dateLabel',
            header: 'Data',
            size: 50,
          },
          {
            enableClickToCopy: true,
            accessorKey: 'title',
            header: 'Título',
          },
          {
            enableClickToCopy: true,
            accessorKey: 'type',
            header: 'Tipo',
          },
          {
            enableClickToCopy: true,
            accessorKey: 'category',
            header: 'Categoria',
          },
          {
            enableClickToCopy: true,
            accessorKey: 'wallet',
            header: 'Conta',
          },
          {
            enableClickToCopy: true,
            accessorKey: 'value',
            header: 'Valor',
          },
        ],
        [],
    );

    const table = useMaterialReactTable<TransacoesListagem>({
        columns,
        data: transacoes,
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
    
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    console.log('selectedDate: ', selectedDate);

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      // Aqui você pode adicionar a lógica para filtrar transações com base no mês e ano selecionados
    };


    return (
        <Container>
            <TitlePage>Transações</TitlePage>
            <Box display="flex" flexDirection="column" alignItems="center">
              <DatePicker
              views={['year', 'month']}
              label="Selecione o mês/ano"
              value={selectedDate}
              onChange={handleDateChange}
              //renderInput={(params) => <TextField {...params} helperText={null} />}
            />
          </Box>
            <ContainerTable>
            <MaterialReactTable 
              table={table} 
            />
            </ContainerTable>
        </Container>
    )
}