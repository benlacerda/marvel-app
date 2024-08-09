import Link from 'next/link';
import { Container, Content } from './styles';
import React from 'react';

export default function Header() {
    return (
        <Container>
            <Content>
                <div>
                    <h1>
                        <Link href="/">
                            MARVEL APP
                        </Link>
                    </h1>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                HOME
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Content>
        </Container>
    );
}
