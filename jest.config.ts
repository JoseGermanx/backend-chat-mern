import type { Config } from '@jest/types';

const config: Config.InitialOptions = {

  preset: 'ts-jest', // definir el interprete de los test con .ts para jest
  testEnvironment: 'node', // me permite habilitar el reconocimiento de jest para node
  verbose: true, // me permite visualizar los detalles que te entregan los test: ya sean existosos o no existosos
  coverageDirectory: 'coverage', // me permite habilitar un directorio de reporte de cobertura de test
  collectCoverage: false, // me permite habilitar un inspector de cobertura de test por la terminal, que me entrega el resultado del % cubierto como tabla de resumen del 100%, esto si pongo true. Si es false por se resulven los test pero no aparece la tabla resumen del coverage
  testPathIgnorePatterns: ['/node_modules'], // me permite ignorar directorios que no formen parte del ecosistema de test
  transform: { // me permite ejecutar mis archivos de test con .ts mediante el preset de ts-jest
    '^.+\\.ts?$': 'ts-jest'
  }
};

export default config;

