import React from 'react';
import { Container } from './styles';

interface SectionTitleProps {
    title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
    return (
        <Container>
            <div>
                <h2>{title}</h2>
                <div className="line"></div>
            </div>
        </Container>
    );
}