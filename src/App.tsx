import { Container, Title } from '@mantine/core';
import { Levels } from './containers/levels/Levels';

function App() {
  return (
    <Container size='xs' mt='200px'>
      <Title order={1} size='24px'>
        Set levels
      </Title>

      <Levels />
    </Container>
  );
}

export default App;
