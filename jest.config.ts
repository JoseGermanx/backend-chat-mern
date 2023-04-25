import type { Config } from '@jest/types';

const config: Config.InitialOptions = {

  preset: 'ts-jest', // definir el interprete de los test con .ts para jest
  testEnvironment: 'node', // me permite habilitar el reconocimiento de jest para node
  verbose: true, // me permite visualizar los detalles que te entregan los test: ya sean existosos o no existosos
  coverageDirectory: 'coverage', // me permite habilitar un directorio de reporte de cobertura de test
  collectCoverage: false, // me permite habilitar un inspector de cobertura de test por la terminal, que me entrega el resultado del % cubierto como tabla de resumen del 100%, esto si pongo true. Si es false por se resulven los test pero no aparece la tabla resumen del coverage
  testPathIgnorePatterns: ['/node_modules/'], // me permite ignorar directorios que no formen parte del ecosistema de test
  transform: { // me permite ejecutar mis archivos de test con .ts mediante el preset de ts-jest
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/src/**/test/*.ts'], // me permite definir donde se van a ir a leer los test, en que directorio
  // OJO!
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'], // me permite definir a partir de que directorio voy a capturar la cobertura de test
  coverageThreshold: { // me permite agregar los umbrales de verificación para la cobertura de test
    global: {
      branches: 1, // Esto se refiere a los diferentes ramales en el flujo de control de mi código. Por ej: una sentencia if/else
      functions: 1, // Esto se refiere a la definición de las funciones que se han definido en mi código
      lines: 1, // Esto se refiere a las líneas individuales de tú código
      statements: 1 // Esto se refiere a cualquier sentencia de ejecución en el código. Por ej: asignaciones, instrucción de salida, llamada a una función, etc.
    }
  },
  coverageReporters: ['text-summary', 'lcov'], // me permite generar un resumen en texto de la cobertura de text
  moduleNameMapper: { // mapeador de identificación de los directorios que disponibilizaremos para trabajar con jest
    '@bootstrap/(.*)': ['<rootdir>/src/bootstrap/$1'],
    '@configs/(.*)': ['<rootdir>/src/configs/$1'],
    '@auth/(.*)': ['<rootdir>/src/features/auth/$1'],
    '@user/(.*)': ['<rootdir>/src/features/user/$1'],
    '@interfaces/(.*)': ['<rootdir>/src/interfaces/$1'],
    '@decorators/(.*)': ['<rootdir>/src/shared/globals/decorators/$1'],
    '@helpers/(.*)': ['<rootdir>/src/shared/globals/helpers/$1'],
    '@services/(.*)': ['<rootdir>/src/shared/globals/services/$1'],
    '@socket/(.*)': ['<rootdir>/src/shared/globals/sockets/$1'],
    '@workers/(.*)': ['<rootdir>/src/shared/globals/workers/$1'],
    '@root/(.*)': ['<rootdir>/src/$1'],
  }
};

export default config;

