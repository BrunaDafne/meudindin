import { colors } from "../../styles/colors";
import { Container, ContainerGraphic, Label } from "./styles";
import { ResponsivePie } from '@nivo/pie'

interface CardBudgetsProps {
    title: string;
    goalValue: number;
    expenseValue: number;
}

export function CardBudgets({title, goalValue, expenseValue}: CardBudgetsProps) {
    const data = [
        {
            id: "gasto",
            label: "Gasto",
            value: expenseValue,
            color: "hsl(153, 70%, 50%)"
        },
        {
            id: "restante",
            label: "Restante",
            value: goalValue - expenseValue,
            color: "hsl(0, 0%, 90%)" // Cor mais clara para representar o "restante"
        },
    ];

    return (
        <Container backgroundColor={expenseValue > goalValue ? colors.backgroundRed : colors.backgroundGreen}>
            <ContainerGraphic>
            <ResponsivePie
                data={data}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                innerRadius={0.5}
                enableArcLabels={false}  // Desativa os rótulos dentro do arco
                enableArcLinkLabels={false}  // Desativa as setas de link para os rótulos
                colors={({ data }) => data.id === "gasto" ? expenseValue > goalValue ? colors.red : colors.green : "hsl(0, 0%, 90%)"}
                borderWidth={0}
            />
            </ContainerGraphic>
            <Label size="16px">{title}</Label>
            <Label>Meta: R$ {goalValue}</Label>
            <Label>Gasto: R$ {expenseValue}</Label>
        </Container>
    );
}