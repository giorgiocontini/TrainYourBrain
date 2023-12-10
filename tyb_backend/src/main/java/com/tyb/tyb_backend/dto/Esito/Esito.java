package com.tyb.tyb_backend.dto.Esito;

import lombok.Data;
import lombok.Singular;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Accessors(chain = true)
public class Esito {

	private EnumCodiceEsito codice;
	private String descrizione;


	public Esito() {
	}
	public Esito(EnumCodiceEsito codice) {

		setCodice(codice);
		if (Objects.equals(codice.getDescrizione(), EnumCodiceEsito.OK.getDescrizione())){
			setDescrizione("Operazione correttamente eseguita");
		}else{
			setDescrizione("Errore generico");
		}

	}

	public Esito(EnumCodiceEsito codice, String descrizione) {
		setCodice(codice);
		setDescrizione(descrizione);
	}
}
