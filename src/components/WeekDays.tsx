import { useReducer } from "react";

const initialState = {
  checkboxes: [false, false, false, false, false, false, false],
  labels: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], // Exibição como string
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "TOGGLE_CHECKBOX":
      const newCheckboxes = state.checkboxes.map((checked: boolean, index: number) =>
        index === action.index ? !checked : checked
      );

      return { ...state, checkboxes: newCheckboxes };

    default:
      return state;
  }
}

const CheckboxGroup = ({ onChange }: { onChange: (selectedDays: number[]) => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (index: number) => {
    dispatch({ type: "TOGGLE_CHECKBOX", index });

    // Obtendo os dias selecionados como NÚMEROS (0 = Domingo, ..., 6 = Sábado)
    const selectedDays = state.checkboxes
      .map((checked: boolean, i: number) => (i === index ? !checked : checked) ? i : null) // 🔹 Pegamos o índice como valor numérico
      .filter((day: number): day is number => day !== null); // 🔹 Remove valores nulos

    onChange(selectedDays);
  };

  return (
    <div className="form-group w-[75%] mb-5">
      <section className="flex justify-between flex-row">
        {state.checkboxes.map((checked: boolean, index: number) => (
          <div key={index} className="flex flex-col">
            <input
              className="checkbox mb-2"
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(index)}
            />
            <label className="text-center text-bold text-base">
              {state.labels[index]} {/* 🔹 Mantemos os nomes dos dias aqui */}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CheckboxGroup;
