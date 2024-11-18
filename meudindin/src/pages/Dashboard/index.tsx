import { Container, ContainerBudgets, ContainerButtonCostNext, ContainerCard, ContainerCardItem, ContainerCardsBudgets, ContainerGraphics, ContainerGraphicsItem, ContainerSection, ContainerTitle, SectionCardBudgets, SubtitlePage, TitlePage, icone } from "./styles";
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

export default function Dashboard() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalDespesaOpen, setModalDespesaOpen] = useState(false);
    const {receita, despesa, name} = useSelector((state: RootState) => state.user);
    const {wallets} = useSelector((state: RootState) => state.wallets);
    const {budgets} = useSelector((state: RootState) => state.budgets);
    const {transactions} = useSelector((state: RootState) => state.transactions);
    const [mostrarOrcamentos, setMostrarOrcamentos] = useState<OrcamentoCard[]>();

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

    const valuesGraphic = [
        {
            categoria: 'Educação',
            porcentagem: 25,
        },
        {
            categoria: 'Alimentação',
            porcentagem: 35,
        },
        {
            categoria: 'Lazer',
            porcentagem: 25,
        },
    ]

    function handleModal() {
        setModalOpen((prevState) => !prevState)
    }

    function handleModalDespesa() {
        setModalDespesaOpen((prevState) => !prevState)
    }

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
            <GraphicBar data={valuesGraphic} nomeValor={['porcentagem']} indexLabelHorizontal={'categoria'} legendaVertical='Porcentagem' legendaHorizontal="Categoria"/>
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
            <SubtitlePage>Saldos</SubtitlePage>
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