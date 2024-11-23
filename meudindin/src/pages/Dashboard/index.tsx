import { Container, ContainerBudgets, ContainerButtonCostNext, ContainerCard, ContainerCardItem, ContainerCardsBudgets, ContainerGraphics, ContainerGraphicsItem, ContainerSection, ContainerTitle, ContainerTitleBalance, SectionCardBudgets, SubtitleBalace, SubtitlePage, TitlePage, icone } from "./styles";
import { CardValues, TypeCard } from "../../components/CardValues";
import { Button } from "../../components/Button";
import { ButtonMoney } from "../../components/ButtonMoney";
import { CardBudgets } from "../../components/CardBudgets";
import { GraphicBar } from "../../components/Graphic";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { ModalDespesa } from "../../components/ModalDespesa";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { OrcamentoCard } from "../Budget";
import { Categories } from "../../constants/categories";
import { TypeTransactions } from "../../constants/typeTransactions";
import { Transaction } from "../../features/transactionsSlice";
import { isSameMonth } from "date-fns";
import { groupBy, map, orderBy } from "lodash";
import { ModalBalanceList } from "../../components/ModalBalanceList";

export default function Dashboard() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalDespesaOpen, setModalDespesaOpen] = useState(false);
    const {receita, despesa, name} = useSelector((state: RootState) => state.user);
    const {wallets} = useSelector((state: RootState) => state.wallets);
    const {budgets} = useSelector((state: RootState) => state.budgets);
    const {transactions} = useSelector((state: RootState) => state.transactions);
    const [topCategories, setTopCategories] = useState<{ categoria: string; porcentagem: number }[]>([]);
    const [mostrarOrcamentos, setMostrarOrcamentos] = useState<OrcamentoCard[]>();
    const [modalBalance, setModalBalance] = useState(false);

    useEffect(() => {
        const categorySums = transactions.reduce((acc, transaction) => {
            if (transaction.id_type === TypeTransactions.Despesa) {
              acc[transaction.id_category] = (acc[transaction.id_category] || 0) + transaction.value;
            }
            return acc;
          }, {} as Record<number, number>);
        
        const orcamentosFormatados: OrcamentoCard[] = budgets.map(budget => ({
            ...budget,
            value: categorySums[budget.id_category] || 0, // Adiciona 0 caso não tenha transações
            name_category: Categories[budget.id_category],
        }));
        setMostrarOrcamentos(orcamentosFormatados?.slice(0, 6))
    }, [budgets]);

    function handleModal() {
        setModalOpen((prevState) => !prevState)
    }

    function handleModalDespesa() {
        setModalDespesaOpen((prevState) => !prevState)
    }

    function handleModalBalance() {
        setModalBalance((prevState) => !prevState)
    }

    // Função para obter as 3 categorias mais gastas do mês
    function getTopCategories(transactions: Transaction[]): { categoria: string; porcentagem: number }[] {
    // Pegar o início e fim do mês atual
    const now = new Date();
  
    // Filtrar transações que pertencem ao mês atual
    const thisMonthTransactions = transactions.filter(
      (transaction) => isSameMonth(transaction.date, now) && transaction.id_type === TypeTransactions['Despesa']
    );
  
    // Agrupar as transações pelo campo `id_category`
    const groupedByCategory = groupBy(thisMonthTransactions, 'id_category');
  
    // Somar os valores de cada categoria
    const categoryTotals = map(groupedByCategory, (transactions, id_category) => {
      const total = transactions.reduce((sum, transaction) => sum + transaction.value, 0);
      return {
        categoria: Categories[parseInt(id_category)], // Pegar o nome da categoria do enum
        total,
      };
    });
  
    // Somar o valor total de todas as transações
    const overallTotal = categoryTotals.reduce((sum, category) => sum + category.total, 0);
  
    // Calcular porcentagem e ordenar as categorias pelo total gasto
    const withPercentages = categoryTotals.map((category) => ({
      categoria: category.categoria,
      porcentagem: parseFloat(((category.total / overallTotal) * 100).toFixed(2)), // Limitar a 2 casas decimais
    }));
  
    // Ordenar as categorias por porcentagem e pegar as 3 primeiras
    return orderBy(withPercentages, ['porcentagem'], ['desc']).slice(0, 3);
  }

  useEffect(() => {
    if (transactions.length > 0) {
        setTopCategories(getTopCategories(transactions));
    }
  }, [transactions]);

    return (
        <Container>
            <ContainerTitle>
                <TitlePage>Bem vindo(a), {name}</TitlePage>
            </ContainerTitle>
            <ContainerCard>
            <ContainerCardItem>
            <CardValues title="Receita mensal" subtitle={`R$ ${receita}`} type={TypeCard.success}/>
            </ContainerCardItem>
            <ContainerCardItem>
            <CardValues title="Despesa mensal" subtitle={`R$ ${despesa}`} type={TypeCard.error}/>
            </ContainerCardItem>
            <ContainerCardItem height="60%">
                <Button title="Adicionar receita" type={TypeCard.success} action={() => handleModal()}/>
            </ContainerCardItem>
            <ContainerCardItem height="60%">
                <Button title="Adicionar despesa" type={TypeCard.error} action={() => handleModalDespesa()} />
            </ContainerCardItem>
            </ContainerCard>
            <Modal isOpen={isModalOpen} onClose={handleModal} title="Adicionar receita"/>
            <ModalDespesa isOpen={isModalDespesaOpen} onClose={handleModalDespesa} title="Adicionar despesa"/>

            <ContainerGraphics>
            <ContainerGraphicsItem>
            <SubtitlePage>Gastos do mês</SubtitlePage> 
            <ContainerSection>
            <GraphicBar data={topCategories} nomeValor={['porcentagem']} indexLabelHorizontal={'categoria'} legendaVertical='Porcentagem' legendaHorizontal="Categoria"/>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem>
            <SubtitlePage>Próximas despesas</SubtitlePage>
            <ContainerSection>
                <ContainerButtonCostNext>
                <ButtonMoney title='Fatura Novembro 2024' value="R$ 350,00" subtitle="Cartão Nubank - 20/08"/>
                </ContainerButtonCostNext>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem>
            <ContainerTitleBalance>
            <SubtitlePage>Saldos</SubtitlePage>
            {
                wallets?.length > 0 && 
                <SubtitleBalace onClick={() => handleModalBalance()}>VER TODOS</SubtitleBalace>
            }   
            </ContainerTitleBalance>
            <ContainerSection>
                {
                    wallets.map(({id, title, value}) => {
                        return (
                        <ContainerButtonCostNext key={`${id}+${title}`}>
                            <ButtonMoney title={title} value={`R$ ${value}`} />
                        </ContainerButtonCostNext>  
                        )
                    })
                }
            </ContainerSection>  
            </ContainerGraphicsItem>
            </ContainerGraphics>
            <ModalBalanceList isOpen={modalBalance} title="Carteiras" onClose={() => handleModalBalance()}/>
            <ContainerBudgets>
            <SubtitlePage>Orçamentos</SubtitlePage>
            <ContainerCardsBudgets>
                {
                    mostrarOrcamentos?.map(({name_category, limit, value}) => {
                        return (
                        <SectionCardBudgets>
                            <CardBudgets title={name_category} goalValue={limit} expenseValue={value} />
                        </SectionCardBudgets>
                        )
                    })
                }
            </ContainerCardsBudgets>
            </ContainerBudgets>
        </Container>
    )
}