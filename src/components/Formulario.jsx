import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../../hooks/useSelectMonedas';
import Error from './Error';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7bfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  // State del listado de criptomonedas para el select de criptomonedas
  const monedas = [
    { id: 'COP', nombre: 'Peso Colombiano' },
    { id: 'USD', nombre: 'Dolar de Estados Unidos' },
    { id: 'MXN', nombre: 'Peso Mexicano' },
    { id: 'EUR', nombre: 'Euro' },
    { id: 'GBP', nombre: 'Libra Esterlina' },
  ];
  // State para almacenar el arreglo de cripto que viene del api
  const [criptos, setCriptos] = useState([]);

  // State para guardar el error en caso de que no se seleccione nada en el select
  const [error, setError] = useState(false);

  // CUSTOM HOOKS
  // Utilizar custom hook useSelectMonedas para crear el select de monedas
  const [moneda, SelectMonedasLocal] = useSelectMonedas(
    'Elige tu moneda',
    monedas // estas son las opciones de moneda local
  );
  // Utilizar custom hook useSelectMonedas para crear el select de criptomonedas
  const [criptomoneda, SelectCriptomonedas] = useSelectMonedas(
    'Elige tu ciptomoneda',
    criptos // este es el arreglo de criptomonedas que viene del api y
    // se guarda en el state criptos y son las opciones del select
  );

  useEffect(() => {
    // Consultar la API para obtener la cotización de las criptomonedas
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
      const resultado = await fetch(url);
      const resultadoJSON = await resultado.json();

      // Mapear los resultados para obtener un array de objetos con los datos que necesitamos
      const arrayCriptos = resultadoJSON.Data.map((cripto) => {
        // crear un objeto con los datos que necesitamos para el select
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos); // Guardar el array de criptomonedas en el state
    };
    // Llamar a la función para que se ejecute al cargar el componente
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que no estén vacíos los campos del formulario antes de enviar
    if ([moneda, criptomoneda].includes('')) {
      setError(true);
      return;
    }
    // setear el state de error a false
    setError(false);

    // Pasar los datos al componente principal para rellenar el state
    setMonedas({ moneda, criptomoneda });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        {/* usamos los custom hooks de arriba para crear los select de monedas y criptomonedas
      cada retorna un select diferente de acuerdo al tipo de hook */}
        <SelectMonedasLocal />
        <SelectCriptomonedas />
        <InputSubmit type='submit' value='Cotizar' />
      </form>
    </>
  );
};

export default Formulario;
