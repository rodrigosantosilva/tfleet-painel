import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AtendimentoSQL {
  

  resumoSQL(dias: number, empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {  


    return `select sum(case when a.dtentrega is not null then 1 else 0 end) as FECHADOS,
              sum(case when a.dtentrega is null then 1 else 0 end) as ABERTOS,
              count(*) as TOTAL
              from loatende a
              inner join (select codigoate, status from situacaoatendimento) s on s.codigoate = a.codigoate
              inner join cgfrota f on f.placa = a.placa
              inner join cgclifor c on c.codigocli = f.codigopropri
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = a.placa
              where s.status not in ('01_CANCELADO','21_ORÇAMENTO EXCLUIDO','17_EXCLUIDO','20_ORÇAMENTO REPROVADO')
              and trunc(data) >= trunc(sysdate) - ${dias}
              and f.codigopropri in  ( ${empresa} )`;
  }

  statusSQL(dias: number, empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {

    
      return `select s.status, count(a.codigoate) as TOTAL
                from loatende a
                inner join (select codigoate, case when SUBSTR(status,0,2) = 15 then '15_AGUARD.APROV.CLIENTE' else status end as status
                from situacaoatendimento
                where status not in ('01_CANCELADO','21_ORÇAMENTO EXCLUIDO','16_ATENDIMENTO CONCLUÍDO', '17_EXCLUIDO','20_ORÇAMENTO REPROVADO')) s on s.codigoate = a.codigoate
                inner join cgfrota f on f.placa = a.placa
                inner join cgclifor c on c.codigocli = f.codigopropri

                inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = a.placa

                where trunc(data) >= trunc(sysdate) - ${dias}
                and f.codigopropri in  ( ${empresa} )
                group by s.status
                order by 1`;
  }
}
