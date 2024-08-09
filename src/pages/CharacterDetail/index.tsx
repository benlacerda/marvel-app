import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../Components/mudules/Header';
import SectionTitle from '../../Components/mudules/SectionTitle';
import Footer from '../../Components/mudules/Footer';
import ComicCard from '../../Components/mudules/ComicCard';
import Spinner from '../../Components/elements/Spinner';
import { Grid } from '../../styles/grid';
import { Container, Content } from '../../styles/CharacterDetail.styles';
import { api } from '../../services/api'; // Certifique-se de que o caminho esteja correto

interface Character {
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface Comics {
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface ApiResponse<T> {
    results: any;
    data: {
        results: T[];
    };
}

export default function CharacterDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [hasSpinner, setHasSpinner] = useState(false);
    const [characterDetails, setCharacterDetails] = useState<Character | undefined>(undefined);
    const [comics, setComics] = useState<Comics[]>([]);

    useEffect(() => {
        if (!id) return; // Previne erro caso o id não esteja definido

        setHasSpinner(true);

        api.get<ApiResponse<Character>>(`characters/${id}`)
            .then(response => {
                setCharacterDetails(response.data.results[0]);
                setHasSpinner(false);
            })
            .catch(error => {
                console.error(error);
                setHasSpinner(false);
            });

        api.get<ApiResponse<Comics>>(`characters/${id}/comics`)
            .then(response => {
                setComics(response.data.results);
            })
            .catch(error => {
                console.error(error);
                setHasSpinner(false);
            });
    }, [id]);

    return (
        <>
            <Header />
            <Container>
                {hasSpinner && <Spinner />}

                {!hasSpinner && (
                    <>
                        {characterDetails && (
                            <>
                                <SectionTitle title="ABOUT" />
                                <Content>
                                    <div className="container-image">
                                        <img
                                            src={`${characterDetails.thumbnail.path}/standard_fantastic.${characterDetails.thumbnail.extension}`}
                                            alt={characterDetails.name}
                                        />
                                    </div>

                                    <div className="context">
                                        <div className="name">
                                            <h2>{characterDetails.name}</h2>
                                        </div>
                                        <div className="description">
                                            <p>
                                                {characterDetails.description || 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'}
                                            </p>
                                        </div>
                                    </div>
                                </Content>

                                <SectionTitle title={`${characterDetails.name}'s COMICS`} />

                                <Grid>
                                    {comics.length > 0 &&
                                        comics.map(comic => (
                                            <ComicCard
                                                key={comic.title}
                                                image={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                                                title={comic.title}
                                            />
                                        ))}
                                </Grid>
                            </>
                        )}
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
}
