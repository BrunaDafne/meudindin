import { Container, ContainerBudgets, ContainerBudgetsTitle, ContainerButtonCostNext, ContainerCardItem, ContainerCardsBudgets, ContainerGraphics, ContainerGraphicsItem, ContainerSection, ContainerTitle, SectionCardBudgets, SubtitleBudget, SubtitleCard, SubtitlePage, TitlePage, icone } from "./styles";
import { TypeCard } from "../../components/CardValues";
import { Button } from "../../components/Button";
import { ButtonMoney } from "../../components/ButtonMoney";
import { CardBudgets } from "../../components/CardBudgets";
import { GraphicBar } from "../../components/Graphic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ModalBudget } from "../../components/ModalBudget";
import { ModalBudgetList } from "../../components/ModalBudgetList";
import { Categories } from "../../constants/categories";
import { Budget as BudgetType } from "../../features/budgetSlice";
import { TypeTransactions } from "../../constants/typeTransactions";

export interface OrcamentoCard extends BudgetType{
    value: number;
    name_category: string;
}

export default function Budget() {
    const [isModalOpen, setModalOpen] = useState(false);
    const {budgets} = useSelector((state: RootState) => state.budgets);
    const [categoriasCard, setCategoriasCard] = useState<OrcamentoCard[]>();
    const [mostrarOrcamentos, setMostrarOrcamentos] = useState<OrcamentoCard[]>();
    const [modalBudget, setModalBudget] = useState(false);

    console.log('categoriasCard: ', categoriasCard);
    console.log('mostrarOrcamentos: ', mostrarOrcamentos);

    const {transactions} = useSelector((state: RootState) => state.transactions);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());


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
        setCategoriasCard(orcamentosFormatados);
        setMostrarOrcamentos(orcamentosFormatados?.slice(0, 6))
    }, [budgets]);

    const valuesGraphic = [
        {
            categoria: 'Educação',
            porcentagem: 4,
        },
        {
            categoria: 'Alimentação',
            porcentagem: 2,
        },
        {
            categoria: 'Lazer',
            porcentagem: 5,
        },
    ]

    function handleModal() {
        setModalOpen((prevState) => !prevState)
    }

    function handleModalBudget() {
        setModalBudget((prevState) => !prevState)
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <Container>
            <ContainerTitle>
                <TitlePage>Orçamentos</TitlePage>
            </ContainerTitle>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" sx={{marginBottom: 1}}>
              <DatePicker
              disabled
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
            <ContainerCardItem height="100%">
                <Button title="Adicionar orçamento" type={TypeCard.success} action={() => handleModal()}/>
            </ContainerCardItem>
          </Box>
            <ModalBudget isOpen={isModalOpen} onClose={handleModal} title="Adicionar orçamento"/>
            <ModalBudgetList isOpen={modalBudget} onClose={handleModalBudget} title="Orçamentos" budgetsParams={categoriasCard}/>
            <ContainerGraphics>
            <ContainerGraphicsItem>
            <SubtitlePage>Orçamentos mais excedidos</SubtitlePage> 
            <SubtitleCard>Nos últimos 6 meses</SubtitleCard> 
            <ContainerSection>
            <GraphicBar data={valuesGraphic} nomeValor={['porcentagem']} indexLabelHorizontal={'categoria'} legendaVertical='Porcentagem' legendaHorizontal="Categoria"/>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem>
            <SubtitlePage>Orçamentos por categoria</SubtitlePage>
            <SubtitleCard>Nos últimos 6 meses</SubtitleCard>
            <ContainerSection width="50vw">
                <ContainerButtonCostNext>
                <ButtonMoney title='Fatura Novembro 2024' value="R$ 350,00" subtitle="Cartão Nubank - 20/08"/>
                </ContainerButtonCostNext>
            </ContainerSection>  
            </ContainerGraphicsItem>
            </ContainerGraphics>
            <ContainerBudgets>
            <ContainerBudgetsTitle>
            <SubtitlePage>Orçamentos</SubtitlePage>
            {categoriasCard && categoriasCard?.length > 6 && 
                <SubtitleBudget onClick={() => handleModalBudget()}>VER TODOS</SubtitleBudget>
            }
            </ContainerBudgetsTitle>
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