import styled from '@emotion/styled';
import { useState } from 'react';

const Label = styled.label`
  display: block;
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
`;

const useSelectMonedas = (label, opciones) => {
  const [state, setState] = useState('');

  // Custom hook
  const selectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value=''>- Seleccione -</option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  // esto es lo que retorna el custom hook para el componente que lo llama
  // cuando se extraiga en el custom hook, no necesariamente se tienen q llamar igual
  return [state, selectMonedas];
};

export default useSelectMonedas;
