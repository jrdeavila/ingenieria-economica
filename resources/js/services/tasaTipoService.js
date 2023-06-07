import axios from "axios";
export default async function tasaTiposService() {
    let result = await axios.get('http://localhost/api/tasa-tipos');
    let tasaTipos = result.data;
    // delay 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    return tasaTipos;
}

export async function calcularInteres(data) {
    let result = await axios.post('http://localhost/api/calcular-interes', data);
    let interes = result.data;
    // delay 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    return interes;
}


export async function calcularValorFuturo(data, tipo) {
    let result = null;
    if (tipo) {

        result = await axios.post('http://localhost/api/calcular-valor-futuro', data);
    }
    else {
        result = await axios.post('http://localhost/api/calcular-valor-presente', data);
    }
    let valorFuturo = result.data;
    // delay 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    return valorFuturo;
}