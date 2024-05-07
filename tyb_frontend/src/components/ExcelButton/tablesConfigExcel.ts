
/**
 * Types & Interfaces
 */
export interface TablesConfigExcel {
    header: string;
    getFieldValue: (row: any) => {
        // This is intentional
    };
}

/**
 * Constants
 */
const MARCA_OPERATIVA = "Marca Operativa";
const TIPO_PRATICA = "Tipo Pratica";

/**
 * Array of table configs
 * For HistoryPage.tsx
 */
export const HISTORY_PAGE_CONFIG: TablesConfigExcel[] = [
    {
        header: "ID",
        getFieldValue: (row) => {
            return row.identificativoIstanza.protocolloDT;
        }
    },
    {
        header: "Stato Istanza",
        getFieldValue: (row) => {
            return ""
        }
    },
    {
        header: "Stato Fascicolo",
        getFieldValue: (row) => {
            return row.statoFascicolo;
        }
    },
    {
        header: MARCA_OPERATIVA,
        getFieldValue: (row) => {
            return row.marcaOperativa;
        }
    },
    {
        header: "Data Marca Istanza",
        getFieldValue: (row) => {
            const value: string = row.dataMarcaOperativa;
            const [completeDate] = value.split("T");
            const [dateYear, dateMonth, dateDay] = completeDate.split("-");
            return `${dateDay}/${dateMonth}/${dateYear}`;
        }
    },
    {
        header: TIPO_PRATICA,
        getFieldValue: (row) => {
            return row.tipoRichiesta;
        }
    },
    {
        header: "Codice Istanza",
        getFieldValue: (row) => {
            return row.codicePratica;
        }
    },
    {
        header: "Targa",
        getFieldValue: (row) => {
            return row.targa;
        }
    },
    {
        header: "Telaio",
        getFieldValue: (row) => {
            return row.telaio;
        }
    },
    {
        header: "Codice Agenzia",
        getFieldValue: (row) => {
            return row.codiceAgenzia
                ? row.ufficioProvinciale + row.codiceAgenzia
                : "";
        }
    },
    {
        header: "N Cons",
        getFieldValue: (row) => {
            return row.numeroTotaleConsecutive;
        }
    },
    {
        header: "Id Cons",
        getFieldValue: (row) => {
            return row.identificativoConsecutiva;
        }
    },
    {
        header: "Pag",
        getFieldValue: (row) => {
            return row.estremoPopolato;
        }
    },
    {
        header: "Cum",
        getFieldValue: (row) => {
            return row.cumulativa;
        }
    },
    {
        header: "All",
        getFieldValue: (row) => {
            return row.tipoIstanzaCumulativaMultipla ===
                "ISTANZA_ALLEGATO_CUMULATIVA"
                ? "SI"
                : "NO";
        }
    },
    {
        header: "Cum Multipla",
        getFieldValue: (row) => {
            return row.idCumulativaMultipla ? row.idCumulativaMultipla : "";
        }
    }
];

/**
 * Array of table configs
 * For ManagementPage.tsx
 */
export const MANAGEMENT_PAGE_CONFIG: TablesConfigExcel[] = [
    {
        header: "Stato Fascicolo",
        getFieldValue: (row) => {
            return row.statoFascicolo.codiceStatoFascicolo || "";
        }
    },
    {
        header: "Pre Convalida",
        getFieldValue: (row) => {
            return row.fascicoloDaPreConvalidare ? "SI" : "NO";
        }
    },
    {
        header: "ID Fas",
        getFieldValue: (row) => {
            return row.identificativoFascicolo.protocolloDT || "";
        }
    },
    {
        header: "Prt. Ag. Fas.",
        getFieldValue: (row) => {
            return row.identificativoFascicolo.identificativoAgenzia || "";
        }
    },
    {
        header: "Stato Istanza",
        getFieldValue: (row) => {
            return row.statoIstanza || "";
        }
    },
    {
        header: MARCA_OPERATIVA,
        getFieldValue: (row) => {
            return row.marcaOperativa || "";
        }
    },
    {
        header: "Data Marca Operativa",
        getFieldValue: (row) => {
            const value: string = row.dataMarcaOperativa;
            const [completeDate] = value.split("T");
            const [dateYear, dateMonth, dateDay] = completeDate.split("-");
            return `${dateDay}/${dateMonth}/${dateYear}`;
        }
    },
    {
        header: "ID Ist",
        getFieldValue: (row) => {
            return row.identificativoIstanza.protocolloDT || "";
        }
    },
    {
        header: "Prt. Ag. Ist.",
        getFieldValue: (row) => {
            return row.idCumulativaMultipla ? row.idCumulativaMultipla : "";
        }
    },
    {
        header: TIPO_PRATICA,
        getFieldValue: (row) => {
            return row.tipoRichiesta || "";
        }
    },
    {
        header: "Codice Pratica",
        getFieldValue: (row) => {
            return row.codicePratica || "";
        }
    },
    {
        header: "Targa",
        getFieldValue: (row) => {
            return row.targa || "";
        }
    },
    {
        header: "Telaio",
        getFieldValue: (row) => {
            return row.telaio || "";
        }
    }
];

/**
 * Array of table configs
 * For PaymentConsultationPage.tsx
 */
export const PAYMENT_CONSULTATION_PAGE_CONFIG: TablesConfigExcel[] = [
    {
        header: "ID Istanza",
        getFieldValue: (row) => {
            return row.idIstanza || "";
        }
    },
    {
        header: "ID Pratica",
        getFieldValue: (row) => {
            return row.idPratica || "";
        }
    },
    {
        header: "Codice Pratica",
        getFieldValue: (row) => {
            return row.codicePratica || "";
        }
    },
    {
        header: TIPO_PRATICA,
        getFieldValue: (row) => {
            return row.tipoPratica || "";
        }
    },
    {
        header: "Data Presentazione",
        getFieldValue: (row) => {
            return row.dataPratica || "";
        }
    },
    {
        header: "Codice Impresa",
        getFieldValue: (row) => {
            return row.codiceAgenzia || "";
        }
    },
    {
        header: "Matricola ins. pagamento",
        getFieldValue: (row) => {
            return row.matricolaInserimento || "";
        }
    },
    {
        header: MARCA_OPERATIVA,
        getFieldValue: (row) => {
            return row.marcaOperativa || "";
        }
    },
    {
        header: "Data Marca Operativa",
        getFieldValue: (row) => {
            return row.dataMarcaOperativa || "";
        }
    },
    {
        header: "Tipo Pagamento",
        getFieldValue: (row) => {
            return row.tipoPagamento || "";
        }
    },
    {
        header: "Estremo Pagamento",
        getFieldValue: (row) => {
            return row.estremoPagamento || "";
        }
    },
    {
        header: "Data Pagamento",
        getFieldValue: (row) => {
            return row.dataPagamento || "";
        }
    }
];
