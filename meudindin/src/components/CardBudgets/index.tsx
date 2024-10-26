import { Container, Label } from "./styles";

interface CardBudgetsProps {
    title: string;
    goalValue: string;
    expenseValue: string;
}

export function CardBudgets({title, goalValue, expenseValue}: CardBudgetsProps) {
    return (
        <Container>
            <Label>{title}</Label>
            <Label>Meta: {goalValue}</Label>
            <Label>Gasto: {expenseValue}</Label>
        </Container>
    );
}