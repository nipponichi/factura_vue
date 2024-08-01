
export var GenerateXML = ( function ( window, undefined ) {

    function convertToFacturaeXML(selectedCompany, selectedSerie, myDocument, selectedCustomer, taxMap, products, subtotal, totalIVA) {
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
        <fe:Facturae xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:fe="http://www.facturae.es/Facturae/2014/v3.2.1/Facturae">
            <FileHeader>
                <SchemaVersion>3.2.1</SchemaVersion>
                <Modality>I</Modality>
                <InvoiceIssuerType>EM</InvoiceIssuerType>
                <Batch>
                    <BatchIdentifier>${selectedCompany.tax_number}${selectedSerie.number}${selectedSerie.serie}</BatchIdentifier>
                    <InvoicesCount>${myDocument.document_counter}</InvoicesCount>
                    <TotalInvoicesAmount>
                        <TotalAmount>${myDocument.amount}</TotalAmount>
                    </TotalInvoicesAmount>
                    <TotalOutstandingAmount>
                        <TotalAmount>${myDocument.amount}</TotalAmount>
                    </TotalOutstandingAmount>
                    <TotalExecutableAmount>
                        <TotalAmount>${myDocument.amount}</TotalAmount>
                    </TotalExecutableAmount>
                    <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
                </Batch>
            </FileHeader> 
            
            <Parties>
                <SellerParty>
                    <TaxIdentification>
                        <PersonTypeCode>J</PersonTypeCode>
                        <ResidenceTypeCode>R</ResidenceTypeCode>
                        <TaxIdentificationNumber>${selectedCompany.tax_number}</TaxIdentificationNumber>
                    </TaxIdentification>
                    <LegalEntity>
                        <CorporateName>${selectedCompany.name}</CorporateName>
                        <AddressInSpain>
                            <Address>${selectedCompany.address}</Address>
                            <PostCode>${selectedCompany.post_code}</PostCode>
                            <Town>${selectedCompany.town}</Town>
                            <Province>${selectedCompany.province}</Province>
                            <CountryCode>ESP</CountryCode>
                        </AddressInSpain>
                        <ContactDetails>
                            <Telephone>${selectedCompany.phone}</Telephone>
                            <ElectronicMail>${selectedCompany.email}</ElectronicMail>
                        </ContactDetails>
                    </LegalEntity>
                </SellerParty>
                
                <BuyerParty>
                    <TaxIdentification>
                        <PersonTypeCode>J</PersonTypeCode>
                        <ResidenceTypeCode>R</ResidenceTypeCode>
                        <TaxIdentificationNumber>${selectedCustomer.tax_number}</TaxIdentificationNumber>
                    </TaxIdentification>
                    <LegalEntity>
                        <CorporateName>${selectedCustomer.name}</CorporateName>
                        <AddressInSpain>
                            <Address>${selectedCustomer.address}</Address>
                            <PostCode>${selectedCustomer.post_code}</PostCode>
                            <Town>${selectedCustomer.town}</Town>
                            <Province>${selectedCustomer.province}</Province>
                            <CountryCode>ESP</CountryCode>
                        </AddressInSpain>
                        <ContactDetails>
                            <Telephone>${selectedCustomer.phone}</Telephone>
                            <ElectronicMail>${selectedCustomer.email}</ElectronicMail>
                        </ContactDetails>
                    </LegalEntity>
                </BuyerParty> 
            </Parties>
            <Invoices>
                <Invoice>
                    <InvoiceHeader>
                        <InvoiceNumber>${selectedSerie.number}</InvoiceNumber>
                        <InvoiceSeriesCode>${selectedSerie.serie}</InvoiceSeriesCode>
                        <InvoiceDocumentType>FC</InvoiceDocumentType>
                        <InvoiceClass>OO</InvoiceClass>
                    </InvoiceHeader>
                    <InvoiceIssueData>
                        <IssueDate>${myDocument.date}</IssueDate>
                        <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
                        <TaxCurrencyCode>EUR</TaxCurrencyCode>
                        <LanguageName>es</LanguageName>
                    </InvoiceIssueData>
                    <TaxesOutputs>\n`;
                    // No Tocar
                    taxMap.forEach((value, tax) => {
                        
                        xml += '  <Tax>\n';
                        xml += `    <TaxTypeCode>01</TaxTypeCode>\n`;  
                        xml += `    <TaxRate>${parseFloat(tax).toFixed(2)}</TaxRate>\n`;
                        xml += '    <TaxableBase>\n';
                        xml += `      <TotalAmount>${ calcularImporteBase(tax,value).toFixed(2) }</TotalAmount>\n`;
                        xml += '    </TaxableBase>\n';   
                        xml += '    <TaxAmount>\n';
                        xml += `      <TotalAmount>${value.toFixed(2)}</TotalAmount>\n`;
                        xml += '    </TaxAmount>\n';
                        xml += '  </Tax>\n';
                    
                    });
                    
                    xml += `</TaxesOutputs>
                    <InvoiceTotals>
                        <TotalGrossAmount>${ subtotal.toFixed(2) }</TotalGrossAmount>
                        <TotalGeneralDiscounts>0.0</TotalGeneralDiscounts>
                        <TotalGeneralSurcharges>0.0</TotalGeneralSurcharges>
                        <TotalGrossAmountBeforeTaxes>${ subtotal.toFixed(2) }</TotalGrossAmountBeforeTaxes>
                        <TotalTaxOutputs>${totalIVA.toFixed(2)}</TotalTaxOutputs>
                        <TotalTaxesWithheld>0.0</TotalTaxesWithheld>
                        <InvoiceTotal>${ myDocument.amount }</InvoiceTotal>
                        <TotalOutstandingAmount>${ myDocument.amount }</TotalOutstandingAmount>
                        <TotalExecutableAmount>${ myDocument.amount }</TotalExecutableAmount>
                    </InvoiceTotals>
                    <Items>`;
                    
        
        products.forEach(product => {

            xml += `
                <InvoiceLine>
                    <ItemDescription>${product.description}</ItemDescription>
                    <Quantity>${product.quantity}</Quantity>
                    <UnitOfMeasure>01</UnitOfMeasure>
                    <UnitPriceWithoutTax>${product.price}</UnitPriceWithoutTax>
                    <TotalCost>${product.quantity * product.price}</TotalCost>
                    <DiscountsAndRebates>
                        <Discount>
                            <DiscountReason>${product.discount_reason}</DiscountReason>
                            <DiscountRate>${parseFloat(product.discount).toFixed(1)}</DiscountRate>
                            <DiscountAmount>${((product.quantity * product.price) * (product.discount/ 100)).toFixed(1) }</DiscountAmount>
                        </Discount>
                    </DiscountsAndRebates>
                    <GrossAmount>${ product.subTotal }</GrossAmount>
                    <TaxesOutputs>
                        <Tax>
                            <TaxTypeCode>01</TaxTypeCode>
                            <TaxRate>${product.taxes}</TaxRate>
                            <TaxableBase>
                                <TotalAmount>${product.subTotal}</TotalAmount>
                            </TaxableBase>
                            <TaxAmount>
                                <TotalAmount>${product.priceTax.toFixed(2)}</TotalAmount>
                            </TaxAmount>
                        </Tax>
                    </TaxesOutputs>
                </InvoiceLine>`;
                
        });
        xml += `
                    </Items>
                </Invoice>
            </Invoices>
        </fe:Facturae>`;
        return xml;
    }

    function downloadXML(content, filename) {

        const blob = new Blob([content], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);

    }

    function downloadSignedXml() {
        window.open('/documents-signed/'+ myDocument.id)
        /*if (!isChecked) {
            const documentId = myDocument.id;
            const url = `/documents-signed/${documentId}`;

            // Hacer la solicitud al servidor
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        // La respuesta no es exitosa
                        return response.json().then(error => {
                            throw new Error(error.message || 'Error al cargar la factura');
                        });
                    }
                    // La respuesta es exitosa
                    return response.blob(); // O el tipo de respuesta que esperes del servidor
                })
                .then(data => {
                    // Crear una URL de objeto para el blob y abrir una nueva ventana
                    const objectUrl = URL.createObjectURL(data);
                    window.open(objectUrl);
                })
                .catch(error => {
                    $toast($t('To download you must save and sign it'), 'error');
                });

        }*/
    }

    function calcularImporteBase(porcentajeIva, totalIvaRepercutido) {
        if (porcentajeIva <= 0) {
            return 0
        }
        return totalIvaRepercutido / (porcentajeIva / 100);
    }
    
    return {
        convertToFacturaeXML,
        downloadXML,
        downloadSignedXml
    };




})(window);