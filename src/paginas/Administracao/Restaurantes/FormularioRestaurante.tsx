import { useState, useEffect } from 'react'
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

export default function FormularioRestaurante() {

  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => alert('Restaurante atualizado com sucesso'))
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => alert('Restaurante cadastrado com sucesso'))
    }
  }
  return (
    <>
      <Box>
        <Container maxWidth='lg' sx={{ marginTop: 1 }}>
          <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <Typography component='h1' variant='h6'>Formulário de Restaurantes</Typography>
              <Box sx={{ width: '100%' }} component='form' onSubmit={aoSubmeterForm}>
                <TextField
                  value={nomeRestaurante}
                  onChange={evento => setNomeRestaurante(evento.target.value)}
                  label="Nome do Restaurante"
                  variant="standard"
                  fullWidth
                  required
                />
                <Button sx={{ marginTop: 1 }} fullWidth type='submit' variant="outlined">Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

    </>
  )
}
