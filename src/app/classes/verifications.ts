export class Verifications {
	nom: string;
	email: string;
	code1: string;
	code2: string;
	code3: string;
	code4: string;
	code5: string;
	code6: string;
	code7: string;
	code8: string;
	code9: string;
	code10: string;
	montant1: string;
	montant2: string;
	montant3: string;
	montant4: string;
	montant5: string;
	montant6: string;
	montant7: string;
	montant8: string;
	montant9: string;
	montant10: string;
	datesave: string;
	id: string;

	constructor(id: string, datas: any){
		if((datas.nom !== '' && datas.nom !== null) && (datas.email !== '' && datas.email !== null)){
			this.nom = datas.nom;
			this.email = datas.email;

			
			for(var i = 1; i <= 10; i++){
				if((datas['code'+i] !== '' && datas['code'+i] !== null)){
					this['code'+i] = datas['code'+i].toUpperCase();
					this['montant'+i] = datas['montant'+i];
				}
			}

			this.datesave = datas.datesave;
			this.id = id;
			
		}
	}
}
