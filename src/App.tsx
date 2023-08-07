import { Container, chakra } from '@chakra-ui/react';
import { Levels } from 'src/containers/levels/Levels';

function App() {
  return (
    <>
      <chakra.header mt={{ base: 20, md: 40 }}>
        <Container maxW='md'>
          <chakra.h1 fontWeight='bold' fontSize='2xl'>
            Set levels
          </chakra.h1>
        </Container>
      </chakra.header>

      <chakra.main mt={10}>
        <chakra.section>
          <Container maxW='md'>
            <Levels />
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  );
}

export default App;
