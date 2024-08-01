
export var Datejs = function () {

    //Fecha formato europeo
    function dateFormat(fecha) {
        
        let date = new Date(fecha);
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let año = date.getFullYear();
        
        if (dia < 10) {
        dia = '0' + dia;
        }
        if (mes < 10) {
        mes = '0' + mes;
        }

        let fechaFormateada = `${dia}/${mes}/${año}`;
    
        return fechaFormateada;
    }
    
    //Fecha actual
    function getDate() {
        let today = new Date();   
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    //Fecha actual con 15 dias de mas
    function getExpirationDate() {
        let today = new Date(); 
        const expirationDate = new Date();
        expirationDate.setDate(today.getDate() + 15);
        const expYear = expirationDate.getFullYear();
        const expMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
        const expDay = expirationDate.getDate().toString().padStart(2, '0');
        return `${expYear}-${expMonth}-${expDay}`;
    }

    return {
        dateFormat,
        getDate,
        getExpirationDate
    };
    
}(window);
