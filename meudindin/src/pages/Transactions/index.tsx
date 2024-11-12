import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Container, TitlePage } from "./styles";
import { useMemo } from "react";
import { format } from "date-fns";
import { keyBy, mapValues } from "lodash";
import { Categories } from "../../constants/categories";
import { TypeTransactions } from "../../constants/typeTransactions";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';

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
    }, []);

    const columns = useMemo<MRT_ColumnDef<TransacoesListagem>[]>(
        () => [
          {
            accessorKey: 'dateLabel',
            header: 'Data',
            size: 150,
          },
          {
            accessorKey: 'title',
            header: 'Título',
            size: 150,
          },
          {
            accessorKey: 'type',
            header: 'Tipo',
            size: 150,
          },
          {
            accessorKey: 'category',
            header: 'Categoria',
            size: 150,
          },
          {
            accessorKey: 'wallet',
            header: 'Conta',
            size: 150,
          },
          {
            accessorKey: 'value',
            header: 'Valor',
            size: 150,
          },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        transacoes,
      });
    
    return (
        <Container>
            <TitlePage>Transações</TitlePage>
            {/* <MaterialReactTable table={table} /> */}
        </Container>
    )
}