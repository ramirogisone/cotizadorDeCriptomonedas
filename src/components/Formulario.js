import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMonedas from '../hooks/useMonedas';
import useCripto from '../hooks/useCripto';
import Axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &::hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listadocripto, guardarCriptomonedas] = useState([]);

    const [error, guardarError] = useState(false);

    const monedas = [
        {codigo: 'USD', nombre: 'Dolar estadounidense'},
        {codigo: 'ARG', nombre: 'Peso argentino'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'}
    ]

    const [moneda, SelectMoneda] = useMonedas('Elige tu moneda', '', monedas);

    const [criptomoneda, SelectCripto] = useCripto('Elige tu criptomoneda', '', listadocripto);

    // llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = ev => {
        ev.preventDefault();

        // validar campos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 

        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}

            <SelectMoneda />

            <SelectCripto />

            <Boton 
                type='submit'
                value='Calcular'
            />
        </form>
     );
}
 
export default Formulario;