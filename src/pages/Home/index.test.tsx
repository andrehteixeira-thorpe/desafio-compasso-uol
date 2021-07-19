import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '.';

const HomeRouter = () => {
  return <Router><Home /></Router>
} 

describe('Search component', () => {
  const termoBusca = 'andrehteixeira-thorpe';

  it('deve iniciar com mensagem padrão', () => {
    render(<HomeRouter/>);

    const inicialText = screen.getByText(/Busque por um usuário do GitHub/i);
    expect(inicialText).toBeInTheDocument();
  });

  it('deve iniciar com input vazio', () => {
    render(<HomeRouter/>);

    const searchField : any = screen.getByTestId('inputSearch');
    expect(searchField.value).toEqual("")
  });

  it('preencher input e retornar busca', async () => {
    render(<HomeRouter/>);

    const searchField: any = screen.getByTestId('inputSearch');
    fireEvent.change(
      searchField, { target: { value: termoBusca } }
    )
    expect(searchField.value).toEqual(termoBusca);

    const buttonSearch: any = screen.getByTestId('buttonInputSearch');
    fireEvent.click(buttonSearch);
    expect(await screen.findByTestId('card')).toBeInTheDocument();
  });
});

