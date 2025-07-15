export function validarParametrosFiltrado(tipo:string, mes:string):string[] {
    const errores: string[] = [];

    const tipoStr = tipo.toLowerCase();
    if(!['ingreso', 'egreso'].includes(tipoStr)){
        errores.push("Tipo inválido. Debe ser 'ingreso' o 'egreso'.");
    };

    const formatoValido = /^\d{4}-\d{2}$/.test(mes);
    const [anio, mesNumero] = mes.split("-").map(Number);
    if ( !formatoValido ||
        isNaN(anio) || isNaN(mesNumero) ||
        mesNumero < 1 || mesNumero > 12
    ){
        errores.push("Mes inválido. Debe ser 'YYYY-MM'.");
    };

    return errores;
}