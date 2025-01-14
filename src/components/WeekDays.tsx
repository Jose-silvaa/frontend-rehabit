import { useReducer } from 'react';

const initialState = {
  checkboxes: [false, false, false, false, false, false, false],
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], // Labels personalizados
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      // Atualiza apenas o índice específico do checkbox
      return {
        ...state,
        checkboxes: state.checkboxes.map((checked:any, index: any) =>
          index === action.index ? !checked : checked // Apenas o checkbox clicado é alterado para true, os outros são desmarcados
        ),
      };
    default:
      return state;
  }
}

const CheckboxGroup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (index:any) => {
    dispatch({ type: 'TOGGLE_CHECKBOX', index });
  };

  return (
    <div className="form-group">
      <label className="text-FontColorAuth" htmlFor="days">
        <span className="flex justify-start mb-5 text-base">Repeat</span>
      </label>
      <section className='flex justify-between flex-row gap-full'>
        {state.checkboxes.map((checked:any, index:any) => (
        <div key={index} className='flex flex-col mb-12'>
            <input
                className="checkbox mb-2"
                type="checkbox"
                checked={checked}
                onChange={() => handleChange(index)}
            />
            <label className='text-center text-Warning text-base'>{state.labels[index]}</label> 
        </div>
        ))}
      </section>
    </div>
  );
};

export default CheckboxGroup;

