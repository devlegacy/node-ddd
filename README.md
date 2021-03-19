# Prueba técnica

curl \
  -H "Accept: application/json; charset=utf-8" \
  -H "Content-Type: application/json; charset=utf-8" \
  -X POST http://localhost:8080/sortArray\
  -d '{"numbers":[1,2,3,4,5,9,6,7,3,55,3,2,22,6,77,232,35,21,2,456,123,4,5]}' 
