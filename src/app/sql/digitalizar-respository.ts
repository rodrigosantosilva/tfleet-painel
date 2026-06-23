
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DigitalizarSQL {

    getAtendimentoSQL(empresa: string, dataInicial: string, dataFinal: string): string {

        return `select a.codigoate, o.seqos, a.infdtagendamento, a.placa, a.motivo, 
                      trim(to_char(o.valor, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.'''))  valor,
                      to_char(o.dtabertura,'dd/mm/yyyy') dtabertura, to_char(o.dtaprovacao,'dd/mm/yyyy') dtaprovacao ,
                      to_char(a.data,'dd/mm/yyyy') data,a.codigomot
             from (select  z.placa, codigoate, infdtagendamento,z.codigomot,m.motivo,data,f.codigopropri as codigocli
                     from loatende z
                    inner join cgmotivo m on m.codigomot = z.codigomot
                    inner join (select placa,codigopropri from cgfrota) f on f.placa = z.placa
                    where dtentrega is null and z.infdtagendamento is not null) a
             left join (select codigoate, seqos,p.valor, dtabertura, dtaprovacao
                          from lordserv s
                         inner join loaprovacao p on p.codigoos = s.codigoos
                         where ordemexterna is not null) o on o.codigoate = a.codigoate
            where a.codigocli in ( ${empresa} )
              and trunc(a.data) between to_date('${dataInicial}','dd/mm/yyyy')
                            and to_date('${dataFinal}','dd/mm/yyyy')`;
    }


    getmotivoSQL(): string {
        return `select codigomot,motivo from cgmotivo m 
                  where staativo = 1 and stasac = 'V' 
                    and motivo not like '%(%'
                  order by 2 `;
    }


    getinsertSQL(ordem: string, placa: string, motivo: string, data: string | null,
        tipo: string, item: string, informacao: string, valor: string | null): string {
        return `insert into tmp_manutencao(ordem,placa,motivo,data,tipo,item,informacao,valor) 
                        values ('${ordem}','${placa}','${motivo}','${data}','${tipo}', '${item}','${informacao}','${valor}')`;
    }


}  