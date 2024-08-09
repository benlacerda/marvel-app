import Link from 'next/link';

import { Container } from './styles';
import React from "react";

interface ComicCardProps {
    image: string;
    title: string;
}

export default function ComicCard ({ image, title }: ComicCardProps) {
    return(
        <Container>
            <div>
                <img src={image} alt={title} />
                <div>
                    <h3>{title}</h3>
                </div>
            </div>
        </Container>
    )
}