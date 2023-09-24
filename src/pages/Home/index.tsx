import { useEffect, useState } from 'react';
import axios  from 'axios';
import ReactLoading from 'react-loading'
import { Header } from '../../componentes/Heder';
import { 
    Container,
    Content,
    FilterForm,
    TableContent
 } from './styles';
import { UserData } from '../../types';
import { ModalInfo } from '../../componentes/Heder/ModalInfo/indesx';

export function Home() {
    const [dataFetching, setDataFetching] = useState<UserData[]>([]);
    const [dataFetchingBackup, setDataFetchingBackup] = useState<UserData[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)
    const [dataUser, setdataUser] = useState<UserData>();
    const [searchCountry, setSearchCountry] = useState('');
    
    function handelOpenModalInfo(userSelected: UserData){
        setdataUser(userSelected)
        setIsModalInfoOpen(true);
    }

    function handelCloseModalInfo() {
        setIsModalInfoOpen(false)
    }

    useEffect(() => {
        axios.get('https://randomuser.me/api',{
            params: {
                results: 20
            }
        })
        .then(Response=> {
            setDataFetching(Response.data.results)
            setDataFetchingBackup(Response.data.results)
        })
        .catch(error => {
            setError(error)
        })
        .finally (() => {
            setIsFetching(false);
        })
    }, [])

    // useEffect(() => {
    //     if(search.length !== 0) {
    //         const filter = dataFetching.filter(a => 
    //             a.name.first.toUpperCase().indexOf(search.toUpperCase()) >= 0 || a.name.last.toUpperCase().indexOf(search.toUpperCase()) >=0
    //         );
    //         setDataFetching(filter)
    //     } else {
    //         setDataFetching(dataFetchingBackup)
    //     }
    // }, [search]);

    const filteredName = search.length > 0 
        ? dataFetching.filter(a => (a.name.first.toUpperCase() || a.name.last.toUpperCase()).includes(search.toUpperCase()))
            :[];

    // useEffect(() => {
    //     if(searchCountry !== '') {
    //         const filterCountry = dataFetching.filter (a => a.location.country.toUpperCase() ===  searchCountry.toUpperCase());
    //         setDataFetching(filterCountry)
    //     } else {
    //         setDataFetching(dataFetchingBackup)
    //     }
    // }, [searchCountry])

    const filteredCountry = searchCountry.length > 0
        ? dataFetching.filter(a => ( a.location.country.toUpperCase().includes(searchCountry.toUpperCase())))
        : [];

    const actuallyFilter = search.length > 0 ? filteredName : filteredCountry;

    return (
        <Container>
            <Header/>
            <Content>
                <h1>Lista de alunos do curso</h1>
                {
                    isFetching ? (
                        <ReactLoading type="spin" color= "#FFF" />
                    ):(
                        <>
                        <FilterForm>
                            <div>
                                <label htmlFor="nome">Pesquisar</label>
                                <input 
                                type="text" 
                                id='nome' 
                                placeholder='Nome do aluno' 
                                onChange={(e) => setSearch(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="nacionalidade">Nacionalidade</label>
                                <select name="nacionalidade" 
                                id="nacionalidade"
                                onChange={(e) => setSearchCountry(e.target.value)}
                                value={searchCountry}
                                >
                                    <option value="">Todas</option>
                                     {
                                        dataFetching.map((e, index) => {
                                            return (
                                                <option key={index} value={e.location.country}>{e.location.country}</option>
                                            )
                                        })
                                     }
                                </select>
                            </div>
                        </FilterForm>
                        <TableContent>
                            <thead>
                                    <th>Nome</th>
                                    <th>Sexo</th>
                                    <th>Nacionalidade</th>
                                    <th>Ação</th>
                                </thead>
                                <tbody>
                                    {
                                        searchCountry.length > 0 || search.length > 0 ? (
                                            actuallyFilter.map((e, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{`${e.name.first} ${e.name.last}`}</td>
                                                        <td>{e.gender}</td>
                                                        <td>{e.nat}</td>
                                                        <td><button onClick={() => handelOpenModalInfo(e)}>Visualizar</button></td>
                                                </tr>
                                                )
                                                })
                                        ) : (
                                            dataFetching.map((e, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{`${e.name.first} ${e.name.last}`}</td>
                                                        <td>{e.gender}</td>
                                                        <td>{e.nat}</td>
                                                        <td><button onClick={() => handelOpenModalInfo(e)}>Visualizar</button></td>
                                                </tr>
                                                )
                                                })
                                        )    
                                    }
                                </tbody>
                        </TableContent>
                        </>
                    )
                }
            </Content>
            <ModalInfo
                isOpen={isModalInfoOpen}
                onRequestClose={handelCloseModalInfo}
                userSelected={dataUser}
            />
            
        </Container>
    )
}