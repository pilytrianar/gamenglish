export const estadoInicial = {
  contador: 0
};

export function contadorReducer(state, action) {

  switch (action.type) {

    case "incrementar":
      return {
        contador: state.contador + 1
      };

    case "disminuir":
      return {
        contador: state.contador - 1
      };

    default:
      return state;
  }
}