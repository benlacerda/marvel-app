import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Hero from '../../Components/mudules/Hero';
import CharacterCard from '../../Components/mudules/CharacterCard';
import Header from '../../Components/mudules/Header';
import SectionTitle from '../../Components/mudules/SectionTitle';
import Footer from '../../Components/mudules/Footer';
import Spinner from '../../Components/elements/Spinner';
import { Container } from '../../styles/CharacterList.styles';
import { Grid } from '../../styles/grid';
import Pagination from '../../Components/mudules/Pagination';
import React from 'react';

const LIMIT = 20;

interface Characters {
    id: number;
    name: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface RequestInfoPagination {
    total: number;
}

export default function CharactersList() {
    const [characters, setCharacters] = useState<Characters[]>([]);
    const [requestInfo, setRequestInfo] = useState<RequestInfoPagination | undefined>(undefined);
    const [hasSpinner, setHasSpinner] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setHasSpinner(true);

        api.get('characters', {
            params: {
                limit: LIMIT,
                offset: offset.toString(), // Converter para string se necessário
            },
        })
            .then(response => {
                setRequestInfo(response.data.data);
                setCharacters(response.data.data.results);
                setHasSpinner(false);
            })
            .catch(() => {
                setHasSpinner(true);
            });
    }, [offset]);

    return (
        <>
            <Header />
            <Hero />
            <Container>
                {hasSpinner && <Spinner />}

                {!hasSpinner && (
                    <>
                        <SectionTitle title="CHARACTERS" />
                        <Grid>
                            {characters.length > 0 ? (
                                characters.map(character => (
                                    <CharacterCard
                                        key={character.id} // Adicionar key para lista
                                        id={character.id.toString()} // Converter para string se necessário
                                        name={character.name}
                                        image={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                                    />
                                ))
                            ) : (
                                <img src="/assets/images/" alt="" />
                            )}
                        </Grid>

                        {requestInfo && (
                            <Pagination
                                limit={LIMIT}
                                total={requestInfo.total}
                                offset={offset}
                                setOffset={setOffset}
                            />
                        )}
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
}
