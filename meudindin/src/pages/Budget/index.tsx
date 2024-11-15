import { Container, ContainerBudgets, ContainerButtonCostNext, ContainerCard, ContainerCardItem, ContainerCardsBudgets, ContainerGraphics, ContainerGraphicsItem, ContainerSection, ContainerTitle, SectionCardBudgets, SubtitleCard, SubtitlePage, TitlePage, icone } from "./styles";
import { CardValues, TypeCard } from "../../components/CardValues";
import { Button } from "../../components/Button";
import { ButtonMoney } from "../../components/ButtonMoney";
import { CardBudgets } from "../../components/CardBudgets";
import { GraphicBar } from "../../components/Graphic";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { ModalDespesa } from "../../components/ModalDespesa";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function Budget() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalDespesaOpen, setModalDespesaOpen] = useState(false);
    const {receita, despesa, name} = useSelector((state: RootState) => state.user);
    const {wallets} = useSelector((state: RootState) => state.wallets);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const orcamentos = [
        {
            title: 'Educação',
            goalValue: 50,
            expenseValue: 35,
        },
        {
            title: 'Entreternimento',
            goalValue: 100,
            expenseValue: 150,
        },
        {
            title: 'Lazer',
            goalValue: 80,
            expenseValue: 40,
        },
        {
            title: 'Assinaturas',
            goalValue: 70,
            expenseValue: 50,
        },
        {
            title: 'Impostos',
            goalValue: 80,
            expenseValue: 15,
        },
        {
            title: 'Casa',
            goalValue: 200,
            expenseValue: 97,
        },
    ];

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

    function handleModalDespesa() {
        setModalDespesaOpen((prevState) => !prevState)
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <Container>
            <ContainerTitle>
                <TitlePage>Orçamentos</TitlePage>
            </ContainerTitle>
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
            <Modal isOpen={isModalOpen} onClose={handleModal} title="Adicionar receita"/>
            <ModalDespesa isOpen={isModalDespesaOpen} onClose={handleModalDespesa} title="Adicionar despesa"/>

            <ContainerGraphics>
            <ContainerGraphicsItem>
            <SubtitlePage>Orçamentos mais excedidos</SubtitlePage> 
            <SubtitleCard>Nos últimos 6 meses</SubtitleCard> 
            <ContainerSection>
            <GraphicBar data={valuesGraphic} nomeValor={['porcentagem']} indexLabelHorizontal={'categoria'} legendaVertical='Porcentagem' legendaHorizontal="Categoria"/>
            </ContainerSection>  
            </ContainerGraphicsItem>
            <ContainerGraphicsItem width="50vw">
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
            <SubtitlePage>Orçamentos</SubtitlePage>
            <ContainerCardsBudgets>
                {
                    orcamentos.map(({title, goalValue, expenseValue}) => {
                        return (
                        <SectionCardBudgets>
                            <CardBudgets title={title} goalValue={goalValue} expenseValue={expenseValue} />
                        </SectionCardBudgets>
                        )
                    })
                }
            </ContainerCardsBudgets>
            </ContainerBudgets>
        </Container>
    )
}