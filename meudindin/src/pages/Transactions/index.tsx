import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Container, ContainerTable, TitlePage } from "./styles";
import { useMemo, useState } from "react";
import { format, isSameMonth, isSameYear } from "date-fns";
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
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

        return transactions.reduce((acc, item) => {
          if (isSameMonth(item.date, selectedDate) && isSameYear(item.date, selectedDate)) {
            const itemFormatado = {
                title: item.title ? item.title : '',
                value: item.value,
                dateLabel: format(item.date, "dd/MM/yyyy"),
                date: item.date,
                type: TypeTransactions[item.id_type],
                category: Categories[item.id_category],
                wallet: item?.id_wallet ? carteiras[item?.id_wallet] : '',
            };
            acc.push(itemFormatado);
          }
          return acc;
        }, [] as TransacoesListagem[]);
    }, [transactions, wallets, selectedDate]);

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

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };

    return (
        <Container>
            <TitlePage>Transações</TitlePage>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{marginBottom: 1}}>
              <DatePicker
              views={['year', 'month']}
              label="Selecione o mês/ano"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                '& .MuiInputBase-root': {
                  height: 40, 
                },
                '& .MuiFormLabel-root': {
                },
              }}
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