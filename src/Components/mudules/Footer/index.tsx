import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Container, Content } from './styles';
import React from 'react';

export default function Footer() {
    return (
        <Container>
            <Content>
                <div>
                    <a href="https://www.linkedin.com/in/benjamim-lacerda-01a211173/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={40} />
                    </a>
                    <a href="https://github.com/benlacerda" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={40} />
                    </a>
                </div>
                <p>Developed by Benjamim Lacerda</p>
            </Content>
        </Container>
    );
}