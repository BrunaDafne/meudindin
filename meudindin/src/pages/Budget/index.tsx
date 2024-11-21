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
import { ResponsivePie } from "@nivo/pie";
import { colors } from "../../styles/colors";

export interface OrcamentoCard extends BudgetType{
    value: number;
    name_category: string;
}

export default function Budget() {
    const [isModalOpen, setModalOpen] = useState(false);
    const {budgets} = useSelector((state: RootState) => state.budgets);
    const [categoriasCard, setCategoriasCard] = useState<OrcamentoCard[]>();
    const [metaGeral, setMetaGeral] = useState(0);
    const [gastoGeral, setGastoGeral] = useState(0);
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
        
        let meta = 0;
        let gasto = 0;
        const orcamentosFormatados: OrcamentoCard[] = budgets.map(budget => {
            meta = meta + budget?.limit;
            gasto = gasto + (categorySums[budget.id_category] || 0);
            return {
            ...budget,
            value: categorySums[budget.id_category] || 0, // Adiciona 0 caso não tenha transações
            name_category: Categories[budget.id_category],
        }
    });
        setMetaGeral(meta);
        setGastoGeral(gasto);
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

    const data = [
        {
            id: "gasto",
            label: "Gasto",
            value: gastoGeral,
            color: "hsl(153, 70%, 50%)"
        },
        {
            id: "restante",
            label: "Restante",
            value: metaGeral - gastoGeral,
            color: "hsl(0, 0%, 90%)" // Cor mais clara para representar o "restante"
        },
    ];

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
            <ContainerGraphicsItem width="35vw">
            <SubtitlePage>Orçamentos mais excedidos</SubtitlePage> 
            <SubtitleCard>Nos últimos 6 meses</SubtitleCard> 
            <ContainerSection>
            <GraphicBar data={valuesGraphic} nomeValor={['porcentagem']} indexLabelHorizontal={'categoria'} legendaVertical='Porcentagem' legendaHorizontal="Categoria"/>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem width="35vw">
            <SubtitlePage>Orçamentos geral</SubtitlePage> 
            <SubtitleCard>Do mês atual</SubtitleCard> 
            <ContainerSection>
            <ResponsivePie
                data={data}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                innerRadius={0.5}
                enableArcLabels={false}  
                enableArcLinkLabels={false}
                colors={({ data }) => data.id === "gasto" ? gastoGeral > (metaGeral - gastoGeral) ? colors.red : colors.green : "hsl(0, 0%, 90%)"}
                borderWidth={0}
            />
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