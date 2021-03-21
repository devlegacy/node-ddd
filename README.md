# Prueba técnica

## TODO

- [ ] Implements [Node Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [ ] Rename repo to node-ggtech-technical-test
- [ ] Analyze/Add cross-env for security and handle environments
- [ ] Analyze/Add cors for security
- [ ] Analyze/Add hook for lint on commit npx mrm lint-staged (?)

- [ ] Integrate Joi y Boom middleware

- [ ] Add some test
- [ ] Split tests

## Algoritmia

### Ejercicio 1 - Genera números primos

Genera los números primos del **parámetro** `start` a `end`.
Para la ruta: `/numbersPrime/:start/:end`

[Solution - Algorithm](./api/prime-numbers/utils/index.js)
[Solution - Controller](./api/prime-numbers/prime-numbers-controller.js)

```sh
curl \
  -H "Accept: application/json; charset=utf-8" \
  -H "Content-Type: application/json; charset=utf-8" \
  -X GET http://localhost:8080/numbersPrime/1/100
```

### TODO

- [ ] validate start to be natural number > 1 (?)
- [ ] validate end to be natural number >= start
- [ ] Do validations on middleware (?)

### Ejercicio 2 - Ordena un Array

Ordena el array de números en base a la cantidad de veces que se repite, el array esta en el **body** con el nombre `numbers`.
Para la ruta: `/sortArray`

```sh
curl \
  -H "Accept: application/json; charset=utf-8" \
  -H "Content-Type: application/json; charset=utf-8" \
  -X POST http://localhost:8080/sortArray \
  -d '{"numbers":[1,2,3,4,5,9,6,7,3,55,3,2,22,6,77,232,35,21,2,456,123,4,5]}' 
```

### TODO

- [ ] Valide numbers is an array of numbers
- [ ] Improve and divide algorithm, analyze complex (?)

### Ejercicio 3 - Genera un Bracket Simple

1. Considera los siguientes puntos:
  a. El array **[partidos]** representa la **primera** ronda de un **Bracket** de Eliminación Simple de **8 participantes**.
  El primer elemento del array (id:1) es el partido de hasta arriba y así consecutivamente.
  [¿QUÉ ES UN BRACKET?](https://matchplay.events/handbook/single-elimination-bracket)
  b. El array **[participantes]** son aquellos **inscritos** que **esperan** la **creación del Bracket** de Eliminación Simple y ya **tienen un seed** asignado.
  c. Un **'Seed'** representa el **nivel de habilidad** de un participante, **se usa para asignar las posiciones iniciales** en un Bracket de Eliminación Simple. Existen varios tipos de ordenamiento, en esta prueba usaremos el tipo **Slaughter**.
  [TIPOS DE ORDENAMIENTO](https://matchplay.events/handbook/player-pairing)

2. Genera una solución al siguiente problema y describe tu lógica detrás de ella. (Sin código)
  a. Problema: Te han pedido que **ordenes** **la primera ronda de un Bracket** de Eliminación Simple **(array [partidos])** en tipo **Slaughter**, es decir, **el mejor seed** deberá enfrentarse **contra el peor seed**, **usando** los participantes **inscritos (array [participantes])**.
  Ejemplo: `{ "id": 1, "participantes": [{"id": 1}, {"id": 5}]}`
     - Han mencionado que no quieren que los participantes más fuertes (seed: 1 vs seed: 2) se enfrenten en
   la segunda ronda si llegaran a ganar su primer partido.
     - Han dicho que faltan 3 participantes y deberás reemplazar sus id por un BYE.
  
    Por último, intuyes que usarán este algoritmo para generar otros brackets, por lo cual tal vez **debería funcionar** en **al menos cualquier otro bracket de 8 participantes**.
  b. Tu solución:
    ~~~
    Para mi planteamiento de solución al problema previo, marcaré los siguientes puntos:
    
    Definiciones y acrónimos (con los que debo relacionarme y se darán por conocidos durante el planteamiento de la solución):
      Bracket: Una forma de organizar (en este caso la estructura de datos partidos) a los jugadores/ganadores de un torneo o liga
      Seed: Nivel de habilidad de un participante
      Slaughter: Es un tipo de ordenamiento para un bracken en el que el jugador más fuerte (basado en el seed), se enfrenta al más débil, el segundo más fuerte al segundo más débil y así sucesivamente. Esto supone una ventaja al jugador con una seed mayor
    
    Metas / Objetivos
      Generar un bracket de eliminación Simple de n-8 participantes con emparejamiento Slaughter, siguiendo las métricas planteadas en el punto 2 del ejercicio 2.
    
    Supuestos:
      - La estructura de datos de participantes no vendrá ordenado
      - El rankeo del seed se basa en una escala ascendente, 1,2,3,4 - dónde 1 es la escala o puntuación más alta y n la más baja
      - El bracket es 1 vs 1 por lo cual es un arreglo par
      - El valor de los participantes ronda entre 6 y 8, (por confirmar)*
      - Se asume que el máximo de participantes son 8, (por confirmar)*
      - El id y el seed no tienen relación, aunque en este caso lo parezca
      - Que si los top rank ganan, no deben enfrentarse pronto y deben seguir teniendo ventaja contra los más débiles (en este caso que no sean adyacentes (?))
      - Siguiendo Slaughter, los top jugadores siempre tendrán ventaja
    
    Limitaciones e incógnitas
      - La fuente de participantes
      - El número de participantes que llegarán
      - Como se genera el seed
    ~~~

    ~~~
    ~~~

## Bases de datos

3. Genera el código que reproduzca la solución que has descrito, valoraremos:
  a. Funcionalidad
  b. Facilidad de Lectura
  c. Buenas Practicas 

Tournaments:
-_id: ObjectId
-name: string
-participantsid: [ObjectId]
-description: string
-location: string,
-prices: [string],
-country: string,
-status: boolean,
-format: number,
-organizador:{
  -_id: ObjectId,
  -name: string
}

Participants:
-_id: ObjectId
-name: string
-username: string
-email: string
-phone: number

Completa la siguiente función para que regrese todos los torneos activos(status = true) con los campos básicos
(nombre del torneo, descripción, participantes(nombre, username))

Tournaments // es la variable de la colección Tournaments
Participants // es la variable de la colección Participants

function getTournaments() {}

```sh
curl \
  -H "Accept: application/json; charset=utf-8" \
  -H "Content-Type: application/json; charset=utf-8" \
  -X GET http://localhost:8080/tournaments
```

Completa la siguiente función para que regrese todos los torneos que contengan en su nombre o descripción
el string que recibe como parámetro

function getTournamentsByNameOrDescription(stringSearch) {}

```sh
curl \
  -H "Accept: application/json; charset=utf-8" \
  -H "Content-Type: application/json; charset=utf-8" \
  -X GET http://localhost:8080/tournamentsByNameOrDescription/hello
```
