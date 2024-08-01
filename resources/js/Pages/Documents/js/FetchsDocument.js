
export var FetchsDocument = function () {


    // FETCHS GLOBALES
    
    //Trae un array de valores para la seleccion dependiendo de la url que se mande 
    async function fetchData (url) {
        
        const response = await DataAccess.fetchData(url)
        if (response.type === 'success') {
            return response.result
        }else{
            this.$toast(this.$t('Error connecting to the server'), 'error');
        }
    }

    //Guarda un objeto en DB según la url que se mande 
    async function saveData (url, object) {  
        const response = await DataAccess.saveData(url, object)
        if (response.type === 'success') {
            this.$toast(this.$t(response.message), 'success');
            return response.result
        }else{
            this.$toast(this.$t('Error connecting to the server'), 'error');
        }
    }

    //FETCH DOCUMENTS       
    
    // Prepara la llamada para traer metodos de pago
    async function fetchPayments () {
        
        this.payment_methods = await this.fetchData(this.mountUrl('payment'));
        this.selectedPaymentMethod =  this.payment_methods[0]

    }

    // Prepara la llamada para traer las compañias
    async function fetchCompanies() {
        try {
            this.companies = await this.fetchData('/companies-invoice');

            if (this.companies.length === 1) {
                this.selectedCompany = this.companies[0];
                this.companyId = this.selectedCompany.id;
            } else {
                this.selectedCompany = this.companies[0];
            }
            this.loading = false;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.loading = false;
        }
    }

    //Trae todos las empresas de la base de datos dependiendo si estas en facturas ingresos / gastos pasa a provider o a cliente       
    async function fetchCustomers() {

        const url = this.isChecked 
                ? `/providers/${this.selectedCompany.id}` 
                : `/customers/${this.selectedCompany.id}`;

        this.customers = await this.fetchData(url);

        if (this.customers.length === 1) {
            this.selectedCustomer = this.customers[0];
        }

        this.loading = false;     
    }

    //Trae de la base de datos el tipo de documento
    async function fetchDocumentsType() {
        this.types = await this.fetchData('/documents-type')   
        this.selectedType = this.types[0];
        this.fetchDocumentsSerie()
    }

    //Trae de la base de datos el numero de serie de documento
    async function fetchDocumentsSerie () {
        this.series = await this.fetchData('/documents-serie/'+this.selectedType.id+'/'+this.selectedCompany.id)  
        this.selectedSerie = this.series[0]; 
        this.loading = false;     
    }

    return {
        fetchPayments,
        fetchCompanies,
        fetchCustomers,
        fetchDocumentsSerie,
        fetchDocumentsType,
        fetchData,
        saveData
    };

}(window);