import Link from 'next/link';
import { Container, Content } from './styles';
import React from 'react';

// Defina a interface para as props
interface CharacterCardProps {
    image: string;
    id: string;
    name: string;
}

export default function CharacterCard({ image, id, name }: CharacterCardProps) {
    return (
        <Container>
            <Link href={{
                pathname: '/CharacterDetail/',
                query: {
                    id,
                }
            }}>
                <Content>
                    <div>
                        <img src={image} alt={name} />
                    </div>
                    <h3>{name}</h3>
                </Content>
            </Link>
        </Container>
    );
}
