process.on("exit", (code) => {
  console.log(`Saliendo con el código ${code}`);
});

const programa = (array) => {
  const error = {};

  if (!array) {
    error.descripcion = "entrada vacía";
    console.log({ error });
    process.exit(-4);
  }

  const datos = {};
  const numeros = [];
  const tipos = [];
  let suma = 0;
  let counter = 0;
  let max;
  let min;
  let check;

  for (let j = 0; j < array.length; j++) {
    const elem = array[j];
    numeros.push(elem);

    typeof elem != "number" && (check = false);
    tipos.push(typeof elem);

    counter++;
    suma += parseInt(elem);

    (!max || max < elem) && (max = elem);
    (!min || min > elem) && (min = elem);
  }

  if (!check) {
    error.descripcion = "error de tipo";
    error.numeros = numeros;
    error.tipos = tipos;

    console.log({ error });
    process.exit(-5);
  }

  datos.numeros = numeros;
  datos.promedio = suma / counter;
  datos.max = max;
  datos.min = min;
  datos.ejecutable = process.execPath;
  datos.pid = process.pid;

  console.log({ datos });
};

//programa(process.argv);
const test = [1, 2, 3, 4, 5, true, "hola", { key: "value" }];
//const test = [1, 2, 3, 4, 5];
//programa(test);
programa();
